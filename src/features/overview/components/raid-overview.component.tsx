import { RaidTable } from './raid-table.component';
import { RaidOverviewInfo } from './raid-overview-info.component';
import { RaidBuffMappingType, RaidCycle, useRaidCycles, useRaidList } from '@/features/raid-info';
import { useOverviewPlayers } from '../api/get-overview-players';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { RaidListDropdown } from './raid-list-dropdown';
import { RaidBuffMapping } from '@/constants/buffs';
import { Card, CardBody, CardHeader, Divider, Spinner, Tooltip } from '@nextui-org/react';
import { convertUTCDateToLocalDate } from '@/utils/string-formatter';
import { RaidPlayerDamageOverview } from './raid-player-damage-overview.component';

const calculateRounds = (date1: Date, date2: Date) => {
    const totalHours = Math.abs(date1.getTime() - date2.getTime()) / 36e5;
    const hoursPerRound = 12;

    return (totalHours / hoursPerRound).toFixed(2);
};

type RaidNextCycleTextProps = {
    cycles: RaidCycle[];
};

const RaidNextCycleText = ({ cycles }: RaidNextCycleTextProps) => {
    if (!cycles || !cycles.length) return null;

    const nextReset = cycles.sort((a, b) => (a.cycle > b.cycle ? 1 : -1))[cycles.length - 1].next_reset_at;

    return (
        <div className="flex justify-between text-sm font-medium">
            <span>Next Cycle</span>
            <Tooltip showArrow={true} content={new Date(nextReset).toUTCString()}>
                <span className="text-sm font-medium">{convertUTCDateToLocalDate(nextReset)}</span>
            </Tooltip>
        </div>
    );
};

export function Overview() {
    const { data: raidList } = useRaidList();

    const raidId = raidList?.raids[0].raid_id;

    const [value, setValue] = useState<string | undefined>(raidId);

    const { data: overviewPlayers, isLoading: isLoadingOverviewPlayers } = useOverviewPlayers(value);

    useEffect(() => {
        setValue(raidId);
    }, [raidId]);

    // const refetchData = useCallback(() => {
    //     refetchRaidCycles();
    //     refetchRaidList();
    //     refetchOverviewPlayers();
    // }, []);

    const handleSelectionChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === value || !e.target.value) return;
        setValue(e.target.value);
    }, []);

    const findRaid = useMemo(() => raidList?.raids?.find((r) => r.raid_id === value), [value]);

    const { data: raidCycles } = useRaidCycles(value);

    // const hasRaidStarted = () => {
    //     const raid = findRaid;

    //     if (!raid) return false;

    //     const startDate = new Date(raid.started_at);
    //     const now = new Date();

    //     const diff = startDate.getTime() - now.getTime();

    //     return diff < 0;
    // };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row">
                {raidList && value && findRaid && (
                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-col">
                        <RaidListDropdown selectedItem={value} raidList={raidList} handleSelectionChange={handleSelectionChange} />
                        <Card className="w-full sm:max-w-sm">
                            <CardHeader className="text-lg font-medium">Raid Info</CardHeader>
                            <CardBody className="gap-4">
                                <Divider />
                                <div className="gap-2">
                                    <div className="flex justify-between text-sm font-medium">
                                        <span>Bonus</span>
                                        <span>{RaidBuffMapping[findRaid?.buff_type as RaidBuffMappingType]} </span>
                                    </div>
                                    <div className="flex justify-between text-sm font-medium">
                                        <span>Start</span>
                                        <Tooltip showArrow={true} content={new Date(findRaid.started_at).toUTCString()}>
                                            <span className="text-sm font-medium">{convertUTCDateToLocalDate(findRaid.started_at)}</span>
                                        </Tooltip>
                                    </div>

                                    {findRaid.ended_at != null ? (
                                        <div className="flex justify-between text-sm font-medium">
                                            <span>End</span>
                                            <Tooltip showArrow={true} content={new Date(findRaid.ended_at!).toUTCString()}>
                                                <span className="text-sm font-medium">{convertUTCDateToLocalDate(findRaid.ended_at!)}</span>
                                            </Tooltip>
                                        </div>
                                    ) : (
                                        <RaidNextCycleText cycles={raidCycles?.cycles || []} />
                                    )}

                                    {findRaid.ended_at != null ? (
                                        <div className="flex justify-between space-x-4 text-sm font-medium">
                                            <span>Rounds</span>
                                            {raidCycles && (
                                                <span>{calculateRounds(new Date(findRaid.started_at), new Date(findRaid.ended_at!))}</span>
                                            )}
                                        </div>
                                    ) : null}
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                )}

                {isLoadingOverviewPlayers ? (
                    <>
                        <Card className="flex w-full flex-row items-center justify-center space-y-5 p-4 sm:max-w-md" radius="lg">
                            <Spinner />
                        </Card>
                        <Card className="flex w-full flex-row items-center justify-center space-y-5 p-4 sm:max-w-md" radius="lg">
                            <Spinner />
                        </Card>
                    </>
                ) : (
                    value &&
                    overviewPlayers?.players_data &&
                    overviewPlayers?.players_data?.length > 0 &&
                    findRaid && <RaidOverviewInfo raidId={value} raid={findRaid} overviewPlayers={overviewPlayers} />
                )}
            </div>
            {isLoadingOverviewPlayers ? (
                <Card className="flex w-full flex-row items-center justify-center space-y-5 p-4 sm:max-w-md" radius="lg">
                    <Spinner />
                </Card>
            ) : (
                value &&
                overviewPlayers?.players_data &&
                overviewPlayers?.players_data?.length > 0 &&
                findRaid && <RaidPlayerDamageOverview playersData={overviewPlayers?.players_data} />
            )}

            {value && findRaid && <RaidTable raidId={value} raid={findRaid} />}
        </div>
    );
}
