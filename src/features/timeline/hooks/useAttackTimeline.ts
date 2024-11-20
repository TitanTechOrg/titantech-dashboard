import { useQuery } from '@tanstack/react-query';
import { fetchTimeline } from '../api/fetchTimeline';

export function useAttackTimeline() {
    return useQuery({
        queryKey: ['attack_timeline'],
        queryFn: async () => await fetchTimeline(),
    });
}
