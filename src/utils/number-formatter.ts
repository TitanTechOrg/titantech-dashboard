export const formatter = () => {
    return Intl.NumberFormat('en', {
        notation: 'compact',
        maximumFractionDigits: 2,
    });
};

export const percentage = (partialValue: number, totalValue: number, decimals: number = 2) => {
    return parseFloat(((totalValue / partialValue) * 100).toFixed(decimals));
};
