import { BehaviorSubject, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Notification } from '@core/model/notification/notification';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private notification$ = new BehaviorSubject<Notification | null>(null);

    $notification = this.notification$.asObservable();

    notify(notification: Notification): void {
        this.notification$.next(notification);
    }

    empty(): void {
        this.notification$.next(null);
    }
}
