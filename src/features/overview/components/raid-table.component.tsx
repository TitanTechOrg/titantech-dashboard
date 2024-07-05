import { RaidCycle, RaidData, useRaidCycles } from '@/features/raid-info';
import { formatTime } from '@/utils/datetime-formatter';
import { abbreviateNumber } from '@/utils/number-formatter';
import {
    Button,
    Chip,
    ChipProps,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Selection,
    SortDescriptor,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@nextui-org/react';
import { CheckIcon, ChevronDownIcon, Cross2Icon } from '@radix-ui/react-icons';
import { Key, useCallback, useMemo, useState } from 'react';
import { useOverviewPlayers } from '../api/get-overview-players';
import { CycleOptions, PlayerData } from '../types';

const INITIAL_VISIBLE_COLUMNS = [
    'index',
    'player_name',
    'average_damage',
    'total_damage',
    'min_damage',
    'max_damage',
    'attack_count',
    'team_tactics_used',
    'mirror_force_used',
];

const columns = [
    { name: '#', uid: 'index', sortable: false },
    { name: 'Name', uid: 'player_name', sortable: true },
    { name: 'Average Damage', uid: 'average_damage', sortable: true },
    { name: 'Total Damage', uid: 'total_damage', sortable: true },
    { name: 'Lowest Damage', uid: 'min_damage', sortable: true },
    { name: 'Highest Damage', uid: 'max_damage', sortable: true },
    { name: 'Damage Range', uid: 'damage_range', sortable: true },
    { name: 'Attack count', uid: 'attack_count', sortable: true },
    { name: 'Duration (hh:mm:ss)', uid: 'duration', sortable: true },
    { name: 'Team Tactics', uid: 'team_tactics_used', sortable: true },
    { name: 'Mirror Force', uid: 'mirror_force_used', sortable: true },
];

type IndexedPlayerData = { index: number } & PlayerData;

const cycleOverviewOption: CycleOptions[] = [{ name: 'Overview', uid: 'all' }];

const countTotalAttacks = (currentCycle: number, attacksPerTier: number) => {
    return currentCycle * attacksPerTier;
};

const getAttacksStatusColour = (currentCycle: number, playerAttackCount: number, attacksPerTier: number): ChipProps['color'] => {
    const totalAttacksAvailable = countTotalAttacks(currentCycle, attacksPerTier);
    const percentAttacksDone = (playerAttackCount / totalAttacksAvailable) * 100;

    if (percentAttacksDone <= 40) return 'danger';
    if (percentAttacksDone <= 99) return 'warning';
    if (percentAttacksDone > 100) return 'primary';

    return 'success';
};

type RaidTableProps = {
    raidId: string;
    raid: RaidData;
};

const textAlignment = {
    center: ['team_tactics_used', 'mirror_force_used'],
    end: ['average_damage', 'max_damage', 'min_damage', 'damage_range', 'total_damage'],
};

export function RaidTable({ raidId, raid }: RaidTableProps) {
    const { data: raidCycles } = useRaidCycles(raidId);

    const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = useState<Selection>(new Set(['all']));
    const selectedStatusValue = Array.from(statusFilter)[0];

    const { data: overviewPlayers, isLoading } = useOverviewPlayers(
        raid.raid_id,
        selectedStatusValue === 'all' ? undefined : Number(selectedStatusValue)
    );

    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: 'name',
        direction: 'ascending',
    });

    const headerColumns = useMemo(() => {
        if (visibleColumns === 'all') return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const items = useMemo(() => {
        return overviewPlayers?.players_data || [];
    }, [overviewPlayers?.players_data, raidCycles?.cycles?.length]);

    const sortedItems = useMemo(() => {
        return [...items]
            .sort((a: PlayerData, b: PlayerData) => {
                const first = a[sortDescriptor.column as keyof PlayerData] as number;
                const second = b[sortDescriptor.column as keyof PlayerData] as number;
                const cmp = first < second ? -1 : first > second ? 1 : 0;

                return sortDescriptor.direction === 'descending' ? -cmp : cmp;
            })
            .map((val, index) => ({ ...val, index: index + 1 }) as IndexedPlayerData);
    }, [sortDescriptor, items, raidCycles?.cycles?.length]);

    const renderCell = useCallback(
        (player: PlayerData, columnKey: Key) => {
            const cellValue = player[columnKey as keyof PlayerData];

            switch (columnKey) {
                case 'average_damage':
                case 'max_damage':
                case 'min_damage':
                case 'damage_range':
                case 'total_damage':
                    const text: number | string[] = abbreviateNumber(Number(cellValue));
                    return (
                        <div className="flex flex-row items-center justify-end ">
                            {typeof text === 'number' ? (
                                <p className="text-bold">{text}</p>
                            ) : (
                                <p className="text-bold">
                                    {text[0]}
                                    <span className="inline-block w-4 pl-1 text-left">{text[1]}</span>
                                </p>
                            )}
                        </div>
                    );

                case 'team_tactics_used':
                case 'mirror_force_used':
                    return (
                        <div className="flex flex-row items-center justify-center">
                            {cellValue ? <CheckIcon className="text-green-500" /> : <Cross2Icon className="text-red-500" />}
                        </div>
                    );

                case 'attack_count':
                    const currentCycle = selectedStatusValue === 'all' ? raidCycles?.cycles?.length ?? 1 : 1;
                    return (
                        <div className="flex flex-row items-center justify-center">
                            <Chip color={getAttacksStatusColour(currentCycle, player.attack_count, raid.attacksPerTier)} size="sm" variant="flat">
                                {cellValue}/{countTotalAttacks(currentCycle, raid.attacksPerTier)}
                            </Chip>
                        </div>
                    );
                case 'duration':
                    return <span className="flex items-start justify-center">{formatTime(Number(cellValue))}</span>;

                default:
                    return <span className="flex items-start justify-start">{cellValue}</span>;
            }
        },
        [selectedStatusValue, raidCycles?.cycles?.length, items]
    );

    const mapCycleOptions = useMemo(
        () => (cycles: RaidCycle[] | undefined) => {
            return cycleOverviewOption.concat(
                cycles?.map(({ cycle }: RaidCycle) => {
                    return { name: 'Round ' + cycle, uid: String(cycle) } as CycleOptions;
                }) ?? []
            );
        },
        [raidCycles?.cycles?.length]
    );

    const disableCycleDropdown = useMemo(() => {
        const raidCycleCount = raidCycles?.cycles?.length;
        const dropdownStartingItemsLength = 2;

        if (raidCycleCount == null) return false;

        return raidCycleCount < dropdownStartingItemsLength;
    }, [raidCycles?.cycles?.length]);

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center justify-between">
                        {overviewPlayers && overviewPlayers?.players_data.length > 0 && (
                            <span className="text-small text-default-400">Total {overviewPlayers.players_data.length} players</span>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat" isDisabled={disableCycleDropdown}>
                                    Rounds
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Cycles dropdown"
                                closeOnSelect={true}
                                selectedKeys={statusFilter}
                                selectionMode="single"
                                onSelectionChange={setStatusFilter}
                            >
                                {mapCycleOptions(raidCycles?.cycles).map((cycle) => (
                                    <DropdownItem key={cycle.uid} className="capitalize">
                                        {cycle.name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Columns
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} isReadOnly={column.uid === 'player_name'}>
                                        {column.name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        {/* <Button color="primary" endContent={<DownloadIcon />} isDisabled>
                            Download CSV
                        </Button> */}
                    </div>
                </div>
            </div>
        );
    }, [statusFilter, visibleColumns, overviewPlayers?.players_data]);

    return (
        <Table
            isHeaderSticky
            isCompact
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSortChange={setSortDescriptor}
            selectionMode="single"
            color={'primary'}
        >
            <TableHeader columns={headerColumns}>
                {(column) => {
                    return (
                        <TableColumn
                            className={`${!textAlignment.center.includes(column.uid) ? (textAlignment.end.includes(column.uid) ? 'text-right' : 'text-left') : 'text-center'}`}
                            key={column.uid}
                            allowsSorting={column.sortable}
                        >
                            {column.name}
                        </TableColumn>
                    );
                }}
            </TableHeader>
            <TableBody emptyContent={isLoading ? <Spinner label="Loading..." /> : <p>No players found</p>} items={sortedItems} isLoading={isLoading}>
                {(item) => <TableRow key={item.player_id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>}
            </TableBody>
        </Table>
    );
}
