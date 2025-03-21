import {
    ActivatedRouteSnapshot,
    Router,
    RoutesRecognized,
} from '@angular/router';
import { filter, map } from 'rxjs';
import { inject, Injectable } from '@angular/core';

@Injectable()
export class MenuService {
    private router = inject(Router);

    $mustDisplayMenu = this.router.events.pipe(
        filter((event) => event instanceof RoutesRecognized),
        map((event) => this.mustDisplayMenuIn(event.state.root)),
    );

    $mustMenuFloat = this.router.events.pipe(
        filter((event) => event instanceof RoutesRecognized),
        map((event) => this.mustMenuFloatIn(event.state.root)),
    );

    private mustDisplayMenuIn(route: ActivatedRouteSnapshot): boolean {
        const { data } = route;
        const hideMenu = data['hideMenu'];

        if (hideMenu) {
            const mustDisplayMenu = !hideMenu;
            return mustDisplayMenu;
        }

        return route.firstChild
            ? this.mustDisplayMenuIn(route.firstChild)
            : true;
    }

    private mustMenuFloatIn(route: ActivatedRouteSnapshot): boolean {
        const { data } = route;
        const fixMenu = data['fixMenu'];

        if (fixMenu) {
            const mustMenuFloat = !fixMenu;
            return mustMenuFloat;
        }

        return route.firstChild ? this.mustMenuFloatIn(route.firstChild) : true;
    }
}
