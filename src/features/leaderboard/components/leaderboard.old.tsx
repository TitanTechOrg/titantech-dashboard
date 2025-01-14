import { Button, ButtonGroup, Spinner } from '@nextui-org/react';
import { useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
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
        return <Spinner>Loading...</Spinner>;
    }

    if (!isSuccess || !filteredData) {
        return <div>Error loading data...</div>;
    }

    // Get ranks for each clan
    const getClanRanks = (data: LeaderboardSeason, code: string) => {
        return data.occurrences.map((occurrence) => {
            const clan = occurrence.positions.find((clan) => clan.code === code);
            return clan ? clan.rank : null;
        });
    };

    // Prepare chart data
    const chartData = {
        labels: filteredData.occurrences.map((occurrence) => new Date(occurrence.occurred_at).toLocaleDateString()),
        datasets: filteredData.clans.map((clan) => ({
            label: clan.name,
            data: getClanRanks(filteredData, clan.code),
            tension: 0.0,
        })),
    };

    return (
        <div>
            <p>Leaderboard</p>
            {/* Button group for range selection */}
            <ButtonGroup>
                <Button onPress={() => setSelectedRange(10)} color={selectedRange === 10 ? 'primary' : 'default'}>
                    Top 10
                </Button>
                <Button onPress={() => setSelectedRange(25)} color={selectedRange === 25 ? 'primary' : 'default'}>
                    Top 25
                </Button>
                <Button onPress={() => setSelectedRange(50)} color={selectedRange === 50 ? 'primary' : 'default'}>
                    Top 50
                </Button>
            </ButtonGroup>

            <Line
                data={chartData}
                options={{
                    scales: {
                        y: {
                            reverse: true, // Rank 1 at the top
                            beginAtZero: false,
                            stacked: false,
                        },
                    },
                    interaction: {
                        mode: 'nearest',
                        intersect: true,
                    },
                    plugins: {
                        legend: {
                            labels: {
                                usePointStyle: true,
                                pointStyle: 'line',
                            },
                        },
                    },
                }}
            />
        </div>
    );
}
