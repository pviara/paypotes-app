import { beforeEach, describe, expect, it } from 'vitest';
import { EmojiFinder } from './emoji-finder';

describe('EmojiFinder', () => {
    let sut: EmojiFinder;

    beforeEach(() => {
        sut = new EmojiFinder();
    });

    it.each([
        [['foot', 'balle', 'rond'], '⚽'],
        [['basket', 'balle', 'rond'], '🏀'],
        [['us'], '🏉'],
    ])('should find matching emojis for given keywords', (keywords, emoji) => {
        for (const keyword of keywords) {
            const result = sut.filterFor(keyword);
            expect(result).toContain(emoji);
        }
    });
});
