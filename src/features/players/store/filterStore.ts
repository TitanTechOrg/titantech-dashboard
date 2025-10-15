import { create } from 'zustand';
import { FILTER_OPTIONS, FilterType } from '../utils/filterConfig';

interface FilterState {
  filters: {
    sortBy: string;
    sortOrder: string;
  };
  toggleFilter: (filterType: FilterType) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  filters: {
    sortBy: FILTER_OPTIONS.sortBy[1],
    sortOrder: FILTER_OPTIONS.sortOrder[1],
  },
  toggleFilter: (filterType: FilterType) =>
    set((state) => {
      const options = FILTER_OPTIONS[filterType];
      const currentValue = state.filters[filterType];
      const newValue = currentValue === options[0] ? options[1] : options[0];

      return {
        filters: {
          ...state.filters,
          [filterType]: newValue,
        },
      };
    }),
}));
