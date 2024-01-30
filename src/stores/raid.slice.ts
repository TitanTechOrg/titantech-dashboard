import { StateCreator } from 'zustand';

export type RaidSliceState = {
    currentRaidId: string;
    setCurrentRaidId: (currentRaidId: string) => void;

    showRaidCards: boolean;
    setShowRaidCards: (showRaidCards: boolean) => void;
};

export const createRaidSlice: StateCreator<RaidSliceState, [], [], RaidSliceState> = (set) => ({
    currentRaidId: '',
    setCurrentRaidId: (currentRaidId: string) => set(() => ({ currentRaidId })),

    showRaidCards: true,
    setShowRaidCards: (showRaidCards: boolean) => set(() => ({ showRaidCards })),
});
