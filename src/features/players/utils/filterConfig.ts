export type FilterType = 'sortBy' | 'sortOrder';

export const FILTER_OPTIONS: Record<FilterType, string[]> = {
  sortBy: ['Sort by Name', 'Sort by Level'],
  sortOrder: ['Asc', 'Desc'],
};
