import { ContactsComponentModule } from '@contacts/contacts.view-module';
import { ExpensesViewModule } from '@expenses/expenses.view-module';
import { HomeView } from '@home/home.view';
import { LandingView } from '@landing/landing.view';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        component: LandingView,
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
        path: 'home',
        component: HomeView,
    },
];

function importExpensesView(): () => Promise<typeof ExpensesViewModule> {
    return async () => {
        const imported = await import('@expenses/expenses.view-module');
        return imported.ExpensesViewModule;
    };
}

function importContactsView(): () => Promise<typeof ContactsComponentModule> {
    return async () => {
        const imported = await import('@contacts/contacts.view-module');
        return imported.ContactsComponentModule;
    };
}
