import { BehaviorSubject } from 'rxjs';
import { GroupExpense } from '@core/model/expense/group-expense';
import { Injectable } from '@angular/core';

@Injectable()
export class GroupExpenseViewService {
    $fetchedExpense = new BehaviorSubject<GroupExpense | null>(null);
}
