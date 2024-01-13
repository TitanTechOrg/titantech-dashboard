import { ENDPOINTS, axios } from '@/lib/api/axios';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { CycleData } from '../types';

export function useRaidCycles() {
    return useQuery({
        queryKey: ['cycle_data'],
        queryFn: async () => await axios.get<AxiosResponse<CycleData>, CycleData>(ENDPOINTS.cycle_data),
    });
}
