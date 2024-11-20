import { CHART_GRID_COLOUR } from '@/constants/theme';
import { usePreferencesStore } from '@/stores/preferences.store';
import { formatter } from '@/utils';
import { Card, CardBody, CardHeader, Divider, Spinner } from '@nextui-org/react';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { ChartOptions } from 'chart.js';
import { lazy, Suspense, useMemo } from 'react';
import { DamageCardData, RaidCycle, useRaidCycles } from '..';

// Lazy load the `Line` component from `react-chartjs-2`
const Line = lazy(() => import('react-chartjs-2').then((module) => ({ default: module.Line })));

// Other utility functions remain the same...
const baseChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: true },
        tooltip: {
            callbacks: {
                label: (context) => {
                    const value = context.raw as number;
                    return `${context.dataset.label}: ${formatter().format(value)}`;
                },
            },
        },
    },
    scales: {
        x: {
            title: { display: true, text: 'Cycle' },
        },
        y: {
            title: { display: true, text: 'Damage' },
            ticks: {
                callback: (value) => formatter().format(value as number),
            },
            beginAtZero: false,
        },
    },
};

type PreviousValueProps = {
    index: number;
    listLength: number;
    value: string;
};

type DamageData = {
    items: string[];
};

function CardPreviousValue({ index, listLength, value }: PreviousValueProps) {
    return (
        <span className="flex flex-row items-center justify-center gap-1 text-xs text-neutral-600/70 dark:text-neutral-50/70">
            {value}
            {index !== listLength - 1 && <ArrowRightIcon />}
        </span>
    );
}

function CardValues({ items }: DamageData) {
    if (!items?.length) return null;

    return (
        <div className="flex flex-row flex-wrap gap-x-1">
            {items.map((value, index) => (
                <CardPreviousValue key={`${index}_raid_damage_stats_${value}`} index={index} value={value} listLength={items.length} />
            ))}
        </div>
    );
}

function getYAxisRange(data: DamageCardData['data']) {
    const allValues = data.flatMap((data) => [data.average, data.overall]);
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    const padding = (max - min) * 0.1;
    return { min: Math.floor(min - padding), max: Math.ceil(max + padding) };
}

export function RaidDamageInfo() {
    const { darkMode: darkModeStorage } = usePreferencesStore();
    const { data: raidCycles } = useRaidCycles();

    const data = useMemo(() => {
        if (!raidCycles || !raidCycles.cycles?.length) return [];

        const getAverageClanDamage = (raidCycles: RaidCycle[]) => raidCycles.map(({ average_damage }) => Math.round(average_damage));

        const getOverallClanDamage = (raidCycles: RaidCycle[]) => {
            let cumulativeSum = 0;
            return raidCycles.map(({ average_damage }, index) => {
                cumulativeSum += average_damage;
                return Math.round(cumulativeSum / (index + 1));
            });
        };

        const mapDamageData = (dataA: number[], dataB: number[]) =>
            dataA.map((val, index) => ({
                name: index + 1,
                average: val,
                overall: dataB[index] ?? 0,
            }));

        return mapDamageData(getAverageClanDamage(raidCycles.cycles), getOverallClanDamage(raidCycles.cycles));
    }, [raidCycles?.cycles?.length]);

    if (!data.length) {
        return (
            <Card className="h-full w-full px-2 dark:bg-neutral-800">
                <CardHeader className="h-[70px]">
                    <h3 className="text-lg font-medium">Damage stats</h3>
                </CardHeader>
                <Divider />
                <CardBody className="flex flex-col items-center justify-center">
                    <p className="text-neutral-500">No data available</p>
                </CardBody>
            </Card>
        );
    }

    const overallRaidDamage = data.length > 1 ? data[data.length - 2].overall : 0;
    const { min, max } = getYAxisRange(data);

    const chartData = {
        labels: data.map(({ name }) => name.toString()),
        datasets: [
            {
                label: 'Average',
                data: data.map(({ average }) => average),
                borderColor: 'hsl(212.14 92.45% 58.43%)',
                backgroundColor: 'hsl(212.14 92.45% 58.43% / 0.5)',
                borderWidth: 2,
                pointRadius: 3,
                fill: false,
                lineTension: 0.4,
            },
            {
                label: 'Overall',
                data: data.map(({ overall }) => overall),
                borderColor: 'hsl(339 90% 60.78%)',
                backgroundColor: 'hsl(339 90% 60.78% / 0.5)',
                borderWidth: 2,
                pointRadius: 3,
                fill: false,
                lineTension: 0.4,
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        ...baseChartOptions,
        scales: {
            x: {
                ...baseChartOptions.scales?.x,
                grid: {
                    color: darkModeStorage ? CHART_GRID_COLOUR.dark : CHART_GRID_COLOUR.light,
                },
            },
            y: {
                ...baseChartOptions.scales?.y,
                grid: {
                    color: darkModeStorage ? CHART_GRID_COLOUR.dark : CHART_GRID_COLOUR.light,
                },
                min,
                max,
            },
        },
    };

    return (
        <Card className="h-full w-full px-2 dark:bg-neutral-800">
            <CardHeader className="flex h-[70px] justify-between text-lg font-medium">
                <h3>Damage stats</h3>
                <span className="text-xl font-semibold">{formatter().format(overallRaidDamage)}</span>
            </CardHeader>
            <Divider />
            <CardBody className="flex h-72 flex-col gap-2">
                <CardValues items={data.map(({ average }) => formatter().format(average))} />
                <div className="h-full">
                    <Suspense fallback={<Spinner label="Loading chart..." />}>
                        <Line data={chartData} options={options} />
                    </Suspense>
                </div>
            </CardBody>
        </Card>
    );
}
