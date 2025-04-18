import { AuthServiceToken } from '@core/services/auth/auth.api-service.provider';
import { Component, inject } from '@angular/core';
import { ConfettiService } from '@core/services/confetti/confetti.service';
import { Contact } from '@core/model/contact/contact';
import { AddGroupFormToken } from '@core/services/form/form.provider';
import { HttpClientServiceProvider } from '@core/services/http-client/http-client.service.provider';
import { NotificationService } from '@core/services/notification/notification.service';
import { QueryServiceProvider } from '@core/services/query/query.service.provider';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { User } from '@core/model/user/user';
import {
    GroupServiceProvider,
    GroupServiceToken,
} from '@core/services/group/group.service.provider';

@Component({
    selector: 'read-summary',
    templateUrl: './read-summary.component.html',
    styleUrls: ['./read-summary.component.scss'],
    providers: [
        GroupServiceProvider,
        HttpClientServiceProvider,
        QueryServiceProvider,
    ],
})
export class ReadSummaryComponent {
    private authService = inject(AuthServiceToken);
    private confettiService = inject(ConfettiService);
    private groupService = inject(GroupServiceToken);
    private notificationService = inject(NotificationService);
    private router = inject(Router);
    form = inject(AddGroupFormToken);

    loading = false;

    addGroup(): void {
        this.confettiService.pan();

        this.changeLoadingStatus();
        const payload = this.form.raw();
        this.groupService
            .addGroup({
                emoji: payload['emoji'],
                name: payload['name'],
                memberIds: payload['members'].map((member: Contact | User) =>
                    member.getId(),
                ),
            })
            .pipe(
                tap(() => {
                    this.notificationService.notify({
                        type: 'success',
                        message: 'Groupe créé !',
                    });
                    this.router.navigate(['/groups']);
                }),
            )
            .subscribe();
    }

    getMembers(): Array<Contact | User> {
        const signedInUser = this.authService.signedInUser?.user;
        if (!signedInUser) {
            throw new Error('No signed in user');
        }
        return this.form
            .getFieldFrom('members')
            .getValue<Array<Contact | User>>()
            .concat([signedInUser]);
    }

    getEmoji(): string {
        return (this.form.getFieldFrom('emoji').getValue() as string) || '';
    }

    getName(): string {
        return (this.form.getFieldFrom('name').getValue() as string) || '';
    }

    private changeLoadingStatus(): void {
        this.loading = !this.loading;
    }
}
