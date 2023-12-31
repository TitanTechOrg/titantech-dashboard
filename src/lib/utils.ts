import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatter() {
    return Intl.NumberFormat('en', {
        notation: 'compact',
        maximumFractionDigits: 2,
    });
}

export function percentage(partialValue: number, totalValue: number) {
    return parseFloat(((totalValue / partialValue) * 100).toFixed(2));
}

export const capitaliseFirstLetter = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
