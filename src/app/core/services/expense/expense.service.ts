import { Expenses } from '../../model/expense/expense';
import { Observable } from 'rxjs';

export interface ExpenseService {
    getExpenses(search?: string): Observable<Expenses>;
}
