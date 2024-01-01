import { TitanSequence } from '@/pages/dashboard/raid-log/types';
import { StateCreator } from 'zustand';

export type TitanSliceState = {
    titans: TitanSequence[];
    currentTitan: TitanSequence | null;
    setTitans: (titans: TitanSequence[]) => void;
    setCurrentTitan: (titan: TitanSequence) => void;
};

export const createTitanSlice: StateCreator<TitanSliceState, [], [], TitanSliceState> = (set) => ({
    titans: [],
    currentTitan: null,
    setTitans: (titans: TitanSequence[]) => set(() => ({ titans })),
    setCurrentTitan: (currentTitan: TitanSequence) => set(() => ({ currentTitan })),
});
