export function generateRandomDate(): Date {
    return new Date(
        new Date('2022-10-02').getTime() +
            Math.random() *
                (new Date('2024-10-02').getTime() -
                    new Date('2022-10-02').getTime()),
    );
}
