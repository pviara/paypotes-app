import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject } from '@angular/core';

@Component({
    selector: 'fill-details',
    templateUrl: './fill-details.component.html',
    styleUrls: ['./fill-details.component.scss'],
})
export class FillDetailsComponent {
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    getPreviousRoute(): string {
        const groupId = this.getCurrentGroupId();
        return `/groups/${groupId}/add-expense/emoji`;
    }

    onButtonClicked(isCurrentPayer: boolean): void {
        this.router.navigate([
            'groups',
            this.getCurrentGroupId(),
            'add-expense',
            this.getNextPageRoute(isCurrentPayer),
        ]);
    }

    private getCurrentGroupId(): string {
        return this.route.snapshot.params['groupId'];
    }

    private getNextPageRoute(isCurrentPayer: boolean): string {
        return isCurrentPayer ? 'summary' : 'member';
    }
}
