import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { ContactsViewModule } from '@contacts/contacts.view-module';
import { delay, map, tap } from 'rxjs';
import { ExpensesViewModule } from '@expenses/expenses.view-module';
import { HomeViewModule } from '@home/home.view-module';
import { NotificationService } from '@core/services/notification/notification.service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        ContactsViewModule,
        ExpensesViewModule,
        HomeViewModule,
        RouterOutlet,
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    private platformId = inject(PLATFORM_ID);
    private notificationService = inject(NotificationService);
    private router = inject(Router);

    $notification = this.notificationService.$notification;
    $emptyNotificationClass = this.$notification.pipe(
        delay(this.isBrowser() ? 3000 : 0),
        map(() => true),
        tap(() => setTimeout(() => this.notificationService.empty(), 300)),
    );

    menuItems = [
        {
            icon: 'home.png',
            label: 'Accueil',
            link: '/home',
        },
        {
            icon: 'expenses.png',
            label: 'Dépenses',
            link: '/expenses',
        },
        {
            icon: 'groups.png',
            label: 'Groupes',
            link: '/groups',
        },
        {
            icon: 'contacts.png',
            label: 'Contacts',
            link: '/contacts',
        },
    ];

    isAnyRouteSelected(): boolean {
        return this.router.routerState.snapshot.url.length > 1;
    }

    isCurrentRouteSelected(link: string): boolean {
        return this.router.routerState.snapshot.url.includes(link);
    }

    private isBrowser(): boolean {
        return isPlatformBrowser(this.platformId);
    }
}
