import { AddExpenseDTO } from '@core/services/expense/expense.service';
import { Contact } from '@core/model/contact/contact';
import { Injectable } from '@angular/core';
import { User } from '@core/model/user/user';

@Injectable()
export class AddExpenseFormService {
    balance?: string = '8,50';
    emoji?: string = '🍵';
    name?: string = 'coffejojo';
    isCurrentPayer = false;
    person?: Contact | User = new Contact({
        avatarURL: 'ahmed.png',
        balance: 0,
        firstname: 'Ahmed',
        lastname: 'Benjelloun',
        id: 'id',
    });

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
