export const getRandomAvatarUrl = (): string => {
    const avatars = [
        'ahmed.png',
        'claire.png',
        'claire.png',
        'estelle.png',
        'valentin.png',
    ];
    return avatars[Math.floor(Math.random() * avatars.length)];
};
