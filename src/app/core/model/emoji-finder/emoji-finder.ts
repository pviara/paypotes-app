import { EMOJIS } from '@core/model/emojis';

export class EmojiFinder {
    private readonly keywords = EMOJIS;

    filterFor(keyword: string): Array<string> {
        const emojis = Object.keys(this.keywords);
        if (!keyword) {
            return emojis;
        }

        return emojis.filter((emoji) => {
            const emojiKeywords = this.keywords[emoji];
            return this.doMatch(keyword, emojiKeywords);
        });
    }

    getAllEmojis(): Array<string> {
        return Object.keys(this.keywords);
    }

    private doMatch(keyword: string, emojiKeywords: Array<string>): boolean {
        return emojiKeywords.some((emojiKeyword) =>
            emojiKeyword.toLowerCase().includes(keyword.toLowerCase()),
        );
    }
}
