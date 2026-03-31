import { Component, inject, input } from '@angular/core';
import { MenuItem } from '@app/menu/app-menu.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu-item',
    templateUrl: './app-menu-item.component.html',
    styleUrls: ['./app-menu-item.component.scss'],
    standalone: false,
})
export class AppMenuItemComponent {
    private router = inject(Router);

    isFloating = input<boolean | null>(null);

    item = input.required<MenuItem>();

    isCurrentRouteSelected(): boolean {
        return this.router.routerState.snapshot.url.includes(this.item().link);
    }
}
