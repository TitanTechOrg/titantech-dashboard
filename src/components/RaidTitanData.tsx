import { Image, Progress, Spacer, Tooltip } from '@nextui-org/react';
import { TitanCurseData, TitanPart, TitanSequence } from '@/pages/dashboard/raid-log/types';
import TitanPartTableData from './TitanPartsTableData';
import { formatter, percentage } from '@/lib/utils';

type RaidTitanDataProps = {
    titan: TitanSequence;
    parts: TitanPart[];
    showConditionalSection?: boolean;
};

function getImageUrl(name: string): string {
    return new URL(`../assets/cards/${name}.webp`, import.meta.url).href;
}

type TitanHealthBarsProps = {
    titanArmourHealthPercentage: number;
    titanBodyHealthPercentage: number;
    titanArmourHealthValue: number;
    titanBodyHealthValue: number;
};

const getTitanHealthPercentage = (titan: TitanSequence, partType: 'Body' | 'Armor'): number => {
    const markedParts = titan.parts.filter((part) => part.target && part.name.includes(partType));
    const totalHealth = markedParts.reduce((prev, curr) => prev + curr.health, 0);
    const totalRemainingHealth = markedParts.reduce((prev, curr) => prev + curr.current_health, 0);

    const remainingTitanBodyHealth = titan.health - totalHealth + totalRemainingHealth;

    let result = partType === 'Armor' ? percentage(totalHealth, totalRemainingHealth) : percentage(titan.health, remainingTitanBodyHealth);

    if (result < 0) result = 0;

    return result;
};

const getTitanHealth = (titan: TitanSequence, partType: 'Body' | 'Armor'): number => {
    const markedParts = titan.parts.filter((part) => part.target && part.name.includes(partType));
    const totalHealth = markedParts.reduce((prev, curr) => prev + curr.health, 0);
    const totalRemainingHealth = markedParts.reduce((prev, curr) => prev + curr.current_health, 0);

    const remainingTitanBodyHealth = titan.health - totalHealth + totalRemainingHealth;

    const result = partType === 'Armor' ? totalRemainingHealth : remainingTitanBodyHealth;

    return result;
};

function TitanHealthBars({
    titanArmourHealthPercentage,
    titanBodyHealthPercentage,
    titanArmourHealthValue,
    titanBodyHealthValue,
}: TitanHealthBarsProps) {
    const isNegativeArmour = titanArmourHealthValue < 0;
    const isNegativeBody = titanBodyHealthValue < 0;

    return (
        <div className="flex flex-col items-center w-72 mx-auto">
            <Spacer />
            <Tooltip showArrow={true} isDisabled={isNegativeArmour} content={`${formatter().format(titanArmourHealthValue)} remaining`}>
                <Progress
                    label="Armor"
                    showValueLabel={true}
                    aria-label="Titan total armour..."
                    value={titanArmourHealthPercentage}
                    className="max-w-md px-1 pb-1"
                    size="md"
                    color="default"
                    isStriped={true}
                />
            </Tooltip>
            <Tooltip showArrow={true} isDisabled={isNegativeBody} content={`${formatter().format(titanBodyHealthValue)} remaining`}>
                <Progress
                    label="Body"
                    showValueLabel={true}
                    aria-label="Titan total health..."
                    value={titanBodyHealthPercentage}
                    className="max-w-md px-1 pb-1"
                    size="md"
                    color="primary"
                    isStriped={true}
                />
            </Tooltip>
        </div>
    );
}

export default function RaidTitanData({ titan, parts, showConditionalSection = false }: RaidTitanDataProps) {
    const markedParts = titan.parts.filter((part) => part.target);
    const markedArmouredParts = markedParts.filter((part) => part.name.includes('Armor'));
    const markedBodyParts = markedParts.filter((part) => part.name.includes('Body'));

    const getTitanCursedParts = (): TitanCurseData => {
        const returnData: TitanCurseData = {
            curse_type: titan.curse_type,
            parts: titan.parts,
            id: titan.id,
            name: titan.name,
        };
        return returnData;
    };

    const isInsanityVoid = () => {
        if (!showConditionalSection) return false;

        const isAllArmouredPartsBroken = markedArmouredParts.every((part) => part.current_health <= 0);

        const brokenBodyParts = markedBodyParts.filter((part) => part.current_health <= 0);
        const isMoreThanHalfPartsBroken = brokenBodyParts.length <= markedBodyParts.length / 2;

        return isMoreThanHalfPartsBroken && isAllArmouredPartsBroken;
    };

    const isVictoryMarch = () => {
        if (!showConditionalSection) return false;

        const brokenBodyParts = markedBodyParts.filter((part) => part.current_health <= 0);
        const isAllButOneBodyPartsBroken = brokenBodyParts.length === markedBodyParts.length - 1;

        return isAllButOneBodyPartsBroken;
    };

    const isDecayingStrike = () => {
        if (!showConditionalSection) return false;

        const hasAtLeastOnePartUnder30Percent = markedParts.some((part) => {
            const remainingHealthPercentage = percentage(part.health, part.current_health);
            return part.current_health > 0 && remainingHealthPercentage <= 30;
        });

        return hasAtLeastOnePartUnder30Percent;
    };

    const isSkeletalSmash = () => {
        if (!showConditionalSection) return false;

        const hasAtLeastOneSkeletonPart = markedBodyParts.some((part) => part.current_health <= 0);
        const hasAtLeastOneRemainingArmouredPart = markedArmouredParts.some((part) => part.current_health > 0);

        return hasAtLeastOneSkeletonPart && hasAtLeastOneRemainingArmouredPart;
    };

    const hasActiveConditionals: boolean = [isVictoryMarch(), isInsanityVoid(), isSkeletalSmash(), isDecayingStrike()].some(Boolean);

    return (
        <div className="flex flex-col gap-4 flex-wrap">
            <h2 className="font-medium text-center">{titan.name}</h2>

            <TitanPartTableData parts={parts} titanData={getTitanCursedParts()} />

            <TitanHealthBars
                titanArmourHealthPercentage={getTitanHealthPercentage(titan, 'Armor')}
                titanBodyHealthPercentage={getTitanHealthPercentage(titan, 'Body')}
                titanArmourHealthValue={getTitanHealth(titan, 'Armor')}
                titanBodyHealthValue={getTitanHealth(titan, 'Body')}
            />

            <div className={`flex flex-col gap-2 bg-neutral-400/40 rounded-xl px-4 py-2 mx-auto ${hasActiveConditionals ? 'block' : 'hidden'}`}>
                <span className="text-sm font-medium">Active conditional cards</span>
                <div className="flex flex-row gap-1">
                    {isVictoryMarch() ? <Image src={getImageUrl('VictoryMarch')} width={36} radius="md" /> : null}
                    {isInsanityVoid() ? <Image src={getImageUrl('InsanityVoid')} width={36} radius="md" /> : null}
                    {isSkeletalSmash() ? <Image src={getImageUrl('SkeletalSmash')} width={36} radius="md" /> : null}
                    {isDecayingStrike() ? <Image src={getImageUrl('DecayingStrike')} width={36} radius="md" /> : null}
                </div>
            </div>
        </div>
    );
}
