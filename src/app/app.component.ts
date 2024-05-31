import { Component } from '@angular/core';
import { ContactsComponentModule } from '@contacts/contacts.view-module';
import { CoreModule } from '@core/core.module';
import { ExpensesViewModule } from '@expenses/expenses.view-module';
import { HomeViewModule } from '@home/home.view-module';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CoreModule,
        ContactsComponentModule,
        ExpensesViewModule,
        HomeViewModule,
        RouterOutlet,
    ],
    templateUrl: './app.component.html',
})
export class AppComponent {}
