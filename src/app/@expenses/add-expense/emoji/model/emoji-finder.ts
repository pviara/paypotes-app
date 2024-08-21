import { EMOJIS } from '@core/model/emojis';

export class EmojiFinder {
    private readonly keywords = EMOJIS;

    filterFor(keyword: string): string[] {
        const emojis = Object.keys(this.keywords);
        if (!keyword) {
            return emojis;
        }

        return emojis.filter((emoji) => {
            const emojiKeywords = this.keywords[emoji];
            return this.doMatch(keyword, emojiKeywords);
        });
    }

    private doMatch(keyword: string, emojiKeywords: string[]): boolean {
        return emojiKeywords.some((emojiKeyword) =>
            emojiKeyword.includes(keyword),
        );
    }
}
