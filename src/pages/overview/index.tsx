import { CustomSelect } from '@/components';
import { RaidBuffMapping } from '@/constants/buffs';
import {
  RaidOverviewInfo,
  RaidPlayerDamageOverview,
  RaidTable,
  useOverviewPlayers,
} from '@/features/overview';
import {
  RaidBuffMappingType,
  RaidCycle,
  useRaidCycles,
  useRaidList,
} from '@/features/raid-info';
import { useSelectStore } from '@/stores/useSelectStore';
import { convertUTCDateToLocalDate, getRaidLabel } from '@/utils';
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Spinner,
  Tooltip,
} from '@heroui/react';
import { useMemo } from 'react';

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

  const nextReset = cycles.sort((a, b) => (a.cycle > b.cycle ? 1 : -1))[
    cycles.length - 1
  ].next_reset_at;

  return (
    <div className="flex justify-between text-sm font-medium">
      <span>Next Cycle</span>
      <Tooltip showArrow={true} content={new Date(nextReset).toUTCString()}>
        <span className="text-sm font-medium">
          {convertUTCDateToLocalDate(nextReset)}
        </span>
      </Tooltip>
    </div>
  );
};

export default function Overview() {
  const { data: raidList } = useRaidList();
  const { selectedValues: selectedRaidId } = useSelectStore();
  const selectedRaidOverviewId = selectedRaidId['raid-overview-selector'];

  const { data: overviewPlayers, isLoading: isLoadingOverviewPlayers } =
    useOverviewPlayers(selectedRaidOverviewId);

  const findRaid = useMemo(
    () => raidList?.raids?.find((r) => r.raid_id === selectedRaidOverviewId),
    [raidList?.raids, selectedRaidOverviewId]
  );

  const { data: raidCycles } = useRaidCycles(selectedRaidOverviewId);

  return (
    <div className="flex flex-col gap-4">
      <div className="text-left">
        <h1 className="text-2xl font-bold">Raid overview</h1>
        <p>
          Select a raid below to view some statistics, such as raid information,
          attacks done, total damage, etc.
        </p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
        {raidList && (
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-col">
            <CustomSelect
              selectKey="raid-overview-selector"
              label="Select a raid"
              labelTextSize="text-xs"
              options={raidList.raids.map((raid) => ({
                value: raid.raid_id,
                label: `${getRaidLabel({ tierLabel: raid.tierLabel, level: raid.level })} | Season ${raid.raid_season_sequence}`,
              }))}
            />
            {findRaid && (
              <Card className="w-full sm:max-w-sm">
                <CardHeader className="text-lg font-medium">
                  Raid Info
                </CardHeader>
                <CardBody className="gap-4">
                  <Divider />
                  <div className="gap-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Bonus</span>
                      {findRaid?.buff_type ? (
                        <span>
                          {
                            RaidBuffMapping[
                              findRaid?.buff_type as RaidBuffMappingType
                            ]
                          }{' '}
                        </span>
                      ) : (
                        <span>None</span>
                      )}
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span>Start</span>
                      <Tooltip
                        showArrow={true}
                        content={new Date(findRaid.started_at).toUTCString()}
                      >
                        <span className="text-sm font-medium">
                          {convertUTCDateToLocalDate(findRaid.started_at)}
                        </span>
                      </Tooltip>
                    </div>

                    {findRaid?.ended_at != null ? (
                      <div className="flex justify-between text-sm font-medium">
                        <span>End</span>
                        <Tooltip
                          showArrow={true}
                          content={new Date(findRaid.ended_at).toUTCString()}
                        >
                          <span className="text-sm font-medium">
                            {convertUTCDateToLocalDate(findRaid.ended_at)}
                          </span>
                        </Tooltip>
                      </div>
                    ) : (
                      <RaidNextCycleText cycles={raidCycles?.cycles || []} />
                    )}

                    {findRaid?.ended_at != null ? (
                      <div className="flex justify-between space-x-4 text-sm font-medium">
                        <span>Rounds</span>
                        {raidCycles && (
                          <span>
                            {calculateRounds(
                              new Date(findRaid.started_at),
                              new Date(findRaid.ended_at)
                            )}
                          </span>
                        )}
                      </div>
                    ) : null}
                  </div>
                </CardBody>
              </Card>
            )}
          </div>
        )}

        {isLoadingOverviewPlayers ? (
          <>
            <Card
              className="flex w-full flex-row items-center justify-center gap-5 p-4 sm:max-w-md"
              radius="lg"
            >
              <Spinner />
            </Card>
            <Card
              className="flex w-full flex-row items-center justify-center gap-5 p-4 sm:max-w-md"
              radius="lg"
            >
              <Spinner />
            </Card>
          </>
        ) : (
          selectedRaidId['raid-overview-selector'] &&
          overviewPlayers?.players_data &&
          overviewPlayers?.players_data?.length > 0 &&
          findRaid && (
            <RaidOverviewInfo
              raidId={selectedRaidId['raid-overview-selector']}
              raid={findRaid}
              overviewPlayers={overviewPlayers}
            />
          )
        )}
      </div>
      {isLoadingOverviewPlayers ? (
        <Card
          className="flex w-full flex-row items-center justify-center gap-5 p-4 sm:max-w-md"
          radius="lg"
        >
          <Spinner />
        </Card>
      ) : (
        selectedRaidId['raid-overview-selector'] &&
        overviewPlayers?.players_data &&
        overviewPlayers?.players_data?.length > 0 &&
        findRaid && (
          <RaidPlayerDamageOverview
            playersData={overviewPlayers?.players_data}
          />
        )
      )}

      {selectedRaidId['raid-overview-selector'] && findRaid && (
        <RaidTable
          raidId={selectedRaidId['raid-overview-selector']}
          raid={findRaid}
        />
      )}
    </div>
  );
}
