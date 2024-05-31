import { ExpensesComponent } from '@expenses/expenses/expenses.component';
import { ExpensesViewComponent } from '@expenses/expenses.view-component';
import { Routes } from '@angular/router';
import { ViewType } from '@core/model/view/view';

export const expensesRoutes: Routes = [
    {
        path: '',
        component: ExpensesViewComponent,
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
