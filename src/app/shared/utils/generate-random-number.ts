export const generateRandomSmallNumber = (): number => {
    return Math.floor(Math.random() * (7 - 3 + 1)) + 3;
};
