import { FetchNextPageOptions, InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Spinner } from '@nextui-org/react';
import { RaidLogs } from '@/features/attacks/types';
import { RaidLog } from '@/features/attacks';

type AttacksListProps = {
    pages: RaidLogs[];
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    isFetching: boolean;
    fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<InfiniteData<RaidLogs, unknown>, Error>>;
};

export function AttacksList({ pages, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage }: AttacksListProps) {
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView]);

    return (
        <>
            {pages.map(({ attack_logs }: RaidLogs, index: number) => (
                <RaidLog key={`raid-log-page-${index}`} data={attack_logs} />
            ))}
            <div>
                <button ref={ref} onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
                    {isFetchingNextPage ? <Spinner /> : hasNextPage ? 'Load Newer' : 'Nothing more to load'}
                </button>
            </div>
            <div>{isFetching && !isFetchingNextPage ? 'Background Updating...' : null}</div>
        </>
    );
}
