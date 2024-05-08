import { RaidTable } from './raid-table.component';
import { RaidOverviewInfo } from './raid-overview-info.component';
import { useRaidList } from '@/features/raid-info';
import { useOverviewPlayers } from '../api/get-overview-players';
import { useCallback, useEffect, useState } from 'react';

export function Overview() {
    const { data: raidList } = useRaidList();

    const raidId = raidList?.raids[0].raid_id;

    const [value, setValue] = useState<string | undefined>(raidId);

    const { data: overviewPlayers } = useOverviewPlayers(value);

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

    const findRaid = () => raidList?.raids?.find((r) => r.raid_id === value);

    return (
        <div className="flex flex-col gap-4">
            {raidList && value && (
                <RaidOverviewInfo
                    raidId={value}
                    raid={findRaid()!}
                    raidList={raidList}
                    // refetchData={refetchData}
                    overviewPlayers={overviewPlayers}
                    handleSelectionChange={handleSelectionChange}
                />
            )}
            {value && <RaidTable raidId={value} raid={findRaid()!} />}
        </div>
    );
}
