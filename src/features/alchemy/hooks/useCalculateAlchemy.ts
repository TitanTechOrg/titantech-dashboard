import { useMutation } from '@tanstack/react-query';
import { calculateAlchemy } from '../api/get-alchemy-crafts';

export const useCalculateAlchemy = () => {
    return useMutation({
        mutationFn: calculateAlchemy,
    });
};
