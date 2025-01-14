import { ENDPOINTS, axios } from '@/lib/api/axios';
import { AxiosResponse } from 'axios';
import { type LeaderboardSeason } from '../types';

export const fetchLeaderboard = async () => await axios.get<AxiosResponse<LeaderboardSeason>, LeaderboardSeason>(ENDPOINTS.leaderboard);
