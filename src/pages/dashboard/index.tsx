import MirrorForceCardLogo from '@/assets/cards/MirrorForce.webp';
import TeamTacticsCardLogo from '@/assets/cards/TeamTactics.webp';
import { AttacksCard, useFetchedAttacks } from '@/features/attacks';
import {
  CardBonusData,
  PercentageCardsType,
  RaidCycle,
  RaidDamageInfo,
  RaidInfo,
  useRaidCycles,
  useRaidList,
} from '@/features/raid-info';
import { TimelineChart } from '@/features/timeline/components/timeline-chart';
import {
  CurrentTitanStatus,
  TitanSequence,
  TitansSequence,
  useRaidTitans,
} from '@/features/titans';
import { useBoundStore } from '@/stores/bound.store';
import { useEffect, useMemo } from 'react';

export default function Dashboard() {
  const { setTitans, currentTitan, setCurrentTitan, titans } = useBoundStore();
  const { data: raidCycles } = useRaidCycles();

  const { data: raidTitansData } = useRaidTitans();
  const { data: raidListData } = useRaidList();
  const raidAttacks = useFetchedAttacks();

  const startedAt = raidListData?.raids[0]?.started_at;

  const isRaidStarted = useMemo(() => {
    if (!startedAt) return false;

    const startTime = new Date(startedAt);
    if (!isFinite(+startTime)) return false;

    const nowUTC =
      new Date().getTime() - new Date().getTimezoneOffset() * 60000;

    return nowUTC > startTime.getTime();
  }, [startedAt]);

  useEffect(() => {
    if (raidTitansData?.titans) {
      setTitans(raidTitansData.titans);
    }
  }, [raidTitansData?.titans, setTitans]);

  // useEffect(() => {
  //     if (!titans) return;
  //     if (!raidAttacks?.data?.pages || !raidAttacks?.data?.pages?.length) return;

  //     let foundLatestTitan: TitanSequence | undefined = undefined;

  //     // raid has yet to start
  //     if (!raidAttacks?.data?.pages[0]?.attack_logs[0]) {
  //         foundLatestTitan = titans[0];
  //     }

  //     if (!foundLatestTitan) {
  //         foundLatestTitan = titans[0];
  //     }

  //     if (foundLatestTitan) {
  //         setCurrentTitan(foundLatestTitan);
  //     }

  //     const latestTitanId = raidAttacks?.data?.pages[0]?.attack_logs[0]?.raid_titan_id;
  //     if (!latestTitanId) return;

  //     foundLatestTitan = titans.find((titan) => titan.id === latestTitanId);

  //     if (foundLatestTitan) {
  //         setCurrentTitan(foundLatestTitan);
  //     }
  // }, [raidAttacks?.data?.pages, titans]);

  // const getBonuses = useMemo(() => {
  //     const data: PercentageCardsType[] = [];

  //     const moraleData: PercentageCardsType = {
  //         bonus: [],
  //         imageUrl: TeamTacticsCardLogo,
  //         title: 'Morale',
  //     };

  //     const mirrorForceData: PercentageCardsType = {
  //         bonus: [],
  //         imageUrl: MirrorForceCardLogo,
  //         title: 'Mirror Force',
  //     };

  //     data.push(moraleData);
  //     data.push(mirrorForceData);

  //     if (!raidCycles || raidCycles.cycles.length === 0) return data;

  //     const cycles = raidCycles.cycles;

  //     const moraleBonuses = (raidCycles: RaidCycle[]) =>
  //         raidCycles.map(({ morale, team_tactics }: RaidCycle) => {
  //             return ((morale + team_tactics) * 100).toFixed(2);
  //         });

  //     const mirrorForceBonuses = (raidCycles: RaidCycle[]) =>
  //         raidCycles.map(({ mirror_force }: RaidCycle) => {
  //             return (mirror_force * 100).toFixed(0);
  //         });

  //     data[0].bonus = moraleBonuses(cycles);
  //     data[1].bonus = mirrorForceBonuses(cycles);

  //     return data;
  // }, [raidCycles?.cycles.length]);

  useEffect(() => {
    if (!titans) return;
    if (!raidAttacks?.data?.pages || !raidAttacks?.data?.pages?.length) return;

    let foundLatestTitan: TitanSequence | undefined = undefined;

    if (!raidAttacks?.data?.pages[0]?.attack_logs[0]) {
      foundLatestTitan = titans[0];
    }

    if (!foundLatestTitan) {
      foundLatestTitan = titans[0];
    }

    if (foundLatestTitan) {
      setCurrentTitan(foundLatestTitan);
    }

    const latestTitanId =
      raidAttacks?.data?.pages[0]?.attack_logs[0]?.raid_titan_id;
    if (!latestTitanId) return;

    foundLatestTitan = titans.find((titan) => titan.id === latestTitanId);

    if (foundLatestTitan) {
      setCurrentTitan(foundLatestTitan);
    }
  }, [raidAttacks?.data?.pages, titans, setCurrentTitan]);

  const calculateMoraleBonuses = (raidCycles: RaidCycle[]) =>
    raidCycles.map(({ morale, team_tactics }) =>
      ((morale + team_tactics) * 100).toFixed(2)
    );

  const calculateMirrorForceBonuses = (raidCycles: RaidCycle[]) =>
    raidCycles.map(({ mirror_force }) => (mirror_force * 100).toFixed(0));

  const getBonuses = useMemo((): PercentageCardsType[] => {
    if (!raidCycles?.cycles?.length) {
      return [
        { bonus: [], imageUrl: TeamTacticsCardLogo, title: 'Morale' },
        { bonus: [], imageUrl: MirrorForceCardLogo, title: 'Mirror Force' },
      ];
    }

    return [
      {
        bonus: calculateMoraleBonuses(raidCycles.cycles),
        imageUrl: TeamTacticsCardLogo,
        title: 'Morale',
      },
      {
        bonus: calculateMirrorForceBonuses(raidCycles.cycles),
        imageUrl: MirrorForceCardLogo,
        title: 'Mirror Force',
      },
    ];
  }, [raidCycles?.cycles]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 px-0 pb-4 md:grid-cols-2 md:grid-rows-4 lg:grid-cols-3 lg:grid-rows-3">
        <div className="row-start-1 md:col-start-1 md:row-span-1 md:row-start-1 lg:row-span-1">
          <RaidInfo
            raidData={
              raidListData?.raids && raidListData?.raids?.length > 0
                ? raidListData?.raids[0]
                : undefined
            }
            raidCycle={raidCycles?.cycles[raidCycles?.cycles.length - 1]}
          />
        </div>

        <div className="row-start-2 md:col-start-1 md:row-span-2 md:row-start-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <CurrentTitanStatus titan={currentTitan} />
        </div>

        {isRaidStarted && (
          <div className="row-start-5 md:col-span-2 md:col-start-1 md:row-span-1 md:row-start-4 lg:col-span-3 lg:col-start-1 lg:row-span-1 lg:row-start-3 lg:min-h-36">
            <div className="flex flex-col gap-4 sm:flex-row">
              <RaidDamageInfo />
              <TimelineChart />
            </div>
          </div>
        )}
        <div className="row-start-4 md:col-start-2 md:row-span-1 md:row-start-3 lg:col-start-1 lg:row-span-1 lg:row-start-2 lg:min-h-36">
          <CardBonusData data={getBonuses} />
        </div>

        <div className="row-start-3 md:col-start-2 md:row-span-2 md:row-start-1 lg:col-span-1 lg:col-start-3 lg:row-span-2">
          <TitansSequence />
        </div>
      </div>

      {isRaidStarted && <AttacksCard {...raidAttacks} />}
    </>
  );
}
