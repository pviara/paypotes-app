import { Filters } from '@core/model/filters/filters';
import { GroupExpense } from '@core/model/expense/group-expense';
import { PairExpense, PairExpenses } from '@core/model/expense/pair-expense';
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
    getExpense(id: string): Observable<GroupExpense | PairExpense>;
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
    paybackGroupExpense(
        groupId: string,
        expenseId: string,
        debtorIds: Array<string>,
    ): Observable<void>;
}
