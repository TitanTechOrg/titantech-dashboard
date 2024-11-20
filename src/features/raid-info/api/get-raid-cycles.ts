import { ENDPOINTS, axios } from '@/lib/api/axios';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { CycleData } from '../types';

export function useRaidCycles(raidId?: string) {
    return useQuery({
        queryKey: ['cycle_data', raidId ?? 'latest'],
        queryFn: async () => await fetchRaidCycles(raidId),
        select: (data) => {
            const raid_id = data.raid_id;
            const cycles = data.cycles.sort((a, b) => (a.cycle > b.cycle ? 1 : -1));
            return { raid_id, cycles };
        },
    });
}

async function fetchRaidCycles(raidId?: string) {
    let params = '';

    const searchParams = new URLSearchParams();

    if (raidId) searchParams.append('raid_id', raidId);

    if (searchParams.size) {
        params += '?';
        params += searchParams;
    }

    const url = ENDPOINTS.cycle_data + params;

    return await axios.get<AxiosResponse<CycleData>, CycleData>(url);
}
