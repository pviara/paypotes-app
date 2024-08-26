import { Expense, Expenses } from '@core/model/expense/expense';
import { Filters } from '@core/model/filters/filters';
import { Observable } from 'rxjs';

export type AddExpenseDTO = {
    balance: string;
    name: string;
    emoji: string;
    isCurrentPayer: boolean;
    userId: string;
};

export interface ExpenseService {
    addExpense(payload: AddExpenseDTO): Observable<void>;
    getContactExpenses(
        groupId: string,
        pageIndex?: number,
        filters?: Filters,
    ): Observable<Expenses>;
    getExpense(id: string): Observable<Expense>;
    getExpenses(pageIndex?: number, filters?: Filters): Observable<Expenses>;
    getGroupExpenses(
        groupId: string,
        pageIndex?: number,
        filters?: Filters,
    ): Observable<Expenses>;
    payback(id: string): Observable<void>;
}
