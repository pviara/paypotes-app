import { ActivatedRoute, Router } from '@angular/router';
import { AddGroupExpenseFormToken } from '@core/services/form/form.provider';
import { AuthServiceToken } from '@core/services/auth/auth.api-service.provider';
import { Component, inject, OnInit } from '@angular/core';
import { Contact } from '@core/model/contact/contact';
import { GroupServiceToken } from '@core/services/group/group.service.provider';
import { Members, Member } from '@core/model/group/member';
import { User } from '@core/model/user/user';
import { GroupWithBalance } from '@core/model/group/group-with-balance';

@Component({
    selector: 'chose-member',
    templateUrl: './chose-member.component.html',
    styleUrls: ['./chose-member.component.scss'],
})
export class ChoseMemberComponent implements OnInit {
    private authService = inject(AuthServiceToken);
    private groupService = inject(GroupServiceToken);
    private form = inject(AddGroupExpenseFormToken);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    private label = 'person';

    members = this.getMembers();

    ngOnInit(): void {
        if (!this.form.exist(this.label)) {
            this.addFormField();
        }
    }

    getPreviousRoute(): string {
        const groupId = this.getCurrentGroupId();
        return `/groups/${groupId}/add-expense/details`;
    }

    isLastFrom(users: User[], index: number): boolean {
        return index === users.length - 1;
    }

    onPersonSelected(person: Contact | Member): void {
        this.form.getFieldFrom(this.label).setValue(person);
        this.router.navigate([
            'groups',
            this.getCurrentGroupId(),
            'add-expense',
            'summary',
        ]);
    }

    private getMembers(): Members {
        const group = this.groupService.getLastFetchedGroup();
        if (group) return this.getMembersExcludingActor(group);
        return [];
    }

    private getMembersExcludingActor(group: GroupWithBalance): Members {
        const actorId = this.authService.getSignedInUser().getId();
        return group.getMembersExcluding(actorId);
    }

    private addFormField(): void {
        this.form.addField({ label: this.label, value: '' });
    }

    private getCurrentGroupId(): string {
        return this.route.snapshot.params['groupId'];
    }
}
