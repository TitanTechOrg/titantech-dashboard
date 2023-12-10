import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { ENDPOINTS, getRequest } from '@/lib/api/axios';
import { CycleData, RaidLogType, TitanSequenceResponse } from '@/pages/dashboard/raid-log/types';

const OFFSET_AMOUNT: number = 25;

function useLatestAttacks() {
    return useInfiniteQuery({
        queryKey: ['raid_attacks'],
        refetchOnWindowFocus: false,
        queryFn: async ({ pageParam = 0 }) => {
            return await getRequest<RaidLogType>(ENDPOINTS.raid_attack_log.v2 + '?offset=' + pageParam);
        },
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
        queryFn: async () => {
            return await getRequest<any>(ENDPOINTS.raid_list);
        },
    });
}

function useAttackTimeline() {
    return useQuery({
        queryKey: ['attack_timeline'],
        queryFn: async () => {
            return await getRequest(ENDPOINTS.timeline_chart);
        },
    });
}

function useRaidTitans() {
    return useQuery({
        queryKey: ['raid_titans'],
        queryFn: async () => {
            return await getRequest<TitanSequenceResponse>(ENDPOINTS.titans);
        },
    });
}

function useRaidCycles() {
    return useQuery({
        queryKey: ['cycle_data'],
        queryFn: async () => {
            const response = await getRequest<CycleData>(ENDPOINTS.cycle_data);
            return response;
            // return data;
        },
    });
}

// const data = {
//     raid_id: '9e567a54-b4ee-45e4-9b0c-6e9e99b544e0',
//     cycles: [
//         {
//             id: '89fcec6b-ea50-4e5a-b429-00a09313705c',
//             cycle: 3,
//             team_tactics: 47,
//             mirror_force: 23,
//             morale: 0.339,
//             next_reset_at: '2023-12-09T12:05:01',
//             started_at: '2023-12-09T00:05:01',
//         },
//         {
//             id: '89fcec6b-ea50-4e5a-b429-00a09313705c',
//             cycle: 4,
//             team_tactics: 23,
//             mirror_force: 35,
//             morale: 0.363,
//             next_reset_at: '2023-12-09T12:05:01',
//             started_at: '2023-12-09T00:05:01',
//         },
//     ],
// };

export { useLatestAttacks, useRaidList, useAttackTimeline, useRaidTitans, useRaidCycles };
