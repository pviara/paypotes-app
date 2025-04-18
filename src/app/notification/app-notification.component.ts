import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { delay, map, tap } from 'rxjs';
import { NotificationService } from '@core/services/notification/notification.service';

@Component({
    selector: 'app-notification',
    templateUrl: './app-notification.component.html',
    styleUrls: ['./app-notification.component.scss'],
    standalone: true,
    imports: [CommonModule],
})
export class AppNotificationComponent {
    private notificationService = inject(NotificationService);
    private platformId = inject(PLATFORM_ID);

    $notification = this.notificationService.$notification;

    $emptyNotificationClass = this.$notification.pipe(
        delay(this.isBrowser() ? 5000 : 0),
        map(() => true),
        tap(() => setTimeout(() => this.notificationService.empty(), 300)),
    );

    private isBrowser(): boolean {
        return isPlatformBrowser(this.platformId);
    }
}
