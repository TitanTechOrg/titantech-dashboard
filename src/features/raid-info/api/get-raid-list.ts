import { ENDPOINTS, axios } from '@/lib/api/axios';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { RaidTierType, RaidList } from '../types';
import { mapRaidTier } from '../utils/mapRaidTier';

export function useRaidList() {
    return useQuery({
        queryKey: ['raid_list'],
        queryFn: async () => await axios.get<AxiosResponse<RaidList>, RaidList>(ENDPOINTS.raid_list),
        select(data) {
            const mutatedData = data.raids.map((raidData) => {
                let tier: RaidTierType = "Master Tier";

                if (raidData.tier === '1' ) tier = "Tier One";
                else if (raidData.tier === '2' ) tier = "Tier Two";
                else if (raidData.tier === '3' ) tier = "Tier Three";
                else if (raidData.tier === '4' ) tier = "Tier Four";
                else if (raidData.tier === '9999' ) tier = "Master Tier";

                return ({...raidData, tier,  attacksPerTier: mapRaidTier(tier)})
            });

            data.raids = mutatedData;

            return data;
        },
        placeholderData: keepPreviousData,
    });
}
