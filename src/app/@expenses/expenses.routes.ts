import { Routes } from '@angular/router';
import { ExpensesComponent } from '@expenses/expenses/expenses.component';
import { ExpensesViewComponent } from '@expenses/expenses.view-component';

export const expensesRoutes: Routes = [
    {
        path: '',
        component: ExpensesViewComponent,
        children: [
            {
                path: '',
                component: ExpensesComponent,
            },
        ],
    },
];
