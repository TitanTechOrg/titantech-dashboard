import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

const formatter = () => {
    return Intl.NumberFormat('en', {
        notation: 'compact',
        maximumFractionDigits: 2,
    });
};

const percentage = (partialValue: number, totalValue: number) => {
    return parseFloat(((totalValue / partialValue) * 100).toFixed(2));
};

const capitaliseFirstLetter = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

const getRaidLabel = (tier: string, level: string): string => {
    const tierLabel: string = tier === '9999' ? 'Master Tier ⦁ ' : tier;
    return tierLabel + ' ' + level;
};

export { cn, formatter, percentage, capitaliseFirstLetter, getRaidLabel };
