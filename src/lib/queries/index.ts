import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { ENDPOINTS, getRequest } from '@/lib/api/axios';
import { CycleData, RaidLogType, TitanSequenceResponse } from '@/pages/dashboard/raid-log/types';

const OFFSET_AMOUNT: number = 25;

function useLatestAttacks() {
    return useInfiniteQuery({
        queryKey: ['raid_attacks'],
        refetchOnWindowFocus: false,
        queryFn: async ({ pageParam = 0 }) => await getRequest<RaidLogType>(ENDPOINTS.raid_attack_log.v2 + '?offset=' + pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage, _, lastPageParam) => {
            if (lastPage.length === 0) {
                return undefined;
            }
            return lastPageParam + OFFSET_AMOUNT;
        },
    });
}

function useRaidList() {
    return useQuery({
        queryKey: ['raid_list'],
        queryFn: async () => await getRequest<any>(ENDPOINTS.raid_list),
    });
}

function useAttackTimeline() {
    return useQuery({
        queryKey: ['attack_timeline'],
        queryFn: async () => await getRequest(ENDPOINTS.timeline_chart),
    });
}

function useRaidTitans() {
    return useQuery({
        queryKey: ['raid_titans'],
        queryFn: async () => await getRequest<TitanSequenceResponse>(ENDPOINTS.titans),
    });
}

function useRaidCycles() {
    return useQuery({
        queryKey: ['cycle_data'],
        queryFn: async () => await getRequest<CycleData>(ENDPOINTS.cycle_data),
    });
}

export { useLatestAttacks, useRaidList, useAttackTimeline, useRaidTitans, useRaidCycles };
