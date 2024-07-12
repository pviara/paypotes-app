import { ExpenseComponent } from '@expenses/expense/expense.component';
import { ExpensesComponent } from '@expenses/expenses/expenses.component';
import { ExpensesView } from '@expenses/expenses.view';
import { Routes } from '@angular/router';

export const expensesRoutes: Routes = [
    {
        path: '',
        component: ExpensesView,
        children: [
            {
                path: '',
                component: ExpensesComponent,
                title: 'Dépenses',
            },
            {
                path: ':expenseId',
                component: ExpenseComponent,
                title: 'Dépense',
            },
        ],
    },
];
