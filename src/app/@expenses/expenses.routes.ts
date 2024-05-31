import { ExpensesComponent } from '@expenses/expenses/expenses.component';
import { ExpensesView } from '@expenses/expenses.view';
import { Routes } from '@angular/router';
import { ViewType } from '@core/model/view/view';

export const expensesRoutes: Routes = [
    {
        path: '',
        component: ExpensesView,
        children: [
            {
                path: '',
                component: ExpensesComponent,
                title: 'Dépenses',
                data: { type: ViewType.List },
            },
        ],
    },
];
