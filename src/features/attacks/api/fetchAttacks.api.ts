import { ENDPOINTS, axios } from '@/lib/api/axios';
import { AxiosResponse } from 'axios';
import { RaidLogs } from '../types';

export const fetchAttacks = async ({ pageParam = 0 }) =>
    await axios.get<AxiosResponse<RaidLogs>, RaidLogs>(ENDPOINTS.raid_attack_log.v2 + '?offset=' + pageParam);

// let latestOccurredAt = '';
// let cachedData: any;

// export function useLatestAttacks2(raidId: string | undefined = '') {
//     return useInfiniteQuery({
//         queryKey: ['raid_attacks2'],
//         refetchOnWindowFocus: false,
//         queryFn: async ({ pageParam, direction }) => {
//             // console.log(direction); // type FetchDirection = 'forward' | 'backward';
//             // 0 = fetch newer
//             // 1 = fetch older

//             if (!pageParam) {
//                 pageParam = latestOccurredAt;
//             }

//             const paramDirectionValue = direction === 'forward' ? 1 : 0;
//             // console.log(direction);
//             const param1 = '?raid_id=' + raidId;
//             // const param2 = '&direction=' + paramDirectionValue;
//             const param2 = pageParam ? '&direction=' + paramDirectionValue : '&direction=0';
//             // const param2 = '&direction=1';
//             const param3 = pageParam ? '&titan_attack_occurred_at=' + pageParam : '';

//             // console.log(param1);
//             // console.log(param2);
//             // console.log(param3);
//             // console.log('------');
//             const response = await axios.get<AxiosResponse<RaidLogs>, RaidLogs | string>(ENDPOINTS.raid_attack_log.v3 + param1 + param2 + param3);
//             return response;
//         },

//         select(data) {
//             // console.log('data', data);

//             if (data?.pages?.every((val) => typeof val === 'string')) {
//                 return cachedData;
//             }

//             if (!cachedData) {
//                 cachedData = data;
//             } else if (cachedData?.pages) {
//                 cachedData?.pages?.push(data?.pages?.at(0));
//                 // [...new Set([...cachedData?.pages?.at(0).attack_logs, ...data?.pages?.at(0)?.attack_logs])];
//             }

//             if (!latestOccurredAt) {
//                 latestOccurredAt = cachedData?.pages?.at(0)?.attack_logs?.at(0)?.occurred_at ?? '';
//             }

//             console.log('latestTimestamp', cachedData?.pages?.at(0)?.attack_logs?.at(0)?.occurred_at);
//             console.log('oldestTimestamp', cachedData?.pages?.at(0)?.attack_logs?.at(-1)?.occurred_at);

//             // if (cachedData.pages) {
//             //     cachedData.pages = cachedData.pages?.filter(Boolean);
//             // }

//             // console.log('response', response, cachedData);
//             // console.log('latestOccurredAt', latestOccurredAt);
//             console.log('cachedData', cachedData);
//             return cachedData;
//         },

//         initialPageParam: '',
//         getPreviousPageParam: (firstPage) => {
//             if (typeof firstPage === 'string') {
//                 return latestOccurredAt;
//             } else {
//                 return firstPage?.attack_logs?.at(0)?.occurred_at;
//             }
//         },
//         getNextPageParam: (lastPage) => {
//             if (typeof lastPage === 'string') {
//                 return latestOccurredAt;
//             } else {
//                 return lastPage?.attack_logs?.at(-1)?.occurred_at;
//             }
//         },
//         enabled: !!raidId,
//         refetchInterval: 5 * 1000, // in ms
//         staleTime: Infinity,
//         placeholderData: keepPreviousData,
//     });
// }
