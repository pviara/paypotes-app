import { AppNotificationComponent } from 'src/app/notification/app-notification.component';
import { AppMenuComponentModule } from 'src/app/menu/app-menu-component.module';
import { Component } from '@angular/core';
import { ContactsViewModule } from '@contacts/contacts.view-module';
import { ExpensesViewModule } from '@expenses/expenses.view-module';
import { HomeViewModule } from '@home/home.view-module';
import { RouterOutlet } from '@angular/router';

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
})
export class AppComponent {}
