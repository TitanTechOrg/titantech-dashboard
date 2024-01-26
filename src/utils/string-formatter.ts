export const capitaliseFirstLetter = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export const getOrdinalSuffix = (value: number): string => ['st', 'nd', 'rd'][((((value + 90) % 100) - 10) % 10) - 1] || 'th';

export const convertUTCDateToLocalDate = (dateString: string): string => {
    return new Date(dateString + '.000Z').toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
};

export const getRaidLabel = (tier: string, level: string): string => {
    const tierLabel: string = tier === '9999' ? 'Master Tier ⦁ ' : tier;
    return tierLabel + ' ' + level;
};
