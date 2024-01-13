import { useMutation } from '@tanstack/react-query';
import { ENDPOINTS, axios } from '@/lib/api/axios';
import { FieldValues } from 'react-hook-form';

const calculateAlchemy = async (data: FieldValues): Promise<string> => {
    const json: string = JSON.stringify(data);
    return axios.post(ENDPOINTS.alchemy_crafts, json, {
        headers: { 'Content-Type': 'application/json' }, // Overwrite Axios's automatically set Content-Type
        params: { noAuth: true },
    });
};

export const useCalculateAlchemy = () => {
    return useMutation({
        mutationFn: calculateAlchemy,
    });
};
