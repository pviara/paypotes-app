import { Injectable } from '@angular/core';

@Injectable()
export class AddExpenseViewService {
    private balance = '';

    setBalance(balance: string): void {
        this.balance = balance;
    }
}
