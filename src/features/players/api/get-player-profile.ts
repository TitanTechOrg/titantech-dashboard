import { ENDPOINTS, axios } from '@/lib/api/axios';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import type { PlayerProfileType } from '../types';

export function usePlayerProfile(playerId: string | undefined) {
  return useQuery({
    queryKey: ['player_profile', playerId],
    queryFn: async () => await fetchPlayerProfile(playerId),
    enabled: !!playerId,
  });
}

async function fetchPlayerProfile(clan_player_id: string | undefined) {
  let params = '';

  const searchParams = new URLSearchParams();

  if (clan_player_id) searchParams.append('clan_player_id', clan_player_id);

  if (searchParams.size) {
    params += '?';
    params += searchParams;
  }

  const url = ENDPOINTS.profile + params;

  return await axios.get<AxiosResponse<PlayerProfileType>, PlayerProfileType>(
    url
  );
}
