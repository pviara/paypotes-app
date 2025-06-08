export const generateRandomName = (): {
    firstname: string;
    lastname: string;
} => {
    const firstnames = [
        'Alice',
        'Bob',
        'Charlie',
        'David',
        'Emma',
        'Fiona',
        'George',
        'Hannah',
    ];
    const lastnames = [
        'Smith',
        'Johnson',
        'Williams',
        'Brown',
        'Jones',
        'Garcia',
        'Miller',
        'Davis',
    ];

    const firstname = firstnames[Math.floor(Math.random() * firstnames.length)];
    const lastname = lastnames[Math.floor(Math.random() * lastnames.length)];

    return { firstname, lastname };
};
