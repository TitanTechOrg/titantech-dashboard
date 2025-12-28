import { CHART_GRID_COLOUR } from '@/constants/theme';
import { usePreferencesStore } from '@/stores/preferences.store';
import { Card, CardBody, CardHeader, Divider, Spinner } from '@heroui/react';
import { ChartOptions } from 'chart.js';
import { Suspense, lazy, useMemo } from 'react';
import { useAttackTimeline } from '../hooks/useAttackTimeline';
import { Timeline } from '../types';

// Lazy load the `Line` component from `react-chartjs-2`
const Line = lazy(() =>
  import('react-chartjs-2').then((module) => ({ default: module.Line }))
);

// Rest of your existing functions remain the same...
const generateLabels = () =>
  Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

const pickColour = (index: number) => {
  const opacity = 0.5;
  switch (index) {
    case 0:
      return [
        'hsl(212.14 92.45% 58.43% / 1)',
        `hsl(212.14 92.45% 58.43% / ${opacity})`,
      ];
    case 1:
      return [
        'hsl(270 59.26% 57.65% / 1)',
        `hsl(270 59.26% 57.65% / ${opacity})`,
      ];
    case 2:
      return [
        'hsl(146.01 62.45% 55.1% / 1)',
        `hsl(146.01 62.45% 55.1% / ${opacity})`,
      ];
    case 3:
      return [
        'hsl(37.01 91.26% 64.12% / 1)',
        `hsl(37.01 91.26% 64.12% / ${opacity})`,
      ];
    case 4:
      return ['hsl(339 90% 60.78% / 1)', `hsl(339 90% 60.78% / ${opacity})`];
    default:
      return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`;
  }
};

// Chart.js static configuration
const baseChartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true },
    tooltip: {
      callbacks: {
        title: (tooltipItems) => {
          const labelParts = tooltipItems[0]?.label?.split(':') || [];
          if (labelParts.length === 0) return '';

          const hour = parseInt(labelParts[0], 10);
          if (isNaN(hour)) return tooltipItems[0]?.label || '';

          const startTime = `${hour.toString().padStart(2, '0')}:00`;
          const endTime = `${(hour + 1 === 24 ? 0 : hour + 1).toString().padStart(2, '0')}:00`;
          return `${startTime} - ${endTime}`;
        },
      },
    },
  },
  scales: {
    x: {
      ticks: { maxRotation: 45, minRotation: 0 },
    },
    y: {
      title: { display: true, text: 'Number of Raid Attacks' },
      ticks: { stepSize: 1 },
      beginAtZero: true,
    },
  },
};

// Generate a dataset for a cycle
const generateCycleData = (cycle: Timeline['cycles'][0], index: number) => {
  const dataMap = new Map(
    cycle.hours.map(({ hour, attacks }) => [hour, attacks])
  );
  const dataArray = Array.from(
    { length: 24 },
    (_, hour) => dataMap.get(hour) || null
  );
  const [border, background] = pickColour(index);

  return {
    label: `Cycle ${cycle.cycle}`,
    data: dataArray,
    borderColor: border,
    backgroundColor: background,
    borderWidth: 2,
    pointRadius: 3,
    fill: false,
    spanGaps: false,
    lineTension: 0.4,
  };
};

export function TimelineChart() {
  const { data, isLoading, isError } = useAttackTimeline();
  const { darkMode: darkModeStorage } = usePreferencesStore();

  const labels = useMemo(() => generateLabels(), []);

  const chartData = useMemo(
    () => ({
      labels,
      datasets:
        data?.cycles.map((cycle, idx) => generateCycleData(cycle, idx)) || [],
    }),
    [data, labels]
  );

  const options: ChartOptions<'line'> = useMemo(
    () => ({
      ...baseChartOptions,
      scales: {
        ...baseChartOptions.scales,
        x: {
          ...baseChartOptions.scales?.x,
          grid: {
            color: darkModeStorage
              ? CHART_GRID_COLOUR.dark
              : CHART_GRID_COLOUR.light,
          },
        },
        y: {
          ...baseChartOptions.scales?.y,
          grid: {
            color: darkModeStorage
              ? CHART_GRID_COLOUR.dark
              : CHART_GRID_COLOUR.light,
          },
        },
      },
    }),
    [darkModeStorage]
  );

  if (isError) {
    return (
      <Card className="flex h-full w-full justify-center p-2 dark:bg-neutral-800">
        <div>Error loading chart. Try again later.</div>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="flex h-full w-full justify-center p-2 dark:bg-neutral-800">
        <Spinner label="Loading timeline..." />
      </Card>
    );
  }

  return (
    <Card className="h-full w-full px-2 dark:bg-neutral-800">
      <CardHeader className="flex h-[70px] items-center justify-between text-lg font-medium">
        Attacks timeline
      </CardHeader>
      <Divider />
      <CardBody className="h-72">
        <div className="h-full">
          <Suspense fallback={<Spinner label="Loading chart..." />}>
            <Line data={chartData} options={options} />
          </Suspense>
        </div>
      </CardBody>
    </Card>
  );
}
