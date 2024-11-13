import { Injectable } from '@angular/core';

@Injectable()
export class AddExpenseFormService {
    private readonly steps = [
        'balance',
        'emoji',
        'details',
        'person',
        'contact',
        'summary',
    ];

    private balance = '';
    private emoji = '';

    setBalance(balance: string): void {
        this.balance = balance;
    }

    setEmoji(emoji: string) {
        this.emoji = emoji;
    }
}
