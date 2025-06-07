import { ActivatedRoute, Router } from '@angular/router';
import { AddGroupExpenseFormToken } from '@core/services/form/form.provider';
import { Component, inject, OnInit } from '@angular/core';
import { GroupServiceToken } from '@core/services/group/group.service.provider';
import { MembersV2, MemberV2 } from '@core/model/group/v2/member';
import { User } from '@core/model/user/user';
import { Contact } from '@core/model/contact/contact';

@Component({
    selector: 'chose-member',
    templateUrl: './chose-member.component.html',
    styleUrls: ['./chose-member.component.scss'],
})
export class ChoseMemberComponent implements OnInit {
    private groupService = inject(GroupServiceToken);
    private form = inject(AddGroupExpenseFormToken);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    private label = 'person';

    members =
        this.groupService.getLastFetchedGroup()?.getMembers() ??
        ([] as MembersV2);

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

    onPersonSelected(person: Contact | MemberV2): void {
        this.form.getFieldFrom(this.label).setValue(person);
        this.router.navigate([
            'groups',
            this.getCurrentGroupId(),
            'add-expense',
            'summary',
        ]);
    }

    private addFormField(): void {
        this.form.addField({ label: this.label, value: '' });
    }

    private getCurrentGroupId(): string {
        return this.route.snapshot.params['groupId'];
    }
}
