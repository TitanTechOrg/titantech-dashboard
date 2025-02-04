import { ENDPOINTS, axios } from '@/lib/api/axios';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { AttacksRaidTierMapping } from '../constants';
import { RaidList } from '../types';

export function useRaidList() {
    return useQuery({
        queryKey: ['raid_list'],
        queryFn: async () => await axios.get<AxiosResponse<RaidList>, RaidList>(ENDPOINTS.raid_list),
        select(data) {
            const mutatedData = data.raids.map((raidData) => {
                const { label, attacks } = AttacksRaidTierMapping[raidData.tier as number];
                return { ...raidData, tierLabel: label, attacksPerTier: attacks };
            });

            data.raids = mutatedData;

            return data;
        },
        placeholderData: keepPreviousData,
    });
}
