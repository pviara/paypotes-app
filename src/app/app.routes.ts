import { HomeComponent } from './home/home.component';
import { LandingComponent } from './landing/landing.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
    }
];
