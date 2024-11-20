import { axios, ENDPOINTS } from '@/lib/api/axios';
import { AxiosResponse } from 'axios';
import { Timeline } from '../types';

export async function fetchTimeline() {
    return await axios.get<AxiosResponse<Timeline>, Timeline>(ENDPOINTS.timeline_chart);
}
