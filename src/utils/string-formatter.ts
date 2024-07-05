import { RaidTierType } from "@/features/raid-info";

export const capitaliseFirstLetter = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export const getOrdinalSuffix = (value: number): string => ['st', 'nd', 'rd'][((((value + 90) % 100) - 10) % 10) - 1] || 'th';

export const convertUTCDateToLocalDate = (dateString: string): string => {
    return new Date(dateString + '.000Z').toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
};

export const getRaidLabel = (tier: RaidTierType | string, level: string): string => `${tier} ⦁ Zone ${level}`
