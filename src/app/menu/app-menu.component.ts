import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MenuService } from '@core/services/menu/menu.service';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './app-menu.component.html',
    styleUrls: ['./app-menu.component.scss'],
    standalone: true,
    imports: [CommonModule, RouterModule],
})
export class AppMenuComponent {
    menuService = inject(MenuService);
    private router = inject(Router);

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

    isCurrentRouteSelected(link: string): boolean {
        return this.router.routerState.snapshot.url.includes(link);
    }
}
