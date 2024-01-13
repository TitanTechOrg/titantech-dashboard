import { ENDPOINTS, axios } from '@/lib/api/axios';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { TitanSequences } from '..';

export function useRaidTitans() {
    return useQuery({
        queryKey: ['raid_titans'],
        queryFn: async () => await axios.get<AxiosResponse<TitanSequences>, TitanSequences>(ENDPOINTS.titans),
    });
}
