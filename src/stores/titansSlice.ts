import { percentage } from '@/lib/utils';
import { TitanSequence } from '@/pages/dashboard/raid-log/types';
import { StateCreator } from 'zustand';

export type TitanSliceState = {
    titans: TitanSequence[];
    currentTitan: TitanSequence | undefined;
    setTitans: (titans: TitanSequence[]) => void;
    setCurrentTitan: (titan: TitanSequence) => void;
    isInsanityVoid: () => boolean;
    isSkeletalSmash: () => boolean;
    isDecayingStrike: () => boolean;
    isVictoryMarch: () => boolean;
    hasActiveConditionals: () => boolean;
};

export const createTitanSlice: StateCreator<TitanSliceState, [], [], TitanSliceState> = (set, get) => ({
    titans: [],
    currentTitan: undefined,
    setTitans: (titans: TitanSequence[]) => set(() => ({ titans })),
    setCurrentTitan: (currentTitan: TitanSequence) => set(() => ({ currentTitan })),
    isInsanityVoid: () => {
        const currentTitan = get().currentTitan;

        if (!currentTitan) return false;

        const markedParts = currentTitan.parts.filter((part) => part.target);
        const markedArmouredParts = markedParts.filter((part) => part.name.includes('Armor'));
        const markedBodyParts = markedParts.filter((part) => part.name.includes('Body'));

        const isAllArmouredPartsBroken = markedArmouredParts.every((part) => part.current_health <= 0);

        const brokenBodyParts = markedBodyParts.filter((part) => part.current_health <= 0);
        const isMoreThanHalfPartsBroken = brokenBodyParts.length <= markedBodyParts.length / 2;

        return isMoreThanHalfPartsBroken && isAllArmouredPartsBroken;
    },
    isSkeletalSmash: () => {
        const currentTitan = get().currentTitan;

        if (!currentTitan) return false;

        const markedParts = currentTitan.parts.filter((part) => part.target);
        const markedArmouredParts = markedParts.filter((part) => part.name.includes('Armor'));
        const markedBodyParts = markedParts.filter((part) => part.name.includes('Body'));

        const hasAtLeastOneSkeletonPart = markedBodyParts.some((part) => part.current_health <= 0);
        const hasAtLeastOneRemainingArmouredPart = markedArmouredParts.some((part) => part.current_health > 0);

        return hasAtLeastOneSkeletonPart && hasAtLeastOneRemainingArmouredPart;
    },
    isDecayingStrike: () => {
        const currentTitan = get().currentTitan;

        if (!currentTitan) return false;

        const markedParts = currentTitan.parts.filter((part) => part.target);

        const decayingStrikeThreshold: number = 30;

        const hasAtLeastOnePartUnderThreshold = markedParts.some((part) => {
            const remainingHealthPercentage = percentage(part.health, part.current_health);
            return part.current_health > 0 && remainingHealthPercentage <= decayingStrikeThreshold;
        });

        return hasAtLeastOnePartUnderThreshold;
    },
    isVictoryMarch: () => {
        const currentTitan = get().currentTitan;

        if (!currentTitan) return false;

        const markedParts = currentTitan.parts.filter((part) => part.target);
        const markedBodyParts = markedParts.filter((part) => part.name.includes('Body'));

        const brokenBodyParts = markedBodyParts.filter((part) => part.current_health <= 0);

        if (!brokenBodyParts) return false;

        const isAllButOneBodyPartsBroken = brokenBodyParts.length === markedBodyParts.length - 1;

        return isAllButOneBodyPartsBroken;
    },
    hasActiveConditionals: () => [get().isVictoryMarch(), get().isInsanityVoid(), get().isSkeletalSmash(), get().isDecayingStrike()].some(Boolean),
});
