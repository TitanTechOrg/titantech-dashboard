import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { Button, Spinner } from '@nextui-org/react';
import { RaidLogs } from '@/features/attacks/types';
import { RaidLog } from '@/features/attacks';

type AttacksListProps = {
    pages: RaidLogs[];
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    isFetching: boolean;
    fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<InfiniteData<RaidLogs, unknown>, Error>>;
};

export function AttacksList({ pages, fetchNextPage, hasNextPage, isFetchingNextPage }: AttacksListProps) {
    const { ref } = useInView();

    return (
        <>
            {pages.map(({ attack_logs }: RaidLogs, index: number) => (
                <RaidLog key={`raid-log-page-${index}`} data={attack_logs} />
            ))}
            <div>
                <Button ref={ref} color="primary" variant="bordered" onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
                    {isFetchingNextPage ? <Spinner /> : hasNextPage ? 'Load More' : 'Nothing more to load'}
                </Button>
            </div>
        </>
    );
}
