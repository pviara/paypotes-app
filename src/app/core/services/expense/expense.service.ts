import { PairExpense, PairExpenses } from '@core/model/expense/pair-expense';
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
    ): Observable<PairExpenses>;
    getExpense(id: string): Observable<PairExpense>;
    getExpenses(
        pageIndex?: number,
        filters?: Filters,
    ): Observable<PairExpenses>;
    getGroupExpenses(
        groupId: string,
        pageIndex?: number,
        filters?: Filters,
    ): Observable<PairExpenses>;
    paybackPairExpense(contactId: string, expenseId: string): Observable<void>;
}
