import AttacksCardLogo from '@/assets/Attack.webp';
import { useRaidList } from '@/features/raid-info';
import { useBoundStore } from '@/stores/bound.store';
import { usePreferencesStore } from '@/stores/preferences.store';
import { formatter } from '@/utils';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
  Slider,
  SliderValue,
  Spinner,
  Switch,
} from '@heroui/react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useMediaQueries } from '@react-hook/media-query';
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { AttacksList, RaidLogs } from '..';

export function AttacksCard({
  data,
  error,
  isFetching,
  isRefetching,
  refetch,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
}: UseInfiniteQueryResult<InfiniteData<RaidLogs, unknown>, Error>) {
  const { matches } = useMediaQueries({
    screen: 'screen',
    width: '(max-width: 640px)',
  });

  const { data: raidList } = useRaidList();

  const hasData: boolean = !!(
    data &&
    data?.pages &&
    data?.pages[0]?.attack_logs?.length > 0
  );

  const { showRaidCards, setShowRaidCards } = useBoundStore();
  const { offstratDamageThreshold, setOffstratDamageThreshold } =
    usePreferencesStore();

  const handleChange = (value: SliderValue) => {
    if (isNaN(Number(value))) return;

    setOffstratDamageThreshold(value as number);
  };

  return (
    <Card className="px-2 dark:bg-neutral-800">
      <CardHeader className="h-[70px] justify-between">
        <div className="flex flex-row items-center justify-start gap-4">
          <div className="min-w-fit">
            <Image
              src={AttacksCardLogo}
              className="flex h-8 w-8 rounded-sm object-cover"
            />
          </div>
          <h3 className="text-left text-lg font-medium">Latest Raid Attacks</h3>
        </div>
        <Button
          className="flex sm:hidden"
          color="primary"
          isLoading={isRefetching}
          onPress={() => refetch()}
          isIconOnly
          isDisabled={!!raidList?.raids[0]?.ended_at}
        >
          <ReloadIcon />
        </Button>
        <Button
          size="sm"
          className="hidden sm:flex"
          color="primary"
          isLoading={isRefetching}
          onPress={() => refetch()}
          isDisabled={!!raidList?.raids[0]?.ended_at}
        >
          Refresh
        </Button>
      </CardHeader>
      <Divider />
      <CardBody className="gap-4">
        {isFetching && !isRefetching && (
          <Spinner label="Loading..." color="primary" />
        )}
        {error && <div>{`An error has occurred: ${error.message}}`}</div>}
        {hasData ? (
          <>
            <div className="flex w-full max-w-md flex-col gap-6">
              {matches.width && (
                <Switch
                  isSelected={showRaidCards}
                  onValueChange={setShowRaidCards}
                >
                  <span className="text-sm font-medium">View Raid Decks</span>
                </Switch>
              )}
              {matches.width ? (
                !showRaidCards ? (
                  <Slider
                    size="md"
                    className="max-w-md"
                    color="primary"
                    label={
                      <span className="text-sm font-medium">
                        Offstrat Damage Threshold
                      </span>
                    }
                    showSteps={true}
                    step={500_000}
                    maxValue={5_000_000}
                    minValue={0}
                    value={offstratDamageThreshold}
                    getValue={(value) => formatter().format(value as number)}
                    onChange={handleChange}
                  />
                ) : null
              ) : (
                <Slider
                  size="md"
                  className="max-w-md"
                  color="primary"
                  label={
                    <span className="text-sm font-medium">
                      Offstrat Damage Threshold
                    </span>
                  }
                  showSteps={true}
                  step={500_000}
                  maxValue={5_000_000}
                  minValue={0}
                  value={offstratDamageThreshold}
                  getValue={(value) => formatter().format(value as number)}
                  onChange={handleChange}
                />
              )}
            </div>

            <AttacksList
              pages={data?.pages!}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetching={isFetching}
              isFetchingNextPage={isFetchingNextPage}
            />
          </>
        ) : isFetching ? null : (
          <div>No data yet</div>
        )}
      </CardBody>
    </Card>
  );
}
