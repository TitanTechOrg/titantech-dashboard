type ChartGridColourType = {
  light: string;
  dark: string;
};

export const CHART_GRID_COLOUR: ChartGridColourType = {
  light: 'hsl(0 0% 6.67% / 0.1)',
  dark: 'hsl(0 0% 100% / 0.1)',
} as const;
