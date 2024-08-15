import MirrorForceCardLogo from '@/assets/cards/MirrorForce.webp';
import TeamTacticsCardLogo from '@/assets/cards/TeamTactics.webp';
import AverageDamageCardLogo from '@/assets/Decks.webp';
import { AttacksCard, useFetchedAttacks } from '@/features/attacks';
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

export function Dashboard() {
    const { setTitans, currentTitan, setCurrentTitan, titans } = useBoundStore();

    const { data: raidCycles } = useRaidCycles();

    const { data: raidTitansData } = useRaidTitans();
    const { data: raidListData } = useRaidList();

    // const raidAttacks = useLatestAttacks(raidListData?.raids[0].raid_id);
    const raidAttacks = useFetchedAttacks();

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

                <div className="row-start-5 md:col-span-2 md:col-start-1 md:row-span-1 md:row-start-4 lg:col-span-3 lg:col-start-1 lg:row-span-1 lg:row-start-3 lg:min-h-36">
                    <RaidDamageInfo title="Damage stats" imageUrl={AverageDamageCardLogo} data={mapDamageStatsData} />
                </div>

                <div className="row-start-4 md:col-start-2 md:row-span-1 md:row-start-3 lg:col-start-1 lg:row-span-1 lg:row-start-2 lg:min-h-36">
                    <CardBonusData data={getBonuses} />
                </div>

                <div className="row-start-3 md:col-start-2 md:row-span-2 md:row-start-1 lg:col-span-1 lg:col-start-3 lg:row-span-2">
                    <TitansSequence />
                </div>
            </div>

            <AttacksCard {...raidAttacks} />
        </>
    );
}

// const mockRaidAttackResponse =
//     '{"raid_id": "c441cf35-3e1c-4c65-8519-67597a58ddef", "count": 439, "attack_logs": [{"player_name": "TTU Kiazius", "titan_attack_id": "b4808544-a284-4d1e-927a-9c6d11aef221", "remaining_attacks": 3, "occurred_at": "2023-09-30T19:35:28", "damage": 34151934, "sources": ["SuperheatMetal", "WhipOfLightning", "RuinousRust", "TapDamage"], "parts": [{"name": "ArmorHandLeft", "value": 500865}, {"name": "ArmorHandRight", "value": 7474519}, {"name": "ArmorChestUpper", "value": 1300254}, {"name": "ArmorArmUpperRight", "value": 11408185}, {"name": "ArmorArmUpperLeft", "value": 12155438}, {"name": "ArmorHead", "value": 1312673}]}, {"player_name": "TTU Kiazius", "titan_attack_id": "f68e5d37-954a-495c-aa8d-28297c1bb5ea", "remaining_attacks": 4, "occurred_at": "2023-09-30T19:33:01", "damage": 41398487, "sources": ["PlagueAttack", "Disease", "TapDamage", "MentalFocus"], "parts": [{"name": "ArmorHandLeft", "value": 4996512}, {"name": "ArmorHandRight", "value": 3976856}, {"name": "ArmorChestUpper", "value": 6824750}, {"name": "ArmorArmUpperRight", "value": 5879323}, {"name": "ArmorArmUpperLeft", "value": 7967111}, {"name": "ArmorHead", "value": 11753935}]}, {"player_name": "Blacklily", "titan_attack_id": "b2ff85c3-4fc2-4ccf-b01b-496dc3feb9f8", "remaining_attacks": 9, "occurred_at": "2023-09-30T19:32:28", "damage": 29454210, "sources": ["TapDamage", "DecayingAttack", "LimbSupport", "SpinalTap"], "parts": [{"name": "ArmorHandLeft", "value": 68747}, {"name": "ArmorArmUpperLeft", "value": 29258392}, {"name": "ArmorHead", "value": 127071}]}, {"player_name": "Blacklily", "titan_attack_id": "45215a4d-df7f-41a5-b2d7-db3689e9206c", "remaining_attacks": 10, "occurred_at": "2023-09-30T19:30:23", "damage": 21592394, "sources": ["BurstBoost", "TapDamage", "Haymaker", "BurstCount"], "parts": [{"name": "ArmorArmUpperLeft", "value": 21592394}]}, {"player_name": "[TTU] Nikochi", "titan_attack_id": "3ba170b1-7a2b-4fe5-a855-b2b13c50a604", "remaining_attacks": 0, "occurred_at": "2023-09-30T19:07:14", "damage": 24132033, "sources": ["TapDamage", "InnerTruth", "RuinousRust", "TeamTactics"], "parts": [{"name": "ArmorChestUpper", "value": 12619009}, {"name": "ArmorHead", "value": 11513024}]}, {"player_name": "TTU MadJynx", "titan_attack_id": "f9fe32cf-0f01-49f7-8952-a913baed16ca", "remaining_attacks": 5, "occurred_at": "2023-09-30T19:06:53", "damage": 50497129, "sources": ["PlagueAttack", "Disease", "TapDamage", "MentalFocus"], "parts": [{"name": "ArmorHandLeft", "value": 8567068}, {"name": "ArmorHandRight", "value": 6400610}, {"name": "ArmorChestUpper", "value": 8665842}, {"name": "ArmorArmUpperRight", "value": 9144995}, {"name": "ArmorArmUpperLeft", "value": 7833983}, {"name": "ArmorHead", "value": 9884631}]}, {"player_name": "[TTU] Silical", "titan_attack_id": "4e7b2a0b-6c89-456f-9462-980f28da4762", "remaining_attacks": 0, "occurred_at": "2023-09-30T19:06:07", "damage": 18285663, "sources": ["RuneAttack", "TapDamage", "PowerBubble", "TeamTactics"], "parts": [{"name": "ArmorHandLeft", "value": 4670857}, {"name": "ArmorLegUpperLeft", "value": 4193}, {"name": "ArmorChestUpper", "value": 4216679}, {"name": "ArmorArmUpperLeft", "value": 2849140}, {"name": "ArmorHead", "value": 6544794}]}, {"player_name": "[TTU] Silical", "titan_attack_id": "065184e4-cd4a-436b-8ad2-48ec889c450d", "remaining_attacks": 1, "occurred_at": "2023-09-30T19:03:01", "damage": 25207244, "sources": ["TapDamage", "Disease", "PlagueAttack", "SuperheatMetal"], "parts": [{"name": "ArmorHandLeft", "value": 5637592}, {"name": "ArmorHandRight", "value": 4977740}, {"name": "ArmorChestUpper", "value": 4150721}, {"name": "ArmorArmUpperRight", "value": 2426906}, {"name": "ArmorArmUpperLeft", "value": 3485582}, {"name": "ArmorHead", "value": 4528703}]}, {"player_name": "Darth Vader", "titan_attack_id": "0e74ff02-4092-4fe6-97b9-89a01f4c2309", "remaining_attacks": 1, "occurred_at": "2023-09-30T18:51:43", "damage": 40957276, "sources": ["TapDamage", "BurningAttack", "Fuse", "SuperheatMetal"], "parts": [{"name": "ArmorHandLeft", "value": 6781270}, {"name": "ArmorHandRight", "value": 7318852}, {"name": "ArmorChestUpper", "value": 7715128}, {"name": "ArmorArmUpperRight", "value": 5927507}, {"name": "ArmorArmUpperLeft", "value": 5788261}, {"name": "ArmorHead", "value": 7426258}]}, {"player_name": "Blacklily", "titan_attack_id": "801c275e-8df0-47f2-b273-a7082176a82c", "remaining_attacks": 11, "occurred_at": "2023-09-30T18:48:21", "damage": 41020777, "sources": ["RuinousRust", "SuperheatMetal", "TapDamage", "TeamTactics"], "parts": [{"name": "ArmorArmUpperLeft", "value": 41020777}]}, {"player_name": "Dcuajunco", "titan_attack_id": "ede79e6e-0c21-4bdb-b3ad-1637fd301b83", "remaining_attacks": 0, "occurred_at": "2023-09-30T18:46:47", "damage": 35113923, "sources": ["InnerTruth", "SuperheatMetal", "TapDamage", "PowerBubble"], "parts": [{"name": "ArmorHead", "value": 35113923}]}, {"player_name": "/TTU/June\u2122", "titan_attack_id": "597526df-1c89-4e5f-bcd7-49e37aa186ec", "remaining_attacks": 5, "occurred_at": "2023-09-30T18:46:24", "damage": 37112269, "sources": ["Swarm", "TapDamage", "PlagueAttack", "MentalFocus"], "parts": [{"name": "ArmorLegUpperRight", "value": 1466202}, {"name": "ArmorHandLeft", "value": 12572924}, {"name": "ArmorHandRight", "value": 1549860}, {"name": "ArmorLegUpperLeft", "value": 2298371}, {"name": "ArmorChestUpper", "value": 1994563}, {"name": "ArmorArmUpperRight", "value": 1827249}, {"name": "ArmorArmUpperLeft", "value": 13311670}, {"name": "ArmorHead", "value": 2091430}]}, {"player_name": "/TTU/June\u2122", "titan_attack_id": "7d0911da-4fe9-4801-b145-615d4f7a78c0", "remaining_attacks": 6, "occurred_at": "2023-09-30T18:42:44", "damage": 24141039, "sources": ["InnerTruth", "Fragmentize", "TapDamage", "MoonBeam"], "parts": [{"name": "ArmorChestUpper", "value": 24141039}]}, {"player_name": "norson", "titan_attack_id": "750a7c73-6d0d-47dd-a25b-14a45adc6c43", "remaining_attacks": 0, "occurred_at": "2023-09-30T18:41:54", "damage": 24919237, "sources": ["AstralEcho", "TapDamage", "Haymaker", "SpinalTap"], "parts": [{"name": "ArmorArmUpperLeft", "value": 20453666}, {"name": "ArmorHead", "value": 4465571}]}, {"player_name": "/TTU/June\u2122", "titan_attack_id": "0726797b-92e7-4d8a-b948-79de735dbd5d", "remaining_attacks": 7, "occurred_at": "2023-09-30T18:41:45", "damage": 27374851, "sources": ["SuperheatMetal", "LimbSupport", "TapDamage", "LimbBurst"], "parts": [{"name": "ArmorArmUpperLeft", "value": 27374851}]}, {"player_name": "fuzz", "titan_attack_id": "42b64a04-38bd-4f10-ab72-caa6a7681386", "remaining_attacks": 0, "occurred_at": "2023-09-30T18:40:46", "damage": 54954329, "sources": ["TapDamage", "PlagueAttack", "MentalFocus", "RuneAttack"], "parts": [{"name": "ArmorHandLeft", "value": 8031747}, {"name": "ArmorHandRight", "value": 8199207}, {"name": "ArmorChestUpper", "value": 8681035}, {"name": "ArmorArmUpperRight", "value": 9329328}, {"name": "ArmorArmUpperLeft", "value": 7819660}, {"name": "ArmorHead", "value": 12893352}]}, {"player_name": "fuzz", "titan_attack_id": "48ae85c7-2a13-4a84-8c08-44c5f926692a", "remaining_attacks": 1, "occurred_at": "2023-09-30T18:39:37", "damage": 8030285, "sources": ["PoisonAttack", "Purify", "TapDamage", "FinisherAttack"], "parts": [{"name": "ArmorHead", "value": 8030285}]}, {"player_name": "fuzz", "titan_attack_id": "46bc7eb4-4a5d-47f4-8643-f97ebbb324c4", "remaining_attacks": 1, "occurred_at": "2023-09-30T18:39:37", "damage": 62875689, "sources": ["Purify", "TapDamage", "PoisonAttack", "FinisherAttack"], "parts": [{"name": "BodyHead", "value": 62875689}]}, {"player_name": "/TTU/June\u2122", "titan_attack_id": "dccf6e89-905d-4df2-90ff-061ad3f89eef", "remaining_attacks": 8, "occurred_at": "2023-09-30T18:38:53", "damage": 21304555, "sources": ["RuneAttack", "CrushingVoid", "RazorWind", "TapDamage"], "parts": [{"name": "BodyHead", "value": 21304555}]}, {"player_name": "/TTU/June\u2122", "titan_attack_id": "88837571-dc3d-4330-b19f-9349fa4e8720", "remaining_attacks": 9, "occurred_at": "2023-09-30T18:37:52", "damage": 35261160, "sources": ["BurstBoost", "BurstCount", "TapDamage", "FlakShot"], "parts": [{"name": "BodyHead", "value": 35261160}]}, {"player_name": "/TTU/June\u2122", "titan_attack_id": "c83ddc9d-3e1e-4cd7-bad4-3aeabf8a4a11", "remaining_attacks": 10, "occurred_at": "2023-09-30T18:37:00", "damage": 69051527, "sources": ["TapDamage", "PoisonAttack", "Purify", "TotemFairySkill"], "parts": [{"name": "BodyHead", "value": 69051527}]}, {"player_name": "/TTU/June\u2122", "titan_attack_id": "9309a3aa-dfbe-47c9-bba6-41ed35793c9e", "remaining_attacks": 11, "occurred_at": "2023-09-30T18:36:09", "damage": 41137680, "sources": ["TapDamage", "Haymaker", "SkullBash", "FinisherAttack"], "parts": [{"name": "BodyHead", "value": 41137680}]}, {"player_name": "Darth Vader", "titan_attack_id": "8000367e-2484-4255-9bae-aee7d6cc5402", "remaining_attacks": 2, "occurred_at": "2023-09-30T18:34:30", "damage": 44063645, "sources": ["FinisherAttack", "RazorWind", "SkullBash", "TapDamage"], "parts": [{"name": "BodyHead", "value": 44063645}]}, {"player_name": "TTU Kiazius", "titan_attack_id": "7ceeebf3-1f40-4bfa-853e-2af824610c2b", "remaining_attacks": 5, "occurred_at": "2023-09-30T18:25:51", "damage": 41774778, "sources": ["TapDamage", "FinisherAttack", "ExecutionersAxe", "MirrorForce"], "parts": [{"name": "BodyHead", "value": 41774778}]}, {"player_name": "joeyboi", "titan_attack_id": "b35ae875-141f-45d4-846a-30c2094be8f1", "remaining_attacks": 0, "occurred_at": "2023-09-30T18:22:07", "damage": 52093529, "sources": ["BurstCount", "BurstBoost", "TapDamage", "MirrorForce"], "parts": [{"name": "BodyHandLeft", "value": 1728167}, {"name": "BodyHead", "value": 50351736}]}]}';
// const mockAttackOccurrenceMetrics = `{"labels": ["2023-09-30T00:17:29", "2023-09-30T00:32:29", "2023-09-30T00:47:29", "2023-09-30T01:02:29", "2023-09-30T01:17:29", "2023-09-30T01:32:29", "2023-09-30T01:47:29", "2023-09-30T02:02:29", "2023-09-30T02:17:29", "2023-09-30T02:32:29", "2023-09-30T02:47:29", "2023-09-30T03:02:29", "2023-09-30T03:17:29", "2023-09-30T03:32:29", "2023-09-30T03:47:29", "2023-09-30T04:02:29", "2023-09-30T04:17:29", "2023-09-30T04:32:29", "2023-09-30T04:47:29", "2023-09-30T05:02:29", "2023-09-30T05:17:29", "2023-09-30T05:32:29", "2023-09-30T05:47:29", "2023-09-30T06:02:29", "2023-09-30T06:17:29", "2023-09-30T06:32:29", "2023-09-30T06:47:29", "2023-09-30T07:02:29", "2023-09-30T07:17:29", "2023-09-30T07:32:29", "2023-09-30T07:47:29", "2023-09-30T08:02:29", "2023-09-30T08:17:29", "2023-09-30T08:32:29", "2023-09-30T08:47:29", "2023-09-30T09:02:29", "2023-09-30T09:17:29", "2023-09-30T09:32:29", "2023-09-30T09:47:29", "2023-09-30T10:02:29", "2023-09-30T10:17:29", "2023-09-30T10:32:29", "2023-09-30T10:47:29", "2023-09-30T11:02:29", "2023-09-30T11:17:29", "2023-09-30T11:32:29", "2023-09-30T11:47:29", "2023-09-30T12:02:29", "2023-09-30T12:17:29", "2023-09-30T12:32:29", "2023-09-30T12:47:29", "2023-09-30T13:02:29", "2023-09-30T13:17:29", "2023-09-30T13:32:29", "2023-09-30T13:47:29", "2023-09-30T14:02:29", "2023-09-30T14:17:29", "2023-09-30T14:32:29", "2023-09-30T14:47:29", "2023-09-30T15:02:29", "2023-09-30T15:17:29", "2023-09-30T15:32:29", "2023-09-30T15:47:29", "2023-09-30T16:02:29", "2023-09-30T16:17:29", "2023-09-30T16:32:29", "2023-09-30T16:47:29", "2023-09-30T17:02:29", "2023-09-30T17:17:29", "2023-09-30T17:32:29", "2023-09-30T17:47:29", "2023-09-30T18:02:29", "2023-09-30T18:17:29", "2023-09-30T18:32:29", "2023-09-30T18:47:29", "2023-09-30T19:02:29", "2023-09-30T19:17:29", "2023-09-30T19:32:29", "2023-09-30T19:47:29", "2023-09-30T20:02:29", "2023-09-30T20:17:29", "2023-09-30T20:32:29", "2023-09-30T20:47:29", "2023-09-30T21:02:29", "2023-09-30T21:17:29", "2023-09-30T21:32:29", "2023-09-30T21:47:29", "2023-09-30T22:02:29", "2023-09-30T22:17:29", "2023-09-30T22:32:29", "2023-09-30T22:47:29", "2023-09-30T23:02:29", "2023-09-30T23:17:29", "2023-09-30T23:32:29", "2023-09-30T23:47:29", "2023-10-01T00:02:29", "2023-10-01T00:17:29", "2023-10-01T00:32:29", "2023-10-01T00:47:29", "2023-10-01T01:02:29", "2023-10-01T01:17:29", "2023-10-01T01:32:29", "2023-10-01T01:47:29", "2023-10-01T02:02:29", "2023-10-01T02:17:29", "2023-10-01T02:32:29", "2023-10-01T02:47:29", "2023-10-01T03:02:29", "2023-10-01T03:17:29", "2023-10-01T03:32:29", "2023-10-01T03:47:29", "2023-10-01T04:02:29", "2023-10-01T04:17:29", "2023-10-01T04:32:29", "2023-10-01T04:47:29", "2023-10-01T05:02:29", "2023-10-01T05:17:29", "2023-10-01T05:32:29", "2023-10-01T05:47:29", "2023-10-01T06:02:29", "2023-10-01T06:17:29", "2023-10-01T06:32:29", "2023-10-01T06:47:29", "2023-10-01T07:02:29", "2023-10-01T07:17:29", "2023-10-01T07:32:29", "2023-10-01T07:47:29", "2023-10-01T08:02:29", "2023-10-01T08:17:29", "2023-10-01T08:32:29", "2023-10-01T08:47:29", "2023-10-01T09:02:29", "2023-10-01T09:17:29", "2023-10-01T09:32:29", "2023-10-01T09:47:29", "2023-10-01T10:02:29", "2023-10-01T10:17:29", "2023-10-01T10:32:29", "2023-10-01T10:47:29", "2023-10-01T11:02:29", "2023-10-01T11:17:29", "2023-10-01T11:32:29", "2023-10-01T11:47:29", "2023-10-01T12:02:29", "2023-10-01T12:17:29", "2023-10-01T12:32:29", "2023-10-01T12:47:29", "2023-10-01T13:02:29", "2023-10-01T13:17:29", "2023-10-01T13:32:29", "2023-10-01T13:47:29", "2023-10-01T14:02:29", "2023-10-01T14:17:29", "2023-10-01T14:32:29", "2023-10-01T14:47:29", "2023-10-01T15:02:29", "2023-10-01T15:17:29", "2023-10-01T15:32:29", "2023-10-01T15:47:29", "2023-10-01T16:02:29", "2023-10-01T16:17:29", "2023-10-01T16:32:29", "2023-10-01T16:47:29", "2023-10-01T17:02:29", "2023-10-01T17:17:29", "2023-10-01T17:32:29", "2023-10-01T17:47:29", "2023-10-01T18:02:29", "2023-10-01T18:17:29", "2023-10-01T18:32:29", "2023-10-01T18:47:29", "2023-10-01T19:02:29", "2023-10-01T19:17:29", "2023-10-01T19:32:29", "2023-10-01T19:47:29", "2023-10-01T20:02:29", "2023-10-01T20:17:29", "2023-10-01T20:32:29", "2023-10-01T20:47:29", "2023-10-01T21:02:29", "2023-10-01T21:17:29", "2023-10-01T21:32:29", "2023-10-01T21:47:29", "2023-10-01T22:02:29", "2023-10-01T22:17:29", "2023-10-01T22:32:29", "2023-10-01T22:47:29", "2023-10-01T23:02:29", "2023-10-01T23:17:29", "2023-10-01T23:32:29", "2023-10-01T23:47:29", "2023-10-02T00:02:29", "2023-10-02T00:17:29", "2023-10-02T00:32:29", "2023-10-02T00:47:29", "2023-10-02T01:02:29", "2023-10-02T01:17:29", "2023-10-02T01:32:29", "2023-10-02T01:47:29", "2023-10-02T02:02:29", "2023-10-02T02:17:29", "2023-10-02T02:32:29", "2023-10-02T02:47:29", "2023-10-02T03:02:29", "2023-10-02T03:17:29", "2023-10-02T03:32:29", "2023-10-02T03:47:29", "2023-10-02T04:02:29", "2023-10-02T04:17:29", "2023-10-02T04:32:29", "2023-10-02T04:47:29", "2023-10-02T05:02:29", "2023-10-02T05:17:29", "2023-10-02T05:32:29", "2023-10-02T05:47:29", "2023-10-02T06:02:29", "2023-10-02T06:17:29", "2023-10-02T06:32:29", "2023-10-02T06:47:29", "2023-10-02T07:02:29", "2023-10-02T07:17:29", "2023-10-02T07:32:29", "2023-10-02T07:47:29", "2023-10-02T08:02:29", "2023-10-02T08:17:29", "2023-10-02T08:32:29", "2023-10-02T08:47:29", "2023-10-02T09:02:29", "2023-10-02T09:17:29", "2023-10-02T09:32:29", "2023-10-02T09:47:29", "2023-10-02T10:02:29", "2023-10-02T10:17:29", "2023-10-02T10:32:29", "2023-10-02T10:47:29", "2023-10-02T11:02:29", "2023-10-02T11:17:29", "2023-10-02T11:32:29", "2023-10-02T11:47:29", "2023-10-02T12:02:29", "2023-10-02T12:17:29", "2023-10-02T12:32:29", "2023-10-02T12:47:29", "2023-10-02T13:02:29"], "data": [2, 1, 1, 1, 1, 1, 6, 5, 5, 1, 3, 6, 12, 1, 1, 2, 8, 1, 2, 3, 5, 1, 11, 11, 10, 7, 1, 17, 22, 1, 1, 1, 5, 1, 3, 4, 2, 8, 9, 1, 1, 1, 14, 6, 6, 9, 1, 1, 19, 8, 16, 4, 18, 15, 17, 21, 9, 3, 9, 10, 6, 4, 1, 6, 1, 1, 1, 1, 3, 4, 1, 4, 6, 12, 2, 4, 2, 2, 1, 1, 3, 3, 1, 2, 1, 2, 4, 1, 3, 11, 13, 10, 1, 14, 2, 2, 5, 13, 12, 21, 12, 2, 2, 4, 1, 2, 13, 3, 4, 7, 1, 2, 2, 1, 4, 6, 1, 1, 12, 4, 17, 3, 6, 8, 9, 8, 11, 4, 12, 11, 10, 3, 1, 2, 7, 1, 1, 1, 9, 1, 8, 20, 8, 4, 10, 7, 1, 1, 1, 4, 10, 3, 17, 4, 9, 24, 6, 16, 3, 14, 14, 21, 8, 10, 2, 2, 14, 6, 6, 1, 1, 1, 1, 1, 1, 1, 3, 1, 7, 1, 2, 1, 1, 10, 4, 6, 11, 11, 3, 1, 7, 4, 21, 15, 2, 2, 6, 1, 1, 1, 4, 1, 11, 3, 1, 1, 5, 1, 1, 2, 6, 2, 5, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 18, 10, 2, 1, 1, 6, 12, 13, 2, 11, 2, 8, 9, 7, 6, 23, 31, 16, 11, 6, 0]}`;

// const remapChartData = () => {
//     const { data, labels } = JSON.parse(mockAttackOccurrenceMetrics);

//     // console.log(data);
//     // console.log(labels);
//     const mapChartData = (arr1) => (arr2) => arr1.map((label, index) => ({ labels: label, attacks: arr2[index] }));

//     // console.log('mapChartData', mapChartData(labels)(data));
//     return mapChartData(labels)(data);
// };
