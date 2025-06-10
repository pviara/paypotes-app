import { AddExpenseViewModule } from '@expenses/add-expense/add-expense.view-module';
import { ExpensesComponent } from '@expenses/expenses/expenses.component';
import { ExpensesView } from '@expenses/expenses.view';
import { GroupExpenseViewModule } from '@expenses/group-expense/group-expense.view-module';
import { PairExpenseComponent } from '@expenses/pair-expense/pair-expense.component';
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
                data: { hideMenu: true },
            },
            {
                path: 'pair/:expenseId',
                component: PairExpenseComponent,
                title: 'Dépense',
                data: { hideMenu: true },
            },
            {
                path: 'group',
                loadChildren: importGroupExpenseView(),
                data: { hideMenu: true },
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

function importGroupExpenseView(): () => Promise<
    typeof GroupExpenseViewModule
> {
    return async () => {
        const imported = await import(
            '@expenses/group-expense/group-expense.view-module'
        );
        return imported.GroupExpenseViewModule;
    };
}
