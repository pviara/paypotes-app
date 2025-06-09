import { AddExpenseViewModule } from '@expenses/add-expense/add-expense.view-module';
import { ExpensesComponent } from '@expenses/expenses/expenses.component';
import { ExpensesView } from '@expenses/expenses.view';
import { GroupExpenseDetailComponent } from '@expenses/group-expense/detail/group-expense-detail.component';
import { PairExpenseComponent } from '@expenses/pair-expense/pair-expense.component';
import { Routes } from '@angular/router';
import { GroupExpenseViewModule } from './group-expense/group-expense.view-module';

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
                component: GroupExpenseDetailComponent,
                loadChildren: importGroupExpenseView(),
                title: 'Dépense de groupe',
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
