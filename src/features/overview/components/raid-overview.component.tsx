import { RaidTable } from './raid-table.component';
import { RaidOverviewInfo } from './raid-overview-info.component';

export function Overview() {
    return (
        <div className="flex flex-col gap-4">
            <RaidOverviewInfo />
            <RaidTable />
        </div>
    );
}
