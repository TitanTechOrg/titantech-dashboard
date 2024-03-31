import { useMutation } from '@tanstack/react-query';
import { ENDPOINTS, axios } from '@/lib/api/axios';
import { FieldValues } from 'react-hook-form';

const calculateAlchemy = async (data: FieldValues): Promise<string> => {
    const isDustOnly = !!data?.dust_only;
    delete data['dust_only'];
    let url = ENDPOINTS.alchemy_crafts;

    if (isDustOnly) {
        url += '?dust_only=True';
    }

    const json: string = JSON.stringify(data);
    return axios.post(url, json, {
        headers: { 'Content-Type': 'application/json' }, // Overwrite Axios's automatically set Content-Type
        params: { noAuth: true },
    });
};

export const useCalculateAlchemy = () => {
    return useMutation({
        mutationFn: calculateAlchemy,
    });
};
