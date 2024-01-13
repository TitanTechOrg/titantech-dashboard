import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Spinner } from '@nextui-org/react';
import { RaidLogs } from '@/features/attacks/types';
import { RaidLog } from '@/features/attacks';

export function LatestAttacksList({
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
}: UseInfiniteQueryResult<InfiniteData<RaidLogs, unknown>, Error>) {
    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView]);

    if (status === 'pending') return <Spinner label="Loading..." color="primary" />;
    if (status === 'error') return 'An error has occurred: ' + error.message;
    if (data?.pages.length === 0) return null;
    if (data?.pages[0].count === 0) return <div>No attacks yet</div>;

    return (
        <>
            {data?.pages?.map(({ attack_logs }: RaidLogs, index: number) => {
                return <RaidLog key={`raid-log-page-${index}`} data={attack_logs} />;
            })}
            <div>
                <button ref={ref} onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
                    {isFetchingNextPage ? <Spinner /> : hasNextPage ? 'Load Newer' : 'Nothing more to load'}
                </button>
            </div>
            <div>{isFetching && !isFetchingNextPage ? 'Background Updating...' : null}</div>
        </>
    );
}
