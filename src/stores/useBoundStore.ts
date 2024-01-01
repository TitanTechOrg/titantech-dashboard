import { create } from 'zustand';
import { TitanSliceState, createTitanSlice } from './titansSlice';
import { RaidSliceState, createRaidSlice } from './raidSlice';

export const useBoundStore = create<TitanSliceState & RaidSliceState>()((...a) => ({
    ...createTitanSlice(...a),
    ...createRaidSlice(...a),
}));
