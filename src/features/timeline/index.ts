import { useQuery } from '@tanstack/react-query';
import { ENDPOINTS, axios } from '@/lib/api/axios';

export function useAttackTimeline() {
    return useQuery({
        queryKey: ['attack_timeline'],
        queryFn: async () => {
            const data = await axios.get(ENDPOINTS.timeline_chart);
            return data;
        },
    });
}
