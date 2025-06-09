import { GroupExpenseDetailComponent } from '@expenses/group-expense/detail/group-expense-detail.component';
import { Routes } from '@angular/router';

export const groupExpenseRoutes: Routes = [
    {
        path: ':expenseId/detail',
        component: GroupExpenseDetailComponent,
    },
];
