export const generateRandomBalance = (): string => {
    const sign = generateRandomBoolean() ? '-' : '+';
    const amount = (Math.random() * (159 - 3) + 3).toFixed(2);
    return `${sign}${amount.replace('.', ',')}`;
};

const generateRandomBoolean = (): boolean => {
    return Math.random() < 0.5;
};
