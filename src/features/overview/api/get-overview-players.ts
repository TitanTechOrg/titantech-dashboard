import { ENDPOINTS, axios } from '@/lib/api/axios';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { PlayersData } from '../types';

export function useOverviewPlayers(cycle: number = 1) {
    return useQuery({
        queryKey: ['overview_players', cycle],
        queryFn: async () => await fetchRaidPlayersOverview(cycle),
    });
}

async function fetchRaidPlayersOverview(cycle: number) {
    const params = `?cycle=${cycle}`;
    const url = ENDPOINTS.overview + params;

    return await axios.get<AxiosResponse<PlayersData>, PlayersData>(url);
}
