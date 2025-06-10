import { GroupExpenseDetailComponent } from '@expenses/group-expense/detail/group-expense-detail.component';
import { Routes } from '@angular/router';
import { GroupExpenseChoseMembersComponent } from './chose-members/group-expense-chose-members.component';

export const groupExpenseRoutes: Routes = [
    {
        path: ':expenseId/detail',
        component: GroupExpenseDetailComponent,
        title: 'Dépense de groupe',
    },
    {
        path: ':expenseId/members',
        component: GroupExpenseChoseMembersComponent,
        title: 'Dépense de groupe',
    },
];
