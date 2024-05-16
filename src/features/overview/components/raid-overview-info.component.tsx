import { RaidData, useRaidCycles } from '@/features/raid-info';
import { PlayerData, PlayersData } from '../types';
import { formatter } from '@/utils/number-formatter';
import { DonutChartData } from './donut-chart-data.component';

const calculateSum = (obj: any[], field: string) => obj.map((items) => items[field]).reduce((prev: number, curr: number) => prev + curr, 0);

// const calculateAverageDamage = (overviewPlayers: PlayerData[] | undefined) => {
//     if (overviewPlayers == null) return 0;

//     const avgDamage = calculateSum(overviewPlayers, 'average_damage') / overviewPlayers.length;
//     const formattedDamage = formatter().format(avgDamage);

//     return formattedDamage;
// };

const calculateAverageDamage2 = (overviewPlayers: PlayerData[] | undefined) => {
    if (overviewPlayers == null) return 0;

    const avgDamage = calculateSum(overviewPlayers, 'average_damage') / overviewPlayers.length || 0;
    // const formattedDamage = formatter().format(avgDamage);

    // return formattedDamage;

    return avgDamage;
};

// const calculateTotalDamage = (overviewPlayers: PlayerData[] | undefined) => {
//     if (overviewPlayers == null) return 0;

//     const totalDamage = calculateSum(overviewPlayers, 'total_damage');
//     const formattedDamage = formatter().format(totalDamage);

//     return formattedDamage;
// };

const calculateTotalDamage2 = (overviewPlayers: PlayerData[] | undefined) => {
    if (overviewPlayers == null) return 0;

    const totalDamage = calculateSum(overviewPlayers, 'total_damage');
    // const formattedDamage = formatter().format(totalDamage);

    return totalDamage;
};

// const countAttacks = (cycleAmount: number | undefined, overviewPlayers: PlayerData[] | undefined, raidTier: string | undefined) => {
//     if (overviewPlayers == null || cycleAmount == null || raidTier == null) return 0;

//     const attackCount = calculateSum(overviewPlayers, 'attack_count');

//     const attacksPerCycle = raidTier === '9999' ? 6 : 5;
//     const totalAttacks = cycleAmount * overviewPlayers.length * attacksPerCycle;

//     return `${attackCount}/${totalAttacks}`;
// };

const countAttacks2 = (cycleAmount: number | undefined, overviewPlayers: PlayerData[] | undefined, raidTier: string | undefined) => {
    if (overviewPlayers == null || cycleAmount == null || raidTier == null) return 0;

    // const attackCount = calculateSum(overviewPlayers, 'attack_count');

    const attacksPerCycle = raidTier === '9999' ? 6 : 5;
    const totalAttacks = cycleAmount * overviewPlayers.length * attacksPerCycle;

    return totalAttacks;
};

// const countMissedAttacks = (cycleAmount: number | undefined, overviewPlayers: PlayerData[] | undefined, raidTier: string | undefined) => {
//     if (overviewPlayers == null || cycleAmount == null || raidTier == null) return 0;

//     const attackCount = calculateSum(overviewPlayers, 'attack_count');

//     const attacksPerCycle = raidTier === '9999' ? 6 : 5;
//     const totalAttacks = cycleAmount * overviewPlayers.length * attacksPerCycle;
//     const missedAttacks = totalAttacks - attackCount;

//     return `${missedAttacks}`;
// };

const countMissedAttacks2 = (cycleAmount: number | undefined, overviewPlayers: PlayerData[] | undefined, raidTier: string | undefined) => {
    if (overviewPlayers == null || cycleAmount == null || raidTier == null) return 0;

    const attackCount = calculateSum(overviewPlayers, 'attack_count');

    const attacksPerCycle = raidTier === '9999' ? 6 : 5;
    const totalAttacks = cycleAmount * overviewPlayers.length * attacksPerCycle;
    const missedAttacks = totalAttacks - attackCount;

    return missedAttacks;
};

// const countMissingDamage = (cycleAmount: number | undefined, overviewPlayers: PlayerData[] | undefined, raidTier: string | undefined) => {
//     if (overviewPlayers == null || cycleAmount == null || raidTier == null) return 0;

//     const attacksPerCycle = (raidTier === '9999' ? 6 : 5) * cycleAmount;
//     const playersMissingAttacks = overviewPlayers.filter(({ attack_count }: PlayerData) => attack_count !== attacksPerCycle);
//     const totalMissingDamage = playersMissingAttacks
//         .map(({ average_damage, attack_count }: PlayerData) => average_damage * (attacksPerCycle - attack_count))
//         .reduce((prev: number, curr: number) => prev + curr, 0);

//     const formattedDamage = formatter().format(totalMissingDamage);

//     return formattedDamage;
// };

const countMissingDamage2 = (cycleAmount: number | undefined, overviewPlayers: PlayerData[] | undefined, raidTier: string | undefined) => {
    if (overviewPlayers == null || cycleAmount == null || raidTier == null) return 0;

    const attacksPerCycle = (raidTier === '9999' ? 6 : 5) * cycleAmount;
    const playersMissingAttacks = overviewPlayers.filter(({ attack_count }: PlayerData) => attack_count !== attacksPerCycle);
    const totalMissingDamage = playersMissingAttacks
        .map(({ average_damage, attack_count }: PlayerData) => average_damage * (attacksPerCycle - attack_count))
        .reduce((prev: number, curr: number) => prev + curr, 0);

    return totalMissingDamage;
};

type RaidOverviewInfoProps = {
    raidId: string;
    raid: RaidData;
    overviewPlayers: PlayersData | undefined;
};

export function RaidOverviewInfo({ raidId, raid, overviewPlayers }: RaidOverviewInfoProps) {
    const { data: raidCycles } = useRaidCycles(raidId);
    return (
        <>
            <DonutChartData
                title="Attacks"
                chartData={{
                    labels: undefined,
                    datasets: [
                        {
                            data: [
                                calculateSum(overviewPlayers?.players_data || [], 'attack_count'),
                                countMissedAttacks2(raidCycles?.cycles?.length, overviewPlayers?.players_data, raid?.tier),
                            ],
                            backgroundColor: ['rgba(16, 185, 129, 0.2)', 'rgba(244, 63, 94, 0.2)'],
                            borderColor: ['rgba(16, 185, 129, 1)', 'rgba(244, 63, 94, 1)'],
                            borderWidth: 2,
                        },
                    ],
                }}
                labels={[
                    { title: 'Submitted', colour: 'success', value: calculateSum(overviewPlayers?.players_data || [], 'attack_count') },
                    {
                        title: 'Missing',
                        colour: 'danger',
                        value: countMissedAttacks2(raidCycles?.cycles?.length, overviewPlayers?.players_data, raid?.tier),
                    },
                    {
                        title: 'Total',
                        colour: 'default',
                        value: countAttacks2(raidCycles?.cycles?.length, overviewPlayers?.players_data, raid?.tier),
                    },
                ]}
            />

            <DonutChartData
                title="Damage"
                chartData={{
                    labels: undefined,
                    datasets: [
                        {
                            data: [
                                calculateTotalDamage2(overviewPlayers?.players_data),
                                countMissingDamage2(raidCycles?.cycles?.length, overviewPlayers?.players_data, raid?.tier),
                            ],
                            backgroundColor: ['rgba(16, 185, 129, 0.2)', 'rgba(244, 63, 94, 0.2)'],
                            borderColor: ['rgba(16, 185, 129, 1)', 'rgba(244, 63, 94, 1)'],
                            borderWidth: 2,
                        },
                    ],
                }}
                labels={[
                    { title: 'Submitted', colour: 'success', value: formatter().format(calculateTotalDamage2(overviewPlayers?.players_data)) },
                    {
                        title: 'Missing',
                        colour: 'danger',
                        value: formatter().format(countMissingDamage2(raidCycles?.cycles?.length, overviewPlayers?.players_data, raid?.tier)),
                    },
                    {
                        title: 'Est. Total',
                        colour: 'default',
                        value: formatter().format(
                            calculateTotalDamage2(overviewPlayers?.players_data) +
                                countMissingDamage2(raidCycles?.cycles?.length, overviewPlayers?.players_data, raid?.tier)
                        ),
                    },
                    {
                        title: 'Average',
                        colour: 'default',
                        value: formatter().format(calculateAverageDamage2(overviewPlayers?.players_data)),
                    },
                ]}
            />
        </>
    );
}
