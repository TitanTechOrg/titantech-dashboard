import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatter() {
    return Intl.NumberFormat('en', {
        notation: 'compact',
        maximumFractionDigits: 3,
    });
}
