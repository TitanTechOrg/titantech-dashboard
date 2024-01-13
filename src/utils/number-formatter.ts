export const formatter = () => {
    return Intl.NumberFormat('en', {
        notation: 'compact',
        maximumFractionDigits: 2,
    });
};

export const percentage = (partialValue: number, totalValue: number) => {
    return parseFloat(((totalValue / partialValue) * 100).toFixed(2));
};
