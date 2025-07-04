import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AppNotificationComponent } from 'src/app/notification/app-notification.component';
import { AppMenuComponentModule } from 'src/app/menu/app-menu-component.module';
import {
    AuthServiceProvider,
    AuthServiceToken,
} from '@core/services/auth/auth.api-service.provider';
import { Component, inject, OnInit } from '@angular/core';
import { ContactsViewModule } from '@contacts/contacts.view-module';
import { ExpensesViewModule } from '@expenses/expenses.view-module';
import { filter, switchMap } from 'rxjs';
import { HomeViewModule } from '@home/home.view-module';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        AppMenuComponentModule,
        AppNotificationComponent,
        ContactsViewModule,
        ExpensesViewModule,
        HomeViewModule,
        RouterOutlet,
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [AuthServiceProvider],
})
export class AppComponent implements OnInit {
    private authService = inject(AuthServiceToken);
    private route = inject(ActivatedRoute);

    ngOnInit(): void {
        this.route.queryParams
            .pipe(
                filter(({ token }) => !!token),
                switchMap(({ token }) =>
                    this.authService.getUserFromToken(token),
                ),
            )
            .subscribe();
    }
}
