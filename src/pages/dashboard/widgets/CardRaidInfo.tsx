import { Card, CardBody, CardHeader, Divider, Image, Skeleton, Tooltip } from '@nextui-org/react';
import { RaidCycle, RaidData } from '../raid-log/types';
import { getRaidLabel } from '@/lib/utils';

type CardRaidInfoProps = {
    raidData?: RaidData;
    raidCycle?: RaidCycle;
};

const convertUTCDateToLocalDate = (dateString: string): string =>
    new Date(dateString + '.000Z').toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });

const getOrdinalSuffix = (value: number): string => ['st', 'nd', 'rd'][((((value + 90) % 100) - 10) % 10) - 1] || 'th';

const RaidBuffMapping = {
    ArmorDamage: 'Armor Damage +25%',
    HeadDamage: 'Head Damage +30%',
    BurstDamage: 'Burst Damage +30%',
    AfflictedDamage: 'Affliction Damage +30%',
    AllRaidDamage: 'All Raid Damage +15%',
    BurstChance: 'Burst Chance +30%',
    AfflictedDuration: 'Affliction Duration +40%',
    ChestDamage: 'Torso Damage +30%',
    LimbDamage: 'Limb Damage +30%',
    AfflictedChance: 'Affliction Chance +30%',
    RaidAttackDuration: 'Attack Duration +3s',
    BodyDamage: 'Body Damage +20%',
    SupportEffect: 'All Support Effects +15%',
} as const;

type RaidBuffMappingType = keyof typeof RaidBuffMapping;

const raidIconFileName = 'Raid';

function getImageUrl(name: string): string {
    return new URL(`../../../assets/${name}.webp`, import.meta.url).href;
}

export default function CardRaidInfo({ raidCycle, raidData }: CardRaidInfoProps) {
    // if (!raidData) return null;

    // const { buff_type, level, started_at: raid_started_at, ended_at, tier } = raidData;

    return (
        <Card className="dark:bg-neutral-800 min-w-72 w-full h-full p-2">
            <CardHeader className="flex flex-row items-center justify-between gap-4">
                <div className="flex flex-row items-center justify-start gap-4">
                    <div className="min-w-fit">
                        <Skeleton isLoaded={!!raidData} className="rounded-lg">
                            <Image src={getImageUrl(raidIconFileName)} className="rounded-lg flex object-cover h-8 w-8" />
                        </Skeleton>
                    </div>
                    <Skeleton isLoaded={!!raidData} className="rounded-lg">
                        {raidData && <h3 className="text-lg font-medium">{getRaidLabel(raidData.tier, raidData.level)}</h3>}
                    </Skeleton>
                </div>

                <Skeleton isLoaded={!!raidData} className="rounded-lg">
                    {raidCycle != null && (
                        <div className="text-xl font-bold">
                            {raidCycle.cycle}
                            <span className="text-sm font-semibold">
                                {getOrdinalSuffix(raidCycle.cycle)}
                                {' round'}
                            </span>
                        </div>
                    )}
                </Skeleton>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
                <Divider />

                <div className="flex flex-col gap-2">
                    <div className="text-sm font-medium flex justify-between space-x-4">
                        <Skeleton isLoaded={!!raidData} className="rounded-lg">
                            <span>Raid Bonus</span>
                        </Skeleton>
                        <Skeleton isLoaded={!!raidData} className="rounded-lg">
                            {raidData && <span>{RaidBuffMapping[raidData.buff_type as RaidBuffMappingType]} </span>}
                        </Skeleton>
                    </div>

                    <div className="text-sm font-medium flex justify-between">
                        <Skeleton isLoaded={!!raidData} className="rounded-lg">
                            <span>Raid start</span>
                        </Skeleton>
                        <Skeleton isLoaded={!!raidData} className="rounded-lg">
                            {raidData && (
                                <Tooltip showArrow={true} content={new Date(raidData.started_at).toUTCString()}>
                                    <span className="text-sm font-medium">{convertUTCDateToLocalDate(raidData.started_at)}</span>
                                </Tooltip>
                            )}
                        </Skeleton>
                    </div>

                    {raidData?.ended_at != null ? (
                        <div className="text-sm font-medium flex justify-between">
                            <span>Raid end</span>
                            <Tooltip showArrow={true} content={new Date(raidData.ended_at).toUTCString()}>
                                <span className="text-sm font-medium">{convertUTCDateToLocalDate(raidData.ended_at)}</span>
                            </Tooltip>
                        </div>
                    ) : (
                        <div className="text-sm font-medium flex justify-between">
                            <Skeleton isLoaded={!!raidData} className="rounded-lg">
                                <span>Next cycle</span>
                            </Skeleton>
                            <Skeleton isLoaded={!!raidData} className="rounded-lg">
                                {raidCycle && (
                                    <Tooltip showArrow={true} content={new Date(raidCycle.next_reset_at).toUTCString()}>
                                        <span className="text-sm font-medium">{convertUTCDateToLocalDate(raidCycle.next_reset_at)}</span>
                                    </Tooltip>
                                )}
                            </Skeleton>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-end">
                    <Skeleton isLoaded={!!raidData} className="rounded-lg">
                        <span className="text-sm font-light text-right italic">All times are local</span>
                    </Skeleton>
                </div>
            </CardBody>
        </Card>
    );
}
