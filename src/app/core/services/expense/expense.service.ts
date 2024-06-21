import { Expense, Expenses } from '@core/model/expense/expense';
import { Filters } from '@core/model/expense/filters';
import { Observable } from 'rxjs';

export interface ExpenseService {
    getExpense(id: string): Observable<Expense>;
    getExpenses(pageIndex?: number, filters?: Filters): Observable<Expenses>;
    getGroupExpenses(
        groupId: string,
        pageIndex?: number,
        filters?: Filters,
    ): Observable<Expenses>;
    payback(id: string): Observable<void>;
}
