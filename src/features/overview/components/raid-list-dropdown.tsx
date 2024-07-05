import { RaidData, RaidList } from '@/features/raid-info';
import { Select, SelectItem, SelectedItems } from '@nextui-org/react';

type RaidListDropdownProps = {
    selectedItem: string;
    raidList: RaidList;
    handleSelectionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export function RaidListDropdown({ selectedItem, raidList, handleSelectionChange }: RaidListDropdownProps) {
    return (
        <div className="flex w-full flex-col gap-2 sm:max-w-64">
            <Select
                color="primary"
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
                                <span>{item.data?.tier || 'Master Tier'}</span>
                                <span>|</span>
                                <span>Season {item.data?.raid_season_sequence}</span>
                            </div>
                        </div>
                    ));
                }}
            >
                {(raid) => (
                    <SelectItem key={raid.raid_id} textValue={raid.level} color="primary">
                        <div className="flex items-center gap-2">
                            <div className="flex flex-col">
                                <span className="text-small">{raid.tier || 'Master Tier'}</span>
                                <span className="text-tiny">
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
