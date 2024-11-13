import { AddExpenseDTO } from '@core/services/expense/expense.service';
import { Contact } from '@core/model/contact/contact';
import { Injectable } from '@angular/core';
import { User } from '@core/model/user/user';

@Injectable()
export class AddExpenseFormService {
    private balance?: string;
    private emoji?: string;
    private name?: string;
    private isCurrentPayer = false;
    private person?: Contact | User;

    extractPayload(): AddExpenseDTO {
        if (!this.balance || !this.emoji || !this.name || !this.person) {
            throw new Error('Fields are not all fulfilled');
        }

        return {
            balance: this.balance,
            emoji: this.emoji,
            name: this.name,
            isCurrentPayer: this.isCurrentPayer,
            userId: 'userId',
        };
    }

    setBalance(balance: string): void {
        this.balance = balance;
    }

    setEmoji(emoji: string): void {
        this.emoji = emoji;
    }

    setName(name: string): void {
        this.name = name;
    }

    setIsCurrentPayer(isCurrentPayer: boolean): void {
        this.isCurrentPayer = isCurrentPayer;
    }

    setPerson(person: Contact | User): void {
        this.person = person;
    }
}
