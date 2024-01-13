import { create } from 'zustand';
import { TitanSliceState, createTitanSlice } from './titans.slice';
import { RaidSliceState, createRaidSlice } from './raid.slice';

export const useBoundStore = create<TitanSliceState & RaidSliceState>()((...a) => ({
    ...createTitanSlice(...a),
    ...createRaidSlice(...a),
}));
