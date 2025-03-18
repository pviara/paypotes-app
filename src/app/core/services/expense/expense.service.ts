import { Expense, Expenses } from '@core/model/expense/expense';
import { Filters } from '@core/model/filters/filters';
import { Observable } from 'rxjs';

export type AddGroupExpenseDTO = {
    balance: string;
    name: string;
    emoji: string;
    memberId: string;
    groupId: string;
};

export type AddPairExpenseDTO = {
    balance: string;
    name: string;
    emoji: string;
    isCurrentPayer: boolean;
    userId: string;
};

export interface ExpenseService {
    addGroupExpense(payload: AddGroupExpenseDTO): Observable<void>;
    addPairExpense(payload: AddPairExpenseDTO): Observable<void>;
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
