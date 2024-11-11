import { ENDPOINTS, axios } from '@/lib/api/axios';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { PlayersData } from '../types';

export function useOverviewPlayers(raidId?: string, cycle?: number) {
    return useQuery({
        queryKey: ['overview_players', raidId, cycle],
        queryFn: async () => await fetchRaidPlayersOverview(raidId, cycle),
        enabled: !!raidId,
    });
}

async function fetchRaidPlayersOverview(raidId?: string, cycle?: number) {
    let params = '';

    const searchParams = new URLSearchParams();

    if (raidId) searchParams.append('raid_id', raidId);
    if (cycle) searchParams.append('cycle', String(cycle));

    if (searchParams.size) {
        params += '?';
        params += searchParams;
    }

    const url = ENDPOINTS.overview + params;

    return await axios.get<AxiosResponse<PlayersData>, PlayersData>(url);
}
