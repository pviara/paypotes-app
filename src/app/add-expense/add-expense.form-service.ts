import { Injectable } from '@angular/core';

@Injectable()
export class AddExpenseFormService {
    private balance = '';

    setBalance(balance: string): void {
        this.balance = balance;
    }
}
