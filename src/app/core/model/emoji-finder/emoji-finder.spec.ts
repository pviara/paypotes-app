import { beforeEach, describe, expect, it } from 'vitest';
import { EmojiFinder } from '@core/model/emoji-finder/emoji-finder';

describe('EmojiFinder', () => {
    let sut: EmojiFinder;

    beforeEach(() => {
        sut = new EmojiFinder();
    });

    it.each([
        [['foot', 'balle', 'rond'], ['⚽']],
        [['basket', 'balle', 'rond'], ['🏀']],
        [['us'], ['🏉']],
    ])('should find matching emojis for given keywords', (keywords, emojis) => {
        for (const keyword of keywords) {
            const returnedEmojis = sut.filterFor(keyword);
            expectToHaveBeenReturnedIn(returnedEmojis, emojis);
        }
    });

    function expectToHaveBeenReturnedIn(
        returnedEmojis: string[],
        emojis: string[],
    ): void {
        const result = emojis.every((emoji) => existsIn(returnedEmojis, emoji));
        expect(result).toBe(true);
    }

    function existsIn(returnedEmojis: string[], emoji: string): boolean {
        return returnedEmojis.some((returnedEmoji) => returnedEmoji === emoji);
    }
});
