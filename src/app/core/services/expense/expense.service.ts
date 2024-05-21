import { Expenses } from '../../model/expense/expense';
import { Observable } from 'rxjs';

export interface ExpenseService {
    expenses: Observable<Expenses>;
}
