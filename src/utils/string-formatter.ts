import { RaidData } from '@/features/raid-info';

export const getOrdinalSuffix = (value: number): string => ['st', 'nd', 'rd'][((((value + 90) % 100) - 10) % 10) - 1] || 'th';

export const convertUTCDateToLocalDate = (dateString: string): string => {
    return new Date(dateString + '.000Z').toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
};

type RaidLabelType = Pick<RaidData, 'tierLabel' | 'level'>;

export const getRaidLabel = ({ tierLabel, level }: RaidLabelType): string => `${tierLabel} ⦁ Zone ${level}`;

export const addSpacesBetweenCapitalLetters = (input: string): string => {
    return input.replace(/([A-Z])/g, ' $1').trim();
};
