export const getRandomEmoji = (): string => {
    const emojis: string[] = [
        '🍔', // Burger
        '🍕', // Pizza
        '🍣', // Sushi
        '🍜', // Ramen
        '🍪', // Cookie
        '🍩', // Donut
        '🍦', // Ice Cream
        '🍷', // Wine
        '🍺', // Beer
        '🍫', // Chocolate
        '🍎', // Apple
        '🍌', // Banana
        '🍒', // Cherries
        '🍇', // Grapes
        '🌮', // Taco
        '🌯', // Burrito
        '🍿', // Popcorn
        '🥗', // Salad
        '🥩', // Steak
        '🍤', // Shrimp
        '🥂', // Champagne
        '🏠', // House
        '🚗', // Car
        '✈️', // Airplane
        '🚅', // Bullet Train
        '🛏️', // Bed
        '🎟️', // Ticket
        '🎉', // Party
        '🎁', // Gift
        '💡', // Light Bulb
        '📱', // Mobile Phone
        '💻', // Laptop
        '📚', // Books
        '🖼️', // Picture
        '🛍️', // Shopping
        '🎮', // Video Game
        '🏋️', // Weightlifting
        '🎵', // Music Note
        '🧳', // Luggage
        '⚽', // Soccer Ball
        '🎨', // Art
    ];

    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
};
