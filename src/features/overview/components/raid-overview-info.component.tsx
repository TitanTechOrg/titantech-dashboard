import { Button, Card, CardBody, CardHeader, Divider, Image, Skeleton } from '@nextui-org/react';
import { getRaidLabel } from '@/utils/string-formatter';
import CardLogo from '@/assets/Raid.webp';
import { RaidData, useRaidCycles, useRaidList } from '@/features/raid-info';
import { useOverviewPlayers } from '../api/get-overview-players';
import { PlayerData } from '../types';
import { formatter } from '@/utils/number-formatter';
import { InfoCircledIcon, ReloadIcon } from '@radix-ui/react-icons';

const calculateSum = (obj: any[], field: string) => obj.map((items) => items[field]).reduce((prev: number, curr: number) => prev + curr, 0);

const calculateAverageDamage = (overviewPlayers: PlayerData[] | undefined) => {
    if (overviewPlayers == null) return '';

    const avgDamage = calculateSum(overviewPlayers, 'average_damage') / overviewPlayers.length;
    const formattedDamage = formatter().format(avgDamage);

    return formattedDamage;
};

const calculateTotalDamage = (overviewPlayers: PlayerData[] | undefined) => {
    if (overviewPlayers == null) return '';

    const totalDamage = calculateSum(overviewPlayers, 'total_damage');
    const formattedDamage = formatter().format(totalDamage);

    return formattedDamage;
};

const countAttacks = (cycleAmount: number | undefined, overviewPlayers: PlayerData[] | undefined, raidType: RaidData | undefined) => {
    if (overviewPlayers == null || cycleAmount == null || raidType == null) return '';

    const attackCount = calculateSum(overviewPlayers, 'attack_count');

    const attacksPerCycle = raidType.tier === '9999' ? 6 : 5;
    const totalAttacks = cycleAmount * overviewPlayers.length * attacksPerCycle;

    return `${attackCount}/${totalAttacks}`;
};

const countMissedAttacks = (cycleAmount: number | undefined, overviewPlayers: PlayerData[] | undefined, raidType: RaidData | undefined) => {
    if (overviewPlayers == null || cycleAmount == null || raidType == null) return '';

    const attackCount = calculateSum(overviewPlayers, 'attack_count');

    const attacksPerCycle = raidType.tier === '9999' ? 6 : 5;
    const totalAttacks = cycleAmount * overviewPlayers.length * attacksPerCycle;
    const missedAttacks = totalAttacks - attackCount;

    return `${missedAttacks}`;
};

const countMissingDamage = (cycleAmount: number | undefined, overviewPlayers: PlayerData[] | undefined, raidType: RaidData | undefined) => {
    if (overviewPlayers == null || cycleAmount == null || raidType == null) return '';

    const attacksPerCycle = (raidType.tier === '9999' ? 6 : 5) * cycleAmount;
    const playersMissingAttacks = overviewPlayers.filter(({ attack_count }: PlayerData) => attack_count !== attacksPerCycle);
    const totalMissingDamage = playersMissingAttacks
        .map(({ average_damage, attack_count }: PlayerData) => average_damage * (attacksPerCycle - attack_count))
        .reduce((prev: number, curr: number) => prev + curr, 0);

    const formattedDamage = formatter().format(totalMissingDamage);

    return formattedDamage;
};

export function RaidOverviewInfo() {
    const { data: raidCycles, refetch: refetchRaidCycles, isRefetching: isRefetchingRaidCycles } = useRaidCycles();
    const { data: raidList, refetch: refetchRaidList, isRefetching: isRefetchingRaidList } = useRaidList();
    const { data: overviewPlayers, refetch: refetchOverviewPlayers, isRefetching: isRefetchingOverviewPlayers } = useOverviewPlayers();

    const refetchData = () => {
        refetchRaidCycles();
        refetchRaidList();
        refetchOverviewPlayers();
    };

    console.log(raidList?.raids[0].ended_at);

    return (
        <Card className="h-full w-full min-w-72 p-2 dark:bg-neutral-800">
            <CardHeader className="flex min-w-fit flex-row items-center justify-between">
                <div className="flex flex-row justify-start gap-4">
                    <Skeleton isLoaded={!!raidList?.raids} className="rounded-md">
                        <Image src={CardLogo} className="h-8 w-8 rounded object-cover" />
                    </Skeleton>
                    <Skeleton isLoaded={!!raidList?.raids} className="rounded-md">
                        {raidList && raidList?.raids[0] && (
                            <h3 className="text-lg font-medium">{getRaidLabel(raidList?.raids[0].tier, raidList?.raids[0].level)}</h3>
                        )}
                    </Skeleton>
                </div>
                <Button
                    className="flex sm:hidden"
                    color="primary"
                    isLoading={isRefetchingRaidCycles && isRefetchingRaidList && isRefetchingOverviewPlayers}
                    onPress={() => refetchData()}
                    isIconOnly
                    isDisabled={!!raidList?.raids[0].ended_at}
                >
                    <ReloadIcon />
                </Button>
                <Button
                    className="hidden sm:flex"
                    color="primary"
                    isLoading={isRefetchingRaidCycles && isRefetchingRaidList && isRefetchingOverviewPlayers}
                    onPress={() => refetchData()}
                    isDisabled={!!raidList?.raids[0].ended_at}
                >
                    Refresh
                </Button>
            </CardHeader>

            <CardBody className="gap-4">
                <Divider />

                <div className="flex max-w-fit flex-col gap-2 rounded-md text-sm font-medium">
                    <Skeleton isLoaded={!!raidList?.raids}>
                        <div className="flex flex-row items-center justify-between gap-12">
                            <span>Average Damage</span>
                            <span>{calculateAverageDamage(overviewPlayers?.players_data)}</span>
                        </div>
                    </Skeleton>
                    <Skeleton isLoaded={!!raidList?.raids}>
                        <div className="flex flex-row items-center justify-between gap-12">
                            <span>Total Damage</span>
                            <span>{calculateTotalDamage(overviewPlayers?.players_data)}</span>
                        </div>
                    </Skeleton>
                    <Skeleton isLoaded={!!raidList?.raids}>
                        <div className="flex flex-row items-center justify-between gap-12">
                            <span>Total Attacks</span>
                            <span>{countAttacks(raidCycles?.cycles?.length, overviewPlayers?.players_data, raidList?.raids[0])}</span>
                        </div>
                    </Skeleton>
                    <Skeleton isLoaded={!!raidList?.raids}>
                        <div className="flex flex-row items-center justify-between gap-12">
                            <span>Missed Attacks</span>
                            <span>{countMissedAttacks(raidCycles?.cycles?.length, overviewPlayers?.players_data, raidList?.raids[0])}</span>
                        </div>
                    </Skeleton>
                    <Skeleton isLoaded={!!raidList?.raids}>
                        <div className="flex flex-row items-center justify-between gap-12">
                            <span>Potential Missing Damage</span>
                            <span>{countMissingDamage(raidCycles?.cycles?.length, overviewPlayers?.players_data, raidList?.raids[0])}</span>
                        </div>
                    </Skeleton>
                </div>

                <Divider />

                <div className="flex flex-row items-center justify-start gap-2">
                    <InfoCircledIcon className="h-4 min-h-4 w-4 min-w-4" />
                    <span className="text-sm italic">Only players who already submitted attacks will be shown</span>
                </div>
            </CardBody>
        </Card>
    );
}
