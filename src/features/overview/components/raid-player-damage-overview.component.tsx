import { PlayerData } from '../types';
import { BoxPlotChartData } from './box-plot-chart-data.component';
import { Button, ButtonGroup, Card, CardBody, CardHeader } from '@nextui-org/react';
import { useCallback, useEffect, useRef, useState } from 'react';

type RaidPlayerDamageOverview = {
    playersData: PlayerData[];
};

const collator = new Intl.Collator('en-US');

function sortAsc(a: string, b: string) {
    return collator.compare(a, b);
}

function sortDesc(a: string, b: string) {
    return collator.compare(b, a);
}

const TOGGLE_GROUP_VALUE = { ALPHABETICAL: 0, ALPHABETICAL_REVERSED: 1, AVERAGE: 2 } as const;
type ToggleGroupValues = keyof typeof TOGGLE_GROUP_VALUE;

export function RaidPlayerDamageOverview({ playersData }: RaidPlayerDamageOverview) {
    const [selected, setSelected] = useState<ToggleGroupValues>('ALPHABETICAL');
    const prevSelected = useRef<ToggleGroupValues>();
    const [sortedData, setSortedData] = useState<PlayerData[]>(playersData);

    const handleOnPress = useCallback(
        (btnNumber: ToggleGroupValues) => {
            setSelected((prev) => {
                prevSelected.current = prev;

                return btnNumber;
            });
        },
        [selected]
    );

    useEffect(() => {
        if (selected === 'ALPHABETICAL') {
            setSortedData([...playersData].sort(({ player_name: a }, { player_name: b }) => sortAsc(a, b)));
        } else if (selected === 'ALPHABETICAL_REVERSED') {
            setSortedData([...playersData].sort(({ player_name: a }, { player_name: b }) => sortDesc(a, b)));
        } else if (selected === 'AVERAGE') {
            setSortedData(
                [...playersData].sort((a, b) => {
                    if (a.average_damage < b.average_damage) return -1;
                    if (a.average_damage > b.average_damage) return 1;
                    return 0;
                })
            );
        } else setSortedData(playersData);
    }, [selected, playersData]);

    const invertSort = (value: ToggleGroupValues) => {
        if (value === 'ALPHABETICAL') return 'ALPHABETICAL_REVERSED';
        if (value === 'ALPHABETICAL_REVERSED') return 'ALPHABETICAL';
        return 'ALPHABETICAL';
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between text-lg font-medium">
                Overall Player Damages
                <ButtonGroup>
                    <Button
                        color={selected === 'ALPHABETICAL' || selected === 'ALPHABETICAL_REVERSED' ? 'primary' : undefined}
                        onPress={() => handleOnPress(invertSort(selected))}
                    >
                        A-Z
                    </Button>
                    <Button color={selected === 'AVERAGE' ? 'primary' : undefined} onPress={() => handleOnPress('AVERAGE')}>
                        Average
                    </Button>
                </ButtonGroup>
            </CardHeader>
            <CardBody>
                <BoxPlotChartData playersData={sortedData.length > 0 ? sortedData : playersData} />
            </CardBody>
        </Card>
    );
}
