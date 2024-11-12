import { AddExpenseViewModule } from './add-expense/add-expense.view-module';
import { ContactsViewModule } from '@contacts/contacts.view-module';
import { ExpensesViewModule } from '@expenses/expenses.view-module';
import { GroupsViewModule } from '@groups/groups.view-module';
import { HomeView } from '@home/home.view';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        component: HomeView,
    },
    {
        path: 'contacts',
        loadChildren: importContactsView(),
    },
    {
        path: 'expenses',
        loadChildren: importExpensesView(),
    },
    {
        path: 'groups',
        loadChildren: importGroupsView(),
    },
    {
        path: 'add-expense',
        loadChildren: importAddExpenseView(),
    },
];

function importContactsView(): () => Promise<typeof ContactsViewModule> {
    return async () => {
        const imported = await import('@contacts/contacts.view-module');
        return imported.ContactsViewModule;
    };
}

function importExpensesView(): () => Promise<typeof ExpensesViewModule> {
    return async () => {
        const imported = await import('@expenses/expenses.view-module');
        return imported.ExpensesViewModule;
    };
}

function importGroupsView(): () => Promise<typeof GroupsViewModule> {
    return async () => {
        const imported = await import('@groups/groups.view-module');
        return imported.GroupsViewModule;
    };
}

function importAddExpenseView(): () => Promise<typeof AddExpenseViewModule> {
    return async () => {
        const imported = await import('./add-expense/add-expense.view-module');
        return imported.AddExpenseViewModule;
    };
}
