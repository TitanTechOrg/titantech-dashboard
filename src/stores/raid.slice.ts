import { StateCreator } from 'zustand';

export type RaidSliceState = {
    currentRaidId: string;
    setCurrentRaidId: (currentRaidId: string) => void;
};

export const createRaidSlice: StateCreator<RaidSliceState, [], [], RaidSliceState> = (set) => ({
    currentRaidId: '',
    setCurrentRaidId: (currentRaidId: string) => set(() => ({ currentRaidId })),
});
