import { Component } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { ExpensesViewComponentModule } from '@expenses/expenses.view-component-module';
import { HomeViewComponentModule } from '@home/home.view-component-module';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CoreModule,
        ExpensesViewComponentModule,
        HomeViewComponentModule,
        RouterOutlet,
    ],
    templateUrl: './app.component.html',
})
export class AppComponent {}
