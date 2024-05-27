export const generateRandomString = (length = 10): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars.at(randomIndex);
    }

    const now = Date.now().toString();
    return `${result}${now.slice(now.length - 3)}`;
};
