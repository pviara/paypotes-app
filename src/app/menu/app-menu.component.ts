import { Component, inject } from '@angular/core';
import { MenuService } from '@core/services/menu/menu.service';

export type MenuItem = {
    icon: string;
    label: string;
    link: string;
};

@Component({
    selector: 'app-menu',
    templateUrl: './app-menu.component.html',
    styleUrls: ['./app-menu.component.scss'],
    standalone: false,
})
export class AppMenuComponent {
    menuService = inject(MenuService);

    menuItems: MenuItem[] = [
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
}
