import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject } from '@angular/core';

@Component({
    selector: 'set-balance',
    templateUrl: './set-balance.component.html',
    styleUrls: ['./set-balance.component.scss'],
    standalone: false,
})
export class SetBalanceComponent {
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    onButtonClicked(): void {
        this.router.navigate([
            'groups',
            this.getCurrentGroupId(),
            'add-expense',
            'emoji',
        ]);
    }

    getPreviousRoute(): string {
        return `/groups/${this.getCurrentGroupId()}`;
    }

    private getCurrentGroupId(): string {
        return this.route.snapshot.params['groupId'];
    }
}
