import { Card, CardBody, CardHeader, Code, Divider } from '@nextui-org/react';
// import { getRaidLabel } from '@/utils/string-formatter';
import { RaidData, RaidList, useRaidCycles } from '@/features/raid-info';
// import { useOverviewPlayers } from '../api/get-overview-players';
import { PlayerData, PlayersData } from '../types';
import { formatter } from '@/utils/number-formatter';
import { InfoCircledIcon } from '@radix-ui/react-icons';
// import { useState } from 'react';
// import { CardTexts } from '@/components';
import {
    // CartesianGrid,
    Cell,
    // Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    // Scatter,
    // ScatterChart,
    // Tooltip,
    // Treemap,
    // XAxis,
    // YAxis,
    // ZAxis,
} from 'recharts';
import { RaidListDropdown } from './raid-list-dropdown';
// import { UseQueryResult } from '@tanstack/react-query';

const calculateSum = (obj: any[], field: string) => obj.map((items) => items[field]).reduce((prev: number, curr: number) => prev + curr, 0);

// const calculateAverageDamage = (overviewPlayers: PlayerData[] | undefined) => {
//     if (overviewPlayers == null) return 0;

//     const avgDamage = calculateSum(overviewPlayers, 'average_damage') / overviewPlayers.length;
//     const formattedDamage = formatter().format(avgDamage);

//     return formattedDamage;
// };

const calculateAverageDamage2 = (overviewPlayers: PlayerData[] | undefined) => {
    if (overviewPlayers == null) return 0;

    const avgDamage = calculateSum(overviewPlayers, 'average_damage') / overviewPlayers.length;
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

    // const formattedDamage = formatter().format(totalMissingDamage);

    return totalMissingDamage;
};

const COLOURS = ['#10B981', '#F43F5E'];

type RaidOverviewInfoProps = {
    raidId: string;
    raid: RaidData;
    raidList: RaidList;
    overviewPlayers: PlayersData | undefined;
    handleSelectionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

// const data = [
//     {
//         name: 'axis',
//         size: 2340045,
//     },
//     {
//         name: 'legend',
//         size: 2333313,
//     },
//     {
//         name: 'operator',
//         size: 234563,
//     },
// ];

// import React, { Component } from 'react';
// import Chart from 'react-apexcharts';
// import { ApexOptions } from 'apexcharts';
// import { RaidListDropdown } from './raid-list-dropdown';

// class Donut extends Component {
//     constructor(props: {} | Readonly<{}>) {
//         super(props);

//         this.state = {
//             options: {},
//             series: [44, 55, 41, 17, 15],
//             labels: ['A', 'B', 'C', 'D', 'E'],
//         };
//     }

//     render() {
//         return (
//             <div className="donut">
//                 <Chart options={this.state.options} series={this.state.series} type="donut" width="380" />
//             </div>
//         );
//     }
// }

// export default Donut;

// type TreeMapProps = {
//     players: PlayerData[];
// };
// function TreeMap({ players }: TreeMapProps) {
//     const chartData = players.map((player) => {
//         return {
//             x: player.player_name,
//             y: player.total_damage,
//         };
//     });

//     const options: ApexOptions = {
//         series: [
//             {
//                 data: chartData,
//             },
//         ],
//         legend: {
//             show: true,
//         },
//         chart: {
//             height: 350,
//             type: 'treemap',
//         },
//         title: {
//             text: 'Basic Treemap',
//         },
//     };

//     return (
//         <div className="donut">
//             <Chart options={options} series={options.series} type="treemap" />
//         </div>
//     );
// }

export function RaidOverviewInfo({ raidId, raid, raidList, overviewPlayers, handleSelectionChange }: RaidOverviewInfoProps) {
    const { data: raidCycles } = useRaidCycles(raidId);
    return (
        <Card className="h-full w-full min-w-72 p-2">
            <CardHeader className="flex min-w-fit flex-col items-center justify-between gap-4 sm:flex-row">
                <div className="flex w-full flex-row justify-between">
                    <div className="flex flex-row justify-start gap-4">
                        {<RaidListDropdown selectedItem={raidId} raidList={raidList} handleSelectionChange={handleSelectionChange} />}
                        {/* {raidList ? (
                            <div className="flex w-full max-w-sm flex-col gap-2">
                                <Select
                                    label="Select a raid"
                                    items={raidList.raids}
                                    className="min-w-64"
                                    scrollShadowProps={{
                                        isEnabled: false,
                                    }}
                                    selectedKeys={[raidId]}
                                    onChange={handleSelectionChange}
                                    renderValue={(items: SelectedItems<RaidData>) => {
                                        return items.map((item) => (
                                            <div key={item.key} className="flex items-center">
                                                <div className="flex flex-row items-center justify-center gap-0.5 text-xs text-default-500">
                                                    <span>Zone {item.data?.level}</span>
                                                    <span>|</span>
                                                    <span>Tier {item.data?.tier === '9999' ? 'Master' : item.data?.tier}</span>
                                                    <span>|</span>
                                                    <span>Season {item.data?.raid_season_sequence}</span>
                                                </div>
                                            </div>
                                        ));
                                    }}
                                >
                                    {(raid) => (
                                        <SelectItem key={raid.raid_id} textValue={raid.level}>
                                            <div className="flex items-center gap-2">
                                                <div className="flex flex-col">
                                                    <span className="text-small">Tier {raid.tier === '9999' ? 'Master' : raid.tier}</span>
                                                    <span className="text-tiny text-default-400">
                                                        Zone {raid.level}, Season {raid.raid_season_sequence}
                                                    </span>
                                                </div>
                                            </div>
                                        </SelectItem>
                                    )}
                                </Select>
                            </div>
                        ) : null} */}
                    </div>

                    {/* <Button className="flex sm:hidden" color="primary" onPress={() => refetchData()} isIconOnly isDisabled={!!raid?.ended_at}>
                        <ReloadIcon />
                    </Button>
                    <Button className="hidden sm:flex" color="primary" onPress={() => refetchData()} isDisabled={!!raid?.ended_at}>
                        Refresh
                    </Button> */}
                </div>
            </CardHeader>

            <CardBody className="gap-4">
                {/* <Divider />

                <div className="flex max-w-fit flex-col gap-2 rounded-md text-sm font-medium">
                    <CardTexts
                        title="Average Damage"
                        description={calculateAverageDamage(overviewPlayers?.players_data)}
                        isLoading={!!raidList?.raids}
                    />
                    <CardTexts title="Total Damage" description={calculateTotalDamage(overviewPlayers?.players_data)} isLoading={!!raidList?.raids} />
                    <CardTexts
                        title="Total Attacks"
                        description={countAttacks(raidCycles?.cycles?.length, overviewPlayers?.players_data, raid?.tier)}
                        isLoading={!!raidList?.raids}
                    />
                    <CardTexts
                        title="Missed Attacks"
                        description={countMissedAttacks(raidCycles?.cycles?.length, overviewPlayers?.players_data, raid?.tier)}
                        isLoading={!!raidList?.raids}
                    />
                    <CardTexts
                        title="Potential Missing Damage"
                        description={countMissingDamage(raidCycles?.cycles?.length, overviewPlayers?.players_data, raid?.tier)}
                        isLoading={!!raidList?.raids}
                    />
                </div>

                <Divider /> */}

                <div className="flex min-w-fit flex-col gap-8 sm:max-w-fit sm:flex-row">
                    <ResponsiveContainer width="100%" height="100%">
                        <div className="flex flex-col gap-4">
                            <h4 className="text-small font-semibold leading-none text-default-600">Attacks</h4>
                            <PieChart width={200} height={200}>
                                <Pie
                                    data={[
                                        {
                                            name: 'Attacks Submitted',
                                            value: calculateSum(overviewPlayers?.players_data || [], 'attack_count'),
                                        },
                                        {
                                            name: 'Missing Attacks',
                                            value: countMissedAttacks2(raidCycles?.cycles?.length, overviewPlayers?.players_data, raid?.tier),
                                        },
                                    ]}
                                    dataKey="value"
                                    innerRadius={60}
                                    outerRadius={80}
                                >
                                    {[
                                        {
                                            name: 'Attacks Submitted',
                                            value: calculateSum(overviewPlayers?.players_data || [], 'attack_count'),
                                        },
                                        {
                                            name: 'Missing Attacks',
                                            value: countMissedAttacks2(raidCycles?.cycles?.length, overviewPlayers?.players_data, raid?.tier),
                                        },
                                    ].map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLOURS[index]} />
                                    ))}
                                </Pie>
                            </PieChart>
                            <div className="flex flex-col gap-2">
                                <Divider />
                                <div className="flex flex-row justify-between">
                                    <Code color="success">Submitted</Code>
                                    {calculateSum(overviewPlayers?.players_data || [], 'attack_count')}
                                </div>
                                <Divider />
                                <div className="flex flex-row justify-between">
                                    <Code color="danger">Missing</Code>
                                    {countMissedAttacks2(raidCycles?.cycles?.length, overviewPlayers?.players_data, raid?.tier)}
                                </div>
                                <Divider />
                                <div className="flex flex-row justify-between">
                                    <Code color="default">Total</Code>
                                    {countAttacks2(raidCycles?.cycles?.length, overviewPlayers?.players_data, raid?.tier)}
                                </div>
                            </div>
                        </div>
                    </ResponsiveContainer>
                    <ResponsiveContainer width="100%" height="100%">
                        <div className="flex flex-col gap-4">
                            <h4 className="text-small font-semibold leading-none text-default-600">Damage</h4>
                            <PieChart width={200} height={200}>
                                <Pie
                                    data={[
                                        {
                                            name: 'Damage Submitted',
                                            value: calculateTotalDamage2(overviewPlayers?.players_data),
                                        },
                                        {
                                            name: 'Damage Missing',
                                            value: countMissingDamage2(raidCycles?.cycles?.length, overviewPlayers?.players_data, raid?.tier),
                                        },
                                    ]}
                                    dataKey="value"
                                    innerRadius={60}
                                    outerRadius={80}
                                >
                                    {[
                                        {
                                            name: 'Damage Submitted',
                                            value: calculateTotalDamage2(overviewPlayers?.players_data),
                                        },
                                        {
                                            name: 'Damage Missing',
                                            value: countMissingDamage2(raidCycles?.cycles?.length, overviewPlayers?.players_data, raid?.tier),
                                        },
                                    ].map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLOURS[index]} />
                                    ))}
                                </Pie>
                            </PieChart>
                            <div className="flex flex-col gap-2">
                                <Divider />
                                <div className="flex flex-row justify-between">
                                    <Code color="success">Submitted</Code>
                                    {formatter().format(calculateTotalDamage2(overviewPlayers?.players_data))}
                                </div>
                                <Divider />
                                <div className="flex flex-row justify-between">
                                    <Code color="danger">Missing</Code>
                                    {formatter().format(countMissingDamage2(raidCycles?.cycles?.length, overviewPlayers?.players_data, raid?.tier))}
                                </div>
                                <Divider />
                                <div className="flex flex-row justify-between">
                                    <Code color="default">Est. Total</Code>
                                    {formatter().format(
                                        calculateTotalDamage2(overviewPlayers?.players_data) +
                                            countMissingDamage2(raidCycles?.cycles?.length, overviewPlayers?.players_data, raid?.tier)
                                    )}
                                </div>
                                <Divider />
                                <div className="flex flex-row justify-between">
                                    <Code color="default">Average</Code>
                                    {formatter().format(calculateAverageDamage2(overviewPlayers?.players_data))}
                                </div>
                            </div>
                        </div>
                    </ResponsiveContainer>
                </div>

                {/* <div className="h-[600px] max-h-fit min-h-fit w-[1200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <Treemap width={400} height={200} data={myData} dataKey="size" aspectRatio={4 / 3} stroke="#fff" fill="#8884d8" />
                    </ResponsiveContainer>
                </div> */}
                {/* <Donut />
                <TreeMap players={overviewPlayers?.players_data || []} /> */}

                <div className="flex flex-row items-center justify-start gap-2">
                    <InfoCircledIcon className="h-4 min-h-4 w-4 min-w-4" />
                    <span className="text-sm italic">Only players who already submitted attacks will be shown</span>
                </div>
            </CardBody>
        </Card>
    );
}
