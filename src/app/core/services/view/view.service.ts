import { BehaviorSubject, filter } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ViewType } from '@core/model/view/view';

@Injectable()
export class ViewService {
    private router = inject(Router);

    private viewTitle$ = new BehaviorSubject<string>('');
    private viewType$ = new BehaviorSubject<ViewType | null>(null);

    $viewTitle = this.viewTitle$.asObservable();
    $viewType = this.viewType$.asObservable();

    constructor() {
        this.setTitleAtNavigationChange();
    }

    private setTitleAtNavigationChange(): void {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((_) => {
                let currentRoute = this.router.routerState.snapshot.root;
                while (currentRoute.firstChild) {
                    currentRoute = currentRoute.firstChild;
                }

                const { data, title } = currentRoute;

                if (title) {
                    this.viewTitle$.next(title);
                }

                if (data) {
                    this.viewType$.next(data['type']);
                }
            });
    }
}
