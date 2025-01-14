import { ActivatedRoute, Router } from '@angular/router';
import { AddExpenseFormServiceToken } from '@core/services/form/form.service.provider';
import { Component, inject } from '@angular/core';
import {
    GroupServiceProvider,
    GroupServiceToken,
} from '@core/services/group/group.service.provider';
import { HttpClientServiceProvider } from '@core/services/http-client/http-client.service.provider';
import { QueryServiceProvider } from '@core/services/query/query.service.provider';
import { switchMap } from 'rxjs';
import { User } from '@core/model/user/user';

@Component({
    selector: 'chose-member',
    templateUrl: './chose-member.component.html',
    styleUrls: ['./chose-member.component.scss'],
    providers: [
        GroupServiceProvider,
        HttpClientServiceProvider,
        QueryServiceProvider,
    ],
})
export class ChoseMemberComponent {
    private groupService = inject(GroupServiceToken);
    private form = inject(AddExpenseFormServiceToken);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    private label = 'member';

    $members = this.route.params.pipe(
        switchMap((params) =>
            this.groupService.getMembersOf(params['groupId']),
        ),
    );

    getPreviousRoute(): string {
        const groupId = this.getCurrentGroupId();
        return `/groups/${groupId}/add-expense/details`;
    }

    isLastFrom(users: User[], index: number): boolean {
        return index === users.length - 1;
    }

    onMemberSelected(user: User): void {
        this.form.getFieldFrom(this.label).setValue(user);
        this.router.navigate(['expenses', 'add', 'summary']);
    }

    private getCurrentGroupId(): string {
        return this.route.snapshot.params['groupId'];
    }
}
