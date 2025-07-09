import { authenticatedGuard } from '@core/guards/authenticated.guard';
import { ContactsViewModule } from '@contacts/contacts.view-module';
import { ExpensesViewModule } from '@expenses/expenses.view-module';
import { GroupsViewModule } from '@groups/groups.view-module';
import { HomeView } from '@home/home.view';
import { LandingView } from '@landing/landing.view';
import { notAuthenticatedGuard } from '@core/guards/not-authenticated.guard';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        component: LandingView,
        data: { hideMenu: true },
        canActivate: [notAuthenticatedGuard],
    },
    {
        path: 'home',
        component: HomeView,
        data: { fixMenu: true },
        canActivate: [authenticatedGuard],
    },
    {
        path: 'contacts',
        loadChildren: importContactsView(),
        canActivateChild: [authenticatedGuard],
    },
    {
        path: 'expenses',
        loadChildren: importExpensesView(),
        canActivateChild: [authenticatedGuard],
    },
    {
        path: 'groups',
        loadChildren: importGroupsView(),
        canActivateChild: [authenticatedGuard],
    },
    {
        path: '**',
        redirectTo: '',
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
