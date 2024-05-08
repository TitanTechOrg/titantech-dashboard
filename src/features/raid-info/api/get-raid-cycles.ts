import { ENDPOINTS, axios } from '@/lib/api/axios';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { CycleData } from '../types';

export function useRaidCycles(raidId?: string) {
    return useQuery({
        queryKey: ['cycle_data', raidId],
        queryFn: async () => await fetchRaidCycles(raidId),
    });
}

async function fetchRaidCycles(raidId?: string) {
    let params = '';

    const searchParams = new URLSearchParams();

    if (raidId) searchParams.append('raid_id', raidId);

    if (searchParams) {
        params += '?';
        params += searchParams;
    }

    const url = ENDPOINTS.cycle_data + params;

    return await axios.get<AxiosResponse<CycleData>, CycleData>(url);
}
