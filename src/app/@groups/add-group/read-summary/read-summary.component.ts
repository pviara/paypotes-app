import { AuthServiceToken } from '@core/services/auth/auth.api-service.provider';
import { Component, inject } from '@angular/core';
import { Contact, Contacts } from '@core/model/contact/contact';
import { ConfettiService } from '@core/services/confetti/confetti.service';
import { FormService } from '@core/services/form/form.service';
import { GroupServiceToken } from '@core/services/group/group.service.provider';
import { NotificationService } from '@core/services/notification/notification.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { User, Users } from '@core/model/user/user';

@Component({
    selector: 'read-summary',
    templateUrl: './read-summary.component.html',
    styleUrls: ['./read-summary.component.scss'],
})
export class ReadSummaryComponent {
    private authService = inject(AuthServiceToken);
    private confettiService = inject(ConfettiService);
    private formService = inject(FormService);
    private groupService = inject(GroupServiceToken);
    private notificationService = inject(NotificationService);
    private router = inject(Router);

    form = this.formService.injectCurrentForm();

    loading = false;

    addGroup(): void {
        this.confettiService.pan();

        this.changeLoadingStatus();
        const payload = this.form.raw();
        const actorId = this.authService.getSignedInUser().getId();

        this.groupService
            .createGroup({
                emoji: payload['emoji'],
                name: payload['name'],
                userIds: payload['members']
                    .map((member: Contact | User) => member.getId())
                    .concat([actorId]),
            })
            .pipe(
                tap(() => {
                    this.notificationService.notify({
                        type: 'success',
                        message: 'Groupe créé !',
                    });
                    this.router.navigate(['/groups']);
                }),
                tap(() => this.form.clear()),
            )
            .subscribe();
    }

    getMembers(): Array<Contact | User> {
        const actor = this.authService.getSignedInUser();
        if (!actor) throw new Error('No signed in user');
        return this.form
            .getFieldFrom('members')
            .getValue<Contacts | Users>()
            .concat([actor]);
    }

    getEmoji(): string {
        return this.form.getFieldFrom('emoji').getValue<string>();
    }

    getName(): string {
        return this.form.getFieldFrom('name').getValue<string>();
    }

    private changeLoadingStatus(): void {
        this.loading = !this.loading;
    }
}
