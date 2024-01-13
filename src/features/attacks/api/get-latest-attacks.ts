import { ENDPOINTS, axios } from '@/lib/api/axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { RaidLogs } from '../types';

const OFFSET_AMOUNT: number = 25;

export function useLatestAttacks() {
    return useInfiniteQuery({
        queryKey: ['raid_attacks'],
        refetchOnWindowFocus: false,
        queryFn: async ({ pageParam = 0 }) =>
            await axios.get<AxiosResponse<RaidLogs>, RaidLogs>(ENDPOINTS.raid_attack_log.v2 + '?offset=' + pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage, _, lastPageParam) => {
            if (lastPage.length === 0) {
                return undefined;
            }
            return lastPageParam + OFFSET_AMOUNT;
        },
    });
}
