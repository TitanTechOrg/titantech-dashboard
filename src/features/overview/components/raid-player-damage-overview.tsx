import { Button, ButtonGroup, Card, CardBody, CardHeader } from '@heroui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PlayerData } from '../types';
import { BoxPlotChartData } from './box-plot-chart-data';

type Props = {
  playersData: PlayerData[];
};

const collator = new Intl.Collator('en-US');

type SortType = 'ASC' | 'DESC';

const sortBy = (a: string, b: string, orderBy: SortType = 'ASC') => {
  return orderBy === 'ASC' ? collator.compare(a, b) : collator.compare(b, a);
};

type ToggleGroupValues = 'ALPHABETICAL' | 'ALPHABETICAL_REVERSED' | 'AVERAGE';

export function RaidPlayerDamageOverview({ playersData }: Props) {
  const [selected, setSelected] = useState<ToggleGroupValues>('AVERAGE');
  const prevSelected = useRef<ToggleGroupValues>('AVERAGE');
  const [sortedData, setSortedData] = useState<PlayerData[]>(playersData);

  const handleOnPress = useCallback((btnNumber: ToggleGroupValues) => {
    setSelected((prev) => {
      prevSelected.current = prev;

      return btnNumber;
    });
  }, []);

  useEffect(() => {
    if (selected === 'ALPHABETICAL') {
      setSortedData(
        [...playersData].sort(({ player_name: a }, { player_name: b }) =>
          sortBy(a, b, 'ASC')
        )
      );
    } else if (selected === 'ALPHABETICAL_REVERSED') {
      setSortedData(
        [...playersData].sort(({ player_name: a }, { player_name: b }) =>
          sortBy(a, b, 'DESC')
        )
      );
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
        <ButtonGroup size="sm">
          <Button
            color={
              selected === 'ALPHABETICAL' ||
              selected === 'ALPHABETICAL_REVERSED'
                ? 'primary'
                : 'default'
            }
            onPress={() => handleOnPress(invertSort(selected))}
          >
            A-Z
          </Button>
          <Button
            color={selected === 'AVERAGE' ? 'primary' : 'default'}
            onPress={() => handleOnPress('AVERAGE')}
          >
            Average
          </Button>
        </ButtonGroup>
      </CardHeader>
      <CardBody className="sm:pr-12">
        <BoxPlotChartData
          playersData={sortedData.length > 0 ? sortedData : playersData}
        />
      </CardBody>
    </Card>
  );
}
