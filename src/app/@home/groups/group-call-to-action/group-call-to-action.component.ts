import { Component, inject, input } from '@angular/core';
import { Group } from '@core/model/group/group';
import { Router } from '@angular/router';

@Component({
    selector: 'group-call-to-action',
    templateUrl: './group-call-to-action.component.html',
    styleUrls: ['./group-call-to-action.component.scss'],
})
export class GroupCallToActionComponent {
    private router = inject(Router);

    group = input<Group | null>();

    getGroupRoute(): string {
        return `/groups/${this.group()?.getId()}`;
    }

    redirectToForm(): void {
        this.router.navigate(['groups', 'add']);
    }
}
