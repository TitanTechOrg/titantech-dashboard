import { ENDPOINTS, axios } from '@/lib/api/axios';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { RaidList } from '../types';

export function useRaidList() {
    return useQuery({
        queryKey: ['raid_list'],
        queryFn: async () => await axios.get<AxiosResponse<RaidList>, RaidList>(ENDPOINTS.raid_list),
    });
}
