import { Button, Card, CardBody, CardHeader, Divider, Image, Spinner, Switch } from '@nextui-org/react';
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { AttacksList, RaidLogs } from '..';
import { useBoundStore } from '@/stores/bound.store';
import { useMediaQueries } from '@react-hook/media-query';
import AttacksCardLogo from '@/assets/Attack.webp';

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

    const hasData: boolean = !!(data && data?.pages && data?.pages[0]?.attack_logs.length > 0);

    const { showRaidCards, setShowRaidCards } = useBoundStore();

    return (
        <Card className="dark:bg-neutral-800 p-2">
            <CardHeader className="justify-between">
                <div className="flex flex-row items-center justify-start gap-4">
                    <div className="min-w-fit">
                        <Image src={AttacksCardLogo} className="rounded flex object-cover h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-medium">Latest Raid Attacks</h3>
                </div>
                <Button size="sm" color="primary" isLoading={isRefetching} onPress={() => refetch()}>
                    Refresh
                </Button>
            </CardHeader>
            <CardBody className="gap-4">
                <Divider />
                {isFetching && <Spinner label="Loading..." color="primary" />}
                {error && <div>'An error has occurred: ' + {error.message}</div>}
                {hasData ? (
                    <>
                        {matches.width && (
                            <Switch isSelected={showRaidCards} onValueChange={setShowRaidCards}>
                                View Raid Decks
                            </Switch>
                        )}
                        <AttacksList
                            pages={data?.pages!}
                            fetchNextPage={fetchNextPage}
                            hasNextPage={hasNextPage}
                            isFetching={isFetching}
                            isFetchingNextPage={isFetchingNextPage}
                        />
                    </>
                ) : (
                    <div>No data yet</div>
                )}
            </CardBody>
        </Card>
    );
}
