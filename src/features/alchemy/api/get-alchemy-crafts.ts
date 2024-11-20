import { ENDPOINTS, axios } from '@/lib/api/axios';
import { IngredientsData } from '../types';

export const calculateAlchemy = async (data: IngredientsData): Promise<string> => {
    return axios.post(ENDPOINTS.alchemy_crafts, data, {
        headers: { 'Content-Type': 'application/json' },
        params: { noAuth: true },
    });
};
