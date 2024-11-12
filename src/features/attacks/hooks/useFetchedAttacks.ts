import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchAttacks, RaidLogs } from '..';

export const useFetchedAttacks = () => {
    return useInfiniteQuery<RaidLogs, Error>({
        queryKey: ['raid_attacks'],
        queryFn: async ({ pageParam }) => {
            return fetchAttacks({ pageParam });
        },
        getNextPageParam: (lastPage) => {
            if (lastPage && lastPage.attack_logs.length > 0) {
                return lastPage.attack_logs[lastPage.attack_logs.length - 1].occurred_at;
            }
            return undefined;
        },
        initialPageParam: undefined,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });
};
