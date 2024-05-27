import { Expenses } from '@core/model/expense/expense';
import { Filters } from '@core/model/expense/filters';
import { Observable } from 'rxjs';

export interface ExpenseService {
    getExpenses(pageIndex?: number, filters?: Filters): Observable<Expenses>;
}
