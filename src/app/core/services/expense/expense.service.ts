import { Expenses } from '../../model/expense/expense';
import { Filters } from '@core/model/expense/filters';
import { Observable } from 'rxjs';

export interface ExpenseService {
    getExpenses(filters: Filters): Observable<Expenses>;
}
