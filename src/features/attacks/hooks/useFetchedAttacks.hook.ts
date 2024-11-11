import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchAttacks, fetchAttacksV3 } from '..';

const OFFSET_AMOUNT: number = 25;

export const useFetchedAttacks = () => {
    return useInfiniteQuery({
        queryKey: ['raid_attacks'],
        refetchOnWindowFocus: false,
        queryFn: fetchAttacks,
        initialPageParam: 0,
        getNextPageParam: (lastPage, _, lastPageParam) => {
            if (lastPage.count === 0) {
                return undefined;
            }
            return lastPageParam + OFFSET_AMOUNT;
        },
    });
};

export const useFetchedAttacksV3 = (lastTitanAttackOccurredAt?: string) => {
    return useQuery({
        queryKey: ['raid_attacks_v3', lastTitanAttackOccurredAt],
        refetchOnWindowFocus: false,
        queryFn: async () => await fetchAttacksV3(lastTitanAttackOccurredAt),
    });
};
