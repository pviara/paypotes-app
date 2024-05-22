import { ExpensesViewComponent } from '@expenses/expenses.view-component';
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
        component: ExpensesViewComponent,
    },
];
