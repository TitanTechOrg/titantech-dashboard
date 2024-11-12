import { axios, ENDPOINTS } from '@/lib/api/axios';
import { AxiosResponse } from 'axios';
import { RaidLogs } from '../types';

type FetchRaidLogsParams = {
    direction: 0 | 1;
    titan_attack_occurred_at?: string;
};

export const fetchAttacks = async ({ pageParam, direction = 0 }: { pageParam?: string | unknown; direction?: 0 | 1 }) => {
    const params: FetchRaidLogsParams = {
        direction,
        ...(typeof pageParam === 'string' && pageParam && { titan_attack_occurred_at: pageParam }),
    };

    return await axios.get<AxiosResponse<RaidLogs>, RaidLogs>(ENDPOINTS.raid_attack_log.v3, { params });
};
