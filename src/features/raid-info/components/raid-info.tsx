import { RaidBuffMapping } from '@/constants/buffs';
import {
  convertUTCDateToLocalDate,
  getOrdinalSuffix,
  getRaidLabel,
} from '@/utils';
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Skeleton,
  Tooltip,
} from '@heroui/react';
import { RaidBuffMappingType, RaidCycle, RaidData } from '..';

type CardRaidInfoProps = {
  raidData?: RaidData;
  raidCycle?: RaidCycle;
};

export function RaidInfo({ raidCycle, raidData }: CardRaidInfoProps) {
  return (
    <Card className="h-full w-full min-w-72 p-2 dark:bg-neutral-800">
      <CardHeader className="flex h-[70px] flex-row items-center justify-between gap-4">
        <div className="flex flex-row items-center justify-start gap-4">
          <Skeleton isLoaded={!!raidData} className="rounded-md">
            {raidData && (
              <h3 className="text-left text-lg font-medium">
                {getRaidLabel({
                  tierLabel: raidData.tierLabel,
                  level: raidData.level,
                })}
              </h3>
            )}
          </Skeleton>
        </div>

        <Skeleton isLoaded={!!raidData} className="rounded-md">
          {raidCycle != null && (
            <div className="text-lg font-bold">
              {raidCycle.cycle}
              <span className="text-sm font-semibold">{`${getOrdinalSuffix(raidCycle.cycle)} round`}</span>
            </div>
          )}
        </Skeleton>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between space-x-4 text-sm font-medium">
            <Skeleton isLoaded={!!raidData} className="rounded-md">
              <span>Raid Bonus</span>
            </Skeleton>
            <Skeleton isLoaded={!!raidData} className="rounded-md">
              {raidData && raidData.buff_type ? (
                <span>
                  {
                    RaidBuffMapping[raidData.buff_type as RaidBuffMappingType]
                  }{' '}
                </span>
              ) : (
                <span>None</span>
              )}
            </Skeleton>
          </div>

          <div className="flex justify-between text-sm font-medium">
            <Skeleton isLoaded={!!raidData} className="rounded-md">
              <span>Raid start</span>
            </Skeleton>
            <Skeleton isLoaded={!!raidData} className="rounded-md">
              {raidData && (
                <Tooltip
                  showArrow={true}
                  content={new Date(raidData.started_at).toUTCString()}
                >
                  <span className="text-sm font-medium">
                    {convertUTCDateToLocalDate(raidData.started_at)}
                  </span>
                </Tooltip>
              )}
            </Skeleton>
          </div>

          {raidData?.ended_at != null ? (
            <div className="flex justify-between text-sm font-medium">
              <span>Raid end</span>
              <Tooltip
                showArrow={true}
                content={new Date(raidData.ended_at).toUTCString()}
              >
                <span className="text-sm font-medium">
                  {convertUTCDateToLocalDate(raidData.ended_at)}
                </span>
              </Tooltip>
            </div>
          ) : raidCycle != null ? (
            <div className="flex justify-between text-sm font-medium">
              <Skeleton isLoaded={!!raidData} className="rounded-md">
                <span>Next cycle</span>
              </Skeleton>
              <Skeleton isLoaded={!!raidData} className="rounded-md">
                {raidCycle && (
                  <Tooltip
                    showArrow={true}
                    content={new Date(raidCycle.next_reset_at).toUTCString()}
                  >
                    <span className="text-sm font-medium">
                      {convertUTCDateToLocalDate(raidCycle.next_reset_at)}
                    </span>
                  </Tooltip>
                )}
              </Skeleton>
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-end">
          <Skeleton isLoaded={!!raidData} className="rounded-md">
            <span className="text-right text-sm font-light italic">
              All times are local
            </span>
          </Skeleton>
        </div>
      </CardBody>
    </Card>
  );
}
