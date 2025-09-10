import { create } from 'zustand';
import { RaidSliceState, createRaidSlice } from './raid.slice';
import { TitanSliceState, createTitanSlice } from './titans.slice';

export const useBoundStore = create<TitanSliceState & RaidSliceState>()(
  (...a) => ({
    ...createTitanSlice(...a),
    ...createRaidSlice(...a),
  })
);
