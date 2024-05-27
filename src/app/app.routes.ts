import { ContactsViewComponentModule } from '@contacts/contacts.view-component-module';
import { ExpensesViewComponentModule } from '@expenses/expenses.view-component-module';
import { HomeViewComponent } from '@home/home.view-component';
import { LandingViewComponent } from '@landing/landing.view-component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        component: LandingViewComponent,
    },
    {
        path: 'home',
        component: HomeViewComponent,
    },
    {
        path: 'expenses',
        loadChildren: importExpensesView(),
    },
    {
        path: 'contacts',
        loadChildren: importContactsView(),
    },
];

function importExpensesView(): () => Promise<
    typeof ExpensesViewComponentModule
> {
    return async () => {
        const imported = await import(
            '@expenses/expenses.view-component-module'
        );
        return imported.ExpensesViewComponentModule;
    };
}

function importContactsView(): () => Promise<
    typeof ContactsViewComponentModule
> {
    return async () => {
        const imported = await import(
            '@contacts/contacts.view-component-module'
        );
        return imported.ContactsViewComponentModule;
    };
}
