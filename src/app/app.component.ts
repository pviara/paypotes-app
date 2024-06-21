import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ContactsViewModule } from '@contacts/contacts.view-module';
import { CoreModule } from '@core/core.module';
import { ExpensesViewModule } from '@expenses/expenses.view-module';
import { HomeViewModule } from '@home/home.view-module';
import { NotificationService } from '@core/services/notification/notification.service';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        CoreModule,
        ContactsViewModule,
        ExpensesViewModule,
        HomeViewModule,
        RouterOutlet,
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    private notificationService = inject(NotificationService);

    $notification = this.notificationService.$notification;
}
