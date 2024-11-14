import { AddExpenseViewModule } from '@expenses/add-expense/add-expense.view-module';
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
                path: 'add',
                loadChildren: importAddExpenseView(),
            },
            {
                path: ':expenseId',
                component: ExpenseComponent,
                title: 'Dépense',
            },
        ],
    },
];

function importAddExpenseView(): () => Promise<typeof AddExpenseViewModule> {
    return async () => {
        const imported = await import(
            '@expenses/add-expense/add-expense.view-module'
        );
        return imported.AddExpenseViewModule;
    };
}
