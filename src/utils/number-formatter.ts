export const formatter = (minimumFractionDigits=1, maximumFractionDigits=1) => {
    return Intl.NumberFormat('en-US', {
        notation: 'compact',
        minimumFractionDigits: minimumFractionDigits,
        maximumFractionDigits: maximumFractionDigits,
    });
};

export const percentage = (partialValue: number, totalValue: number, decimals: number = 2) => {
    return parseFloat(((totalValue / partialValue) * 100).toFixed(decimals));
};

const SI_SYMBOL = ['', 'K', 'M', 'B'] as const;

export const abbreviateNumber = (number: number) => {
    // what tier? (determines SI symbol)
    const tier = (Math.log10(Math.abs(number)) / 3) | 0;

    // if zero, we don't need a suffix
    if (tier == 0) return number;

    // get suffix and determine scale
    const suffix = SI_SYMBOL[tier];
    const scale = Math.pow(10, tier * 3);

    // scale the number
    const scaled = number / scale;

    // format number and add suffix
    return [scaled.toFixed(2), suffix];
};
