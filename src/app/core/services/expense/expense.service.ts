import { Filters } from '@core/model/filters/filters';
import { GroupExpense, GroupExpenses } from '@core/model/expense/group-expense';
import { Observable } from 'rxjs';
import { PairExpense, PairExpenses } from '@core/model/expense/pair-expense';

export type AddGroupExpenseDTO = {
    balance: string;
    name: string;
    emoji: string;
    memberId: string;
    groupId: string;
};

export type AddPairExpenseDTO = {
    balance: string;
    label: string;
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
    ): Observable<(GroupExpense | PairExpense)[]>;
    getGroupExpenses(
        groupId: string,
        pageIndex?: number,
        filters?: Filters,
    ): Observable<GroupExpenses>;
    paybackPairExpense(contactId: string, expenseId: string): Observable<void>;
    paybackGroupExpense(
        groupId: string,
        expenseId: string,
        debtorIds: Array<string>,
    ): Observable<void>;
}
