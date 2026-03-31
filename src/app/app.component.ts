import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
import { AppNotificationComponent } from '@app/notification/app-notification.component';
import { AppMenuComponentModule } from '@app/menu/app-menu-component.module';
import { ContactsViewModule } from '@contacts/contacts.view-module';
import { ExpensesViewModule } from '@expenses/expenses.view-module';
import { HomeViewModule } from '@home/home.view-module';
import { RouterOutlet } from '@angular/router';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { Capacitor } from '@capacitor/core';
import { KeyboardControlDirective } from './keyboard-control.directive';

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
        KeyboardControlDirective,
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
    async ngAfterViewInit(): Promise<void> {
        if (Capacitor.getPlatform() !== 'web') {
            await ScreenOrientation.lock({ orientation: 'portrait' });
        }
    }
}
