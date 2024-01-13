import { Card, CardBody, CardHeader, Divider, Image, Skeleton, Tooltip } from '@nextui-org/react';
import { RaidBuffMapping } from '@/constants/buffs';
import { convertUTCDateToLocalDate, getOrdinalSuffix, getRaidLabel } from '@/utils/string-formatter';
import { RaidBuffMappingType, RaidCycle, RaidData } from '..';

type CardRaidInfoProps = {
    raidData?: RaidData;
    raidCycle?: RaidCycle;
};

const raidIconFileName = 'Raid';

function getImageUrl(name: string): string {
    return new URL(`../../../assets/${name}.webp`, import.meta.url).href;
}

export function RaidInfo({ raidCycle, raidData }: CardRaidInfoProps) {
    return (
        <Card className="dark:bg-neutral-800 min-w-72 w-full h-full p-2">
            <CardHeader className="flex flex-row items-center justify-between gap-4">
                <div className="flex flex-row items-center justify-start gap-4">
                    <div className="min-w-fit">
                        <Skeleton isLoaded={!!raidData} className="rounded-md">
                            <Image src={getImageUrl(raidIconFileName)} className="rounded-lg flex object-cover h-8 w-8" />
                        </Skeleton>
                    </div>
                    <Skeleton isLoaded={!!raidData} className="rounded-md">
                        {raidData && <h3 className="text-lg font-medium">{getRaidLabel(raidData.tier, raidData.level)}</h3>}
                    </Skeleton>
                </div>

                <Skeleton isLoaded={!!raidData} className="rounded-md">
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
                        <Skeleton isLoaded={!!raidData} className="rounded-md">
                            <span>Raid Bonus</span>
                        </Skeleton>
                        <Skeleton isLoaded={!!raidData} className="rounded-md">
                            {raidData && <span>{RaidBuffMapping[raidData.buff_type as RaidBuffMappingType]} </span>}
                        </Skeleton>
                    </div>

                    <div className="text-sm font-medium flex justify-between">
                        <Skeleton isLoaded={!!raidData} className="rounded-md">
                            <span>Raid start</span>
                        </Skeleton>
                        <Skeleton isLoaded={!!raidData} className="rounded-md">
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
                    ) : raidCycle != null ? (
                        <div className="text-sm font-medium flex justify-between">
                            <Skeleton isLoaded={!!raidData} className="rounded-md">
                                <span>Next cycle</span>
                            </Skeleton>
                            <Skeleton isLoaded={!!raidData} className="rounded-md">
                                {raidCycle && (
                                    <Tooltip showArrow={true} content={new Date(raidCycle.next_reset_at).toUTCString()}>
                                        <span className="text-sm font-medium">{convertUTCDateToLocalDate(raidCycle.next_reset_at)}</span>
                                    </Tooltip>
                                )}
                            </Skeleton>
                        </div>
                    ) : null}
                </div>

                <div className="flex items-center justify-end">
                    <Skeleton isLoaded={!!raidData} className="rounded-md">
                        <span className="text-sm font-light text-right italic">All times are local</span>
                    </Skeleton>
                </div>
            </CardBody>
        </Card>
    );
}
