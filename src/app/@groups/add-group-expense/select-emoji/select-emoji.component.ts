import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject } from '@angular/core';

@Component({
    selector: 'select-emoji',
    templateUrl: './select-emoji.component.html',
    styleUrls: ['./select-emoji.component.scss'],
})
export class SelectEmojiComponent {
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    onButtonClicked(): void {
        this.router.navigate([
            'groups',
            this.getCurrentGroupId(),
            'add-expense',
            'details',
        ]);
    }

    getPreviousRoute(): string {
        const groupId = this.getCurrentGroupId();
        return `/groups/${groupId}/add-expense/balance`;
    }

    private getCurrentGroupId(): string {
        return this.route.snapshot.params['groupId'];
    }
}
