import { RaidTierType } from '@/features/raid-info';

export const getOrdinalSuffix = (value: number): string => ['st', 'nd', 'rd'][((((value + 90) % 100) - 10) % 10) - 1] || 'th';

export const convertUTCDateToLocalDate = (dateString: string): string => {
    return new Date(dateString + '.000Z').toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
};

export const getRaidLabel = (tier: RaidTierType | string, level: string): string => `${tier} ⦁ Zone ${level}`;

export const addSpacesBetweenCapitalLetters = (input: string): string => {
    // return input.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
    return input.replace(/([A-Z])/g, ' $1').trim();
};
