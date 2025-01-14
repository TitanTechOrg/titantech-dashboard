import { Button, ButtonGroup } from '@nextui-org/react';
import ReactECharts from 'echarts-for-react';
import { useMemo, useState } from 'react';
import { useFetchedLeaderboard } from '../hooks/useFetchedLeaderboard';
import { LeaderboardSeason } from '../types';

export function Leaderboard() {
    const { data, isLoading, isSuccess } = useFetchedLeaderboard();

    // State for the selected range
    const [selectedRange, setSelectedRange] = useState(50); // Default to top 50

    // Memoize clans extraction and filtering
    const filteredData = useMemo(() => {
        if (!data) return null;

        // Extract clans and filter data by selected range
        const extractClans = (data: LeaderboardSeason) => {
            const clans = new Map();
            data.occurrences.forEach((occurrence) => {
                occurrence.positions.slice(0, selectedRange).forEach((position) => {
                    clans.set(position.code, position.name);
                });
            });
            return Array.from(clans).map(([code, name]) => ({ code, name }));
        };

        // Filter the occurrences based on selected range
        const filterOccurrences = (data: LeaderboardSeason, range: number) => {
            return data.occurrences.map((occurrence) => ({
                ...occurrence,
                positions: occurrence.positions.slice(0, range),
            }));
        };

        // Return the filtered data
        return {
            ...data,
            occurrences: filterOccurrences(data, selectedRange),
            clans: extractClans(data),
        };
    }, [data, selectedRange]);

    // Check for loading and success states
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isSuccess || !filteredData) {
        return <div>Error loading data...</div>;
    }

    // Prepare chart data
    const getClanRanks = (data: LeaderboardSeason, code: string) => {
        return data.occurrences.map((occurrence) => {
            const clan = occurrence.positions.find((clan) => clan.code === code);
            return clan ? clan.rank : null;
        });
    };

    // Prepare the series data for the chart
    const generateSeriesList = () => {
        return filteredData.clans.map((clan) => ({
            name: clan.name,
            symbolSize: 10,
            type: 'line',
            smooth: true,
            endLabel: {
                show: true,
                formatter: '{a}',
                distance: 20,
            },
            emphasis: {
                focus: 'series',
            },
            data: getClanRanks(filteredData, clan.code),
        }));
    };

    const options = {
        title: {
            text: 'Leaderboard Rankings (S-09)',
        },
        tooltip: {
            trigger: 'none',
        },
        grid: {
            left: 30,
            right: 120,
            bottom: 30,
            containLabel: true,
        },
        toolbox: {
            feature: {
                saveAsImage: {},
            },
        },
        xAxis: {
            type: 'category',
            axisLabel: {
                margin: 30,
                fontSize: 16,
            },
            boundaryGap: false,
            data: filteredData.occurrences.map((occurrence) => new Date(occurrence.occurred_at).toLocaleDateString()),
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                margin: 30,
                fontSize: 16,
                formatter: '#{value}',
            },
            inverse: true,
            interval: 1,
            min: 1,
            max: selectedRange,
        },
        series: generateSeriesList(),
    };

    return (
        <div>
            <p>Leaderboard</p>
            {/* Button group for range selection */}
            <div>
                <ButtonGroup>
                    <Button onClick={() => setSelectedRange(10)} color={selectedRange === 10 ? 'primary' : 'default'}>
                        Top 10
                    </Button>
                    <Button onClick={() => setSelectedRange(25)} color={selectedRange === 25 ? 'primary' : 'default'}>
                        Top 25
                    </Button>
                    <Button onClick={() => setSelectedRange(50)} color={selectedRange === 50 ? 'primary' : 'default'}>
                        Top 50
                    </Button>
                </ButtonGroup>
            </div>

            <ReactECharts option={options} style={{ height: `${selectedRange * 32}px`, width: '100%' }} />
        </div>
    );
}
