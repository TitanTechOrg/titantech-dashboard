import { useQuery } from '@tanstack/react-query';
import { fetchLeaderboard } from '../api/fetchLeaderboard';

export const useFetchedLeaderboard = () => {
    return useQuery({
        queryKey: ['leaderboard'],
        refetchOnWindowFocus: false,
        queryFn: fetchLeaderboard,
    });
};
