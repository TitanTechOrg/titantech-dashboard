import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchAttacks } from '..';

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
