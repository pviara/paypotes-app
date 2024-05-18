import { Component, inject } from '@angular/core';
import { delay, tap } from 'rxjs';
import { GroupAPIServiceToken } from '../../core/services/group/group.service.provider';
import { GroupService } from '../../core/services/group/group.service';
import { NgClass } from '@angular/common';

type TemplateClass = NgClass['ngClass'];

@Component({
    selector: 'groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent {
    private groupService = inject<GroupService>(GroupAPIServiceToken);

    groups = this.groupService.groups.pipe(
        delay(1000),
        tap(() => this.stopLoading()),
    );

    loadingClass: TemplateClass = { loading: true };

    private stopLoading(): void {
        this.loadingClass = { loading: false };
    }
}
