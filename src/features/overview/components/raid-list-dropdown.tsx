import { RaidData, RaidList } from '@/features/raid-info';
import { Select, SelectItem, SelectedItems } from '@nextui-org/react';

type RaidListDropdownProps = {
    selectedItem: string;
    raidList: RaidList;
    handleSelectionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export function RaidListDropdown({ selectedItem, raidList, handleSelectionChange }: RaidListDropdownProps) {
    return (
        <div className="flex w-full max-w-64 flex-col gap-2">
            <Select
                label="Select a raid"
                items={raidList.raids}
                className="min-w-64"
                scrollShadowProps={{
                    isEnabled: false,
                }}
                selectedKeys={[selectedItem]}
                onChange={handleSelectionChange}
                renderValue={(items: SelectedItems<RaidData>) => {
                    return items.map((item) => (
                        <div key={item.key} className="flex items-center">
                            <div className="flex flex-row items-center justify-center gap-0.5 text-xs text-default-500">
                                <span>Zone {item.data?.level}</span>
                                <span>|</span>
                                <span>Tier {item.data?.tier === '9999' ? 'Master' : item.data?.tier}</span>
                                <span>|</span>
                                <span>Season {item.data?.raid_season_sequence}</span>
                            </div>
                        </div>
                    ));
                }}
            >
                {(raid) => (
                    <SelectItem key={raid.raid_id} textValue={raid.level}>
                        <div className="flex items-center gap-2">
                            <div className="flex flex-col">
                                <span className="text-small">Tier {raid.tier === '9999' ? 'Master' : raid.tier}</span>
                                <span className="text-tiny text-default-400">
                                    Zone {raid.level}, Season {raid.raid_season_sequence}
                                </span>
                            </div>
                        </div>
                    </SelectItem>
                )}
            </Select>
        </div>
    );
}
