import { Key, useCallback, useMemo, useState } from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Selection,
    SortDescriptor,
    Chip,
    ChipProps,
    Spinner,
} from '@nextui-org/react';

import { formatter } from '@/utils/number-formatter';
import { CycleOptions, IconSvgProps, PlayerData } from '../types';
import { CheckIcon, Cross2Icon, DownloadIcon } from '@radix-ui/react-icons';
import { useOverviewPlayers } from '../api/get-overview-players';
import { RaidCycle, useRaidCycles } from '@/features/raid-info';

const ChevronDownIcon = ({ strokeWidth = 1.5, ...otherProps }: IconSvgProps) => (
    <svg aria-hidden="true" fill="none" focusable="false" height="1em" role="presentation" viewBox="0 0 24 24" width="1em" {...otherProps}>
        <path
            d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={strokeWidth}
        />
    </svg>
);

const statusColorMap: Record<string, ChipProps['color']> = {
    0: 'danger',
    1: 'danger',
    2: 'danger',
    3: 'danger',
    4: 'warning',
    5: 'warning',
    6: 'success',
    undefined: 'success',
};

const INITIAL_VISIBLE_COLUMNS = ['index', 'player_name', 'average_damage', 'attack_count', 'team_tactics_used', 'mirror_force_used'];

const columns = [
    { name: '#', uid: 'index', sortable: false },
    { name: 'Name', uid: 'player_name', sortable: true },
    { name: 'Average Damage', uid: 'average_damage', sortable: true },
    { name: 'Lowest Damage', uid: 'min_damage', sortable: true },
    { name: 'Highest Damage', uid: 'max_damage', sortable: true },
    { name: 'Damage Range', uid: 'damage_range', sortable: true },
    { name: 'Attack count', uid: 'attack_count', sortable: true },
    { name: 'Duration', uid: 'duration', sortable: true },
    { name: 'Team Tactics', uid: 'team_tactics_used', sortable: true },
    { name: 'Mirror Force', uid: 'mirror_force_used', sortable: true },
];

type IndexedPlayerData = { index: number } & PlayerData;

const cycleOverviewOption: CycleOptions[] = [{ name: 'Overview', uid: 'all' }];

export function RaidTable() {
    const { data, isLoading } = useOverviewPlayers();
    const { data: raidCycles } = useRaidCycles();

    const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = useState<Selection>(new Set(['all']));
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: 'name',
        direction: 'ascending',
    });

    const headerColumns = useMemo(() => {
        if (visibleColumns === 'all') return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const items = useMemo(() => {
        return data?.players_data ?? [];
    }, [data?.players_data]);

    const sortedItems = useMemo(() => {
        return [...items]
            .sort((a: PlayerData, b: PlayerData) => {
                const first = a[sortDescriptor.column as keyof PlayerData] as number;
                const second = b[sortDescriptor.column as keyof PlayerData] as number;
                const cmp = first < second ? -1 : first > second ? 1 : 0;

                return sortDescriptor.direction === 'descending' ? -cmp : cmp;
            })
            .map((val, index) => ({ ...val, index: index + 1 }) as IndexedPlayerData);
    }, [sortDescriptor, items]);

    const renderCell = useCallback((player: PlayerData, columnKey: Key) => {
        const cellValue = player[columnKey as keyof PlayerData];

        switch (columnKey) {
            case 'average_damage':
            case 'max_damage':
            case 'min_damage':
            case 'damage_range':
                return (
                    <div className="flex flex-row items-center justify-start">
                        <p className="text-bold text-small">{formatter().format(Number(cellValue))}</p>
                    </div>
                );

            case 'team_tactics_used':
            case 'mirror_force_used':
                return (
                    <div className="flex flex-row items-center justify-start">
                        {cellValue ? <CheckIcon className="text-green-500" /> : <Cross2Icon className="text-red-500" />}
                    </div>
                );

            case 'attack_count':
                return (
                    <div className="flex flex-row items-center justify-start">
                        <Chip className="capitalize" color={statusColorMap[player.attack_count] ?? 'success'} size="sm" variant="flat">
                            {cellValue}/6
                        </Chip>
                    </div>
                );
            case 'duration':
                const durationInHHMMSS = new Date(Number(cellValue) * 1000).toISOString().substring(11, 16);
                return <span className="flex items-start justify-start">{durationInHHMMSS}</span>;

            default:
                return <span className="flex items-start justify-start">{cellValue}</span>;
        }
    }, []);

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

        return raidCycleCount <= dropdownStartingItemsLength;
    }, [raidCycles?.cycles?.length]);

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center justify-between">
                        <span className="text-small text-default-400">Total {data?.players_data.length || 0} players</span>
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
                                aria-label="Table Columns"
                                closeOnSelect={true}
                                selectedKeys={statusFilter}
                                selectionMode="single"
                                onSelectionChange={setStatusFilter}
                            >
                                {mapCycleOptions(raidCycles?.cycles).map((cycle) => (
                                    <DropdownItem
                                        key={cycle.uid}
                                        className="capitalize"
                                        onPress={() => {
                                            if (cycle.uid !== 'all') {
                                                useOverviewPlayers(Number(cycle.uid));
                                            }
                                        }}
                                    >
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
                                    <DropdownItem key={column.uid} className="capitalize" isReadOnly={column.uid === 'player_name'}>
                                        {column.name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Button color="primary" endContent={<DownloadIcon />} isDisabled>
                            Download CSV
                        </Button>
                    </div>
                </div>
            </div>
        );
    }, [statusFilter, visibleColumns, data?.players_data]);

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
                {(column) => (
                    <TableColumn key={column.uid} allowsSorting={column.sortable}>
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={isLoading ? <Spinner label="Loading..." /> : <p>No players found</p>} items={sortedItems} isLoading={isLoading}>
                {(item) => <TableRow key={item.player_id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>}
            </TableBody>
        </Table>
    );
}
