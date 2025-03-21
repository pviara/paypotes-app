import {
    ActivatedRouteSnapshot,
    Router,
    RoutesRecognized,
} from '@angular/router';
import { BehaviorSubject, filter, map, tap } from 'rxjs';
import { inject, Injectable } from '@angular/core';

@Injectable()
export class MenuService {
    private router = inject(Router);

    constructor() {
        this.initMenuFloatBehavior();
    }

    $mustDisplayMenu = this.router.events.pipe(
        filter((event) => event instanceof RoutesRecognized),
        map((event) => this.mustDisplayMenuIn(event.state.root)),
    );

    $mustMenuFloat = new BehaviorSubject(false);

    private initMenuFloatBehavior(): void {
        this.router.events
            .pipe(
                filter((event) => event instanceof RoutesRecognized),
                map((event) => event.state.root),
                tap((route) => {
                    this.$mustMenuFloat.next(this.mustMenuFloatIn(route));
                }),
                tap(() => console.log(this.$mustMenuFloat.getValue())),
            )
            .subscribe();
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
}
