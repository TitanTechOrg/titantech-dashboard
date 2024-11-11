import MirrorForceCardLogo from '@/assets/cards/MirrorForce.webp';
import TeamTacticsCardLogo from '@/assets/cards/TeamTactics.webp';
import AverageDamageCardLogo from '@/assets/Decks.webp';
import { AttacksCard, useFetchedAttacks, useFetchedAttacksV3 } from '@/features/attacks';
import {
    CardBonusData,
    DamageCardChartData,
    PercentageCardsType,
    RaidCycle,
    RaidDamageInfo,
    RaidInfo,
    useRaidCycles,
    useRaidList,
} from '@/features/raid-info';
import { CurrentTitanStatus, TitanSequence, TitansSequence, useRaidTitans } from '@/features/titans';
import { useBoundStore } from '@/stores/bound.store';
import { useEffect, useMemo } from 'react';

export default function Dashboard() {
    const { setTitans, currentTitan, setCurrentTitan, titans } = useBoundStore();

    const { data: raidCycles } = useRaidCycles();

    const { data: raidTitansData } = useRaidTitans();
    const { data: raidListData } = useRaidList();

    const raidAttacks = useFetchedAttacks();
    const {
        data: fetchedAttacksV3,
        isLoading: fetchedAttacksV3IsLoading,
        isError: fetchedAttacksV3IsError,
    } = useFetchedAttacksV3('e0822cf3-b7ca-499c-a1b9-35582c125173');

    console.log(fetchedAttacksV3, fetchedAttacksV3IsLoading, fetchedAttacksV3IsError);

    const isRaidStarted = useMemo(
        () => () => {
            const start = raidListData?.raids[0]?.started_at;
            if (!start) return false;

            const startTime = new Date(start);

            if (!isFinite(+startTime)) return false;

            const now = new Date();

            return now.getTime() > startTime.getTime();
        },
        [raidListData?.raids[0]?.started_at]
    );

    // const attackTimeline = useAttackTimeline();
    // console.log('attackTimeline', attackTimeline.data);

    useEffect(() => {
        if (raidTitansData) {
            setTitans(raidTitansData.titans);
        }
    }, [raidTitansData, setTitans]);

    useEffect(() => {
        if (!titans) return;
        if (!raidAttacks?.data?.pages || !raidAttacks?.data?.pages?.length) return;

        let foundLatestTitan: TitanSequence | undefined = undefined;

        // raid has yet to start
        if (!raidAttacks?.data?.pages[0]?.attack_logs[0]) {
            foundLatestTitan = titans[0];
        }

        if (!foundLatestTitan) {
            foundLatestTitan = titans[0];
        }

        if (foundLatestTitan) {
            setCurrentTitan(foundLatestTitan);
        }

        const latestTitanId = raidAttacks?.data?.pages[0]?.attack_logs[0]?.raid_titan_id;
        if (!latestTitanId) return;

        foundLatestTitan = titans.find((titan) => titan.id === latestTitanId);

        if (foundLatestTitan) {
            setCurrentTitan(foundLatestTitan);
        }
    }, [raidAttacks?.data?.pages, titans]);

    const getBonuses = useMemo(() => {
        const data: PercentageCardsType[] = [];

        const moraleData: PercentageCardsType = {
            bonus: [],
            imageUrl: TeamTacticsCardLogo,
            title: 'Morale',
        };

        const mirrorForceData: PercentageCardsType = {
            bonus: [],
            imageUrl: MirrorForceCardLogo,
            title: 'Mirror Force',
        };

        data.push(moraleData);
        data.push(mirrorForceData);

        if (!raidCycles || raidCycles.cycles.length === 0) return data;

        const cycles = raidCycles.cycles;

        const moraleBonuses = (raidCycles: RaidCycle[]) =>
            raidCycles.map(({ morale, team_tactics }: RaidCycle) => {
                return ((morale + team_tactics) * 100).toFixed(2);
            });

        const mirrorForceBonuses = (raidCycles: RaidCycle[]) =>
            raidCycles.map(({ mirror_force }: RaidCycle) => {
                return (mirror_force * 100).toFixed(0);
            });

        data[0].bonus = moraleBonuses(cycles);
        data[1].bonus = mirrorForceBonuses(cycles);

        return data;
    }, [raidCycles?.cycles.length]);

    const mapDamageStatsData = useMemo(() => {
        let data: DamageCardChartData[] = [];

        if (!raidCycles || raidCycles.cycles.length === 0) return data;

        const cycles = raidCycles;

        const getAverageClanDamage = (raidCycles: RaidCycle[]) => {
            const averageDamage = raidCycles.map(({ average_damage }: RaidCycle) => {
                return Math.round(average_damage);
            });

            return averageDamage;
        };

        const getOverallClanDamage = (raidCycles: RaidCycle[]) => {
            // should exclude the current round
            // const rounds = raidCycles.slice(0, raidCycles.length - 1);
            const rounds = raidCycles;

            const sum = (arr: RaidCycle[]) => {
                return arr.reduce((prev, curr) => prev + curr.average_damage, 0);
            };

            const avg = (arr: RaidCycle[], index: number) => {
                const tempArr = arr.slice(0, index + 1);
                return sum(tempArr) / tempArr.length;
            };

            const result = rounds.map((_, index) => Math.round(avg(rounds, index)));

            return result;
        };

        const mapDamageData = (dataA: number[], dataB: number[]) => {
            const tempDataA = dataA.map((val, index) => {
                const data = {
                    name: index + 1,
                    average: val,
                };
                return data;
            });
            const tempDataB = dataB.map((val, index) => {
                const data = {
                    name: index + 1,
                    overall: val,
                };
                return data;
            });

            const map = new Map();
            tempDataA.forEach((item) => map.set(item.name, item));
            tempDataB.forEach((item) => map.set(item.name, { ...map.get(item.name), ...item }));

            const mergedArr = Array.from(map.values());

            return mergedArr;
        };

        data = mapDamageData(getAverageClanDamage(cycles.cycles), getOverallClanDamage(cycles.cycles));

        return data;
    }, [raidCycles?.cycles.length]);

    //  md:bg-red-500 lg:bg-blue-500 sm:bg-yellow-500 bg-green-500 xl:bg-purple-500 2xl:bg-gray-400
    return (
        <>
            <div className="grid grid-cols-1 gap-4 px-0 pb-4 md:grid-cols-2 md:grid-rows-4 lg:grid-cols-3 lg:grid-rows-3">
                <div className="row-start-1 md:col-start-1 md:row-span-1 md:row-start-1 lg:row-span-1">
                    <RaidInfo
                        raidData={raidListData?.raids && raidListData?.raids?.length > 0 ? raidListData?.raids[0] : undefined}
                        raidCycle={raidCycles?.cycles[raidCycles?.cycles.length - 1]}
                    />
                </div>

                <div className="row-start-2 md:col-start-1 md:row-span-2 md:row-start-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
                    <CurrentTitanStatus titan={currentTitan} />
                </div>

                {isRaidStarted() && (
                    <div className="row-start-5 md:col-span-2 md:col-start-1 md:row-span-1 md:row-start-4 lg:col-span-3 lg:col-start-1 lg:row-span-1 lg:row-start-3 lg:min-h-36">
                        <RaidDamageInfo title="Damage stats" imageUrl={AverageDamageCardLogo} data={mapDamageStatsData} />
                    </div>
                )}

                <div className="row-start-4 md:col-start-2 md:row-span-1 md:row-start-3 lg:col-start-1 lg:row-span-1 lg:row-start-2 lg:min-h-36">
                    <CardBonusData data={getBonuses} />
                </div>

                <div className="row-start-3 md:col-start-2 md:row-span-2 md:row-start-1 lg:col-span-1 lg:col-start-3 lg:row-span-2">
                    <TitansSequence />
                </div>
            </div>

            {isRaidStarted() && <AttacksCard {...raidAttacks} />}

            {/* Matrix: 
                x = cycle
                y = 1-12 as every cycle has this amount
                v = count attacks occurred in x.y hour
                dataset width = Math.max(data.x) - 1
                dataset height = Math.max(data.y) - 1
            */}

            {/* <Matrix
                data={{
                    datasets: [
                        {
                            label: 'Basic matrix',
                            data: [
                                { x: 1, y: 1 },
                                { x: 2, y: 1 },
                                { x: 1, y: 2 },
                                { x: 2, y: 2 },
                            ],
                            borderWidth: 1,
                            borderColor: 'rgba(0,0,0,0.5)',
                            backgroundColor: 'rgba(200,200,0,0.3)',
                            width: ({ chart }) => (chart.chartArea || {}).width / 2 - 1,
                            height: ({ chart }) => (chart.chartArea || {}).height / 2 - 1,
                        },
                    ],
                }}
                options={{
                    scales: {
                        x: {
                            display: true,
                            min: 0.5,
                            max: 2.5,
                            offset: false,
                        },
                        y: {
                            display: true,
                            min: 0.5,
                            max: 2.5,
                        },
                    },
                }}
            /> */}

            {/* <Chart
                id="matrix-chart"
                type="matrix"
                data={{
                    datasets: [
                        {
                            label: 'Basic matrix',
                            data: [
                                {
                                    x: 'A',
                                    y: 'X',
                                    v: 11,
                                },
                                {
                                    x: 'A',
                                    y: 'Y',
                                    v: 12,
                                },
                                {
                                    x: 'A',
                                    y: 'Z',
                                    v: 13,
                                },
                                {
                                    x: 'B',
                                    y: 'X',
                                    v: 21,
                                },
                                {
                                    x: 'B',
                                    y: 'Y',
                                    v: 22,
                                },
                                {
                                    x: 'B',
                                    y: 'Z',
                                    v: 23,
                                },
                                {
                                    x: 'C',
                                    y: 'X',
                                    v: 31,
                                },
                                {
                                    x: 'C',
                                    y: 'Y',
                                    v: 32,
                                },
                                {
                                    x: 'C',
                                    y: 'Z',
                                    v: 33,
                                },
                            ],
                            borderWidth: 1,
                            borderColor: 'rgba(0,0,0,0.5)',
                            backgroundColor: 'rgba(200,200,0,0.3)',
                            // width: ({ chart }) => (chart.chartArea || {}).width / 2 - 1,
                            // height: ({ chart }) => (chart.chartArea || {}).height / 2 - 1,
                            width: ({ chart }) => (chart.chartArea || {}).width / 3 - 1,
                            height: ({ chart }) => (chart.chartArea || {}).height / 3 - 1,
                        },
                    ],
                }}
                // options={{
                //     scales: {
                //         x: {
                //             display: true,
                //             min: 0.5,
                //             max: 2.5,
                //             offset: false,
                //         },
                //         y: {
                //             display: true,
                //             min: 0.5,
                //             max: 2.5,
                //         },
                //     },
                // }}
                options={{
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                title() {
                                    return '';
                                },
                                label(context) {
                                    const v = context.dataset.data[context.dataIndex];
                                    return ['x: ' + v.x, 'y: ' + v.y, 'v: ' + v.v];
                                },
                            },
                        },
                    },
                    scales: {
                        x: {
                            type: 'category',
                            labels: ['A', 'B', 'C'],
                            ticks: {
                                display: true,
                            },
                            grid: {
                                display: false,
                            },
                        },
                        y: {
                            type: 'category',
                            labels: ['X', 'Y', 'Z'],
                            offset: true,
                            ticks: {
                                display: true,
                            },
                            grid: {
                                display: false,
                            },
                        },
                    },
                }}
                fallbackContent={<div>chart ded</div>}
            /> */}
        </>
    );
}
