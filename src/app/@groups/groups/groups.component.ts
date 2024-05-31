import { BehaviorSubject, tap } from 'rxjs';
import { Component, inject } from '@angular/core';
import { Filters } from '@core/model/expense/filters';
import { Groups } from '@core/model/group/group';
import { GroupServiceToken } from '@core/services/group/group.service.provider';
import { ListElements } from '@core/model/list-element/list-element';

@Component({
    selector: 'groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent {
    private groupService = inject(GroupServiceToken);

    private lastFetchedGroupsCount = 0;

    private nextIndex = 0;

    private savedFilters?: Filters;

    private skeletons: Array<null> = Array.from({ length: 20 }).map(() => null);

    $groups = new BehaviorSubject<ListElements>([]);

    filtering = false;

    ngOnInit(): void {
        this.prepareList();
        this.getGroups();
    }

    onGroupHovered(groupId: string): void {
        if (
            this.isGroupNearListEnd(groupId) &&
            this.lastFetchedGroupsCount === 20
        ) {
            this.addSkeletonsToList();
            this.getNextPageGroups();
        }
    }

    onUpdatedFilters(filters: Filters): void {
        this.filtering = true;
        this.resetNextIndex();
        this.saveFilters(filters);
        this.prepareList();

        this.groupService
            .getGroups(this.nextIndex, filters)
            .subscribe((groups) => {
                this.$groups.next(groups);
                this.filtering = false;
            });
    }

    private prepareList(): void {
        this.emptyList();
        this.addSkeletonsToList();
    }

    private addSkeletonsToList(): void {
        const newGroups = this.$groups.getValue().concat(this.skeletons);
        this.$groups.next(newGroups);
    }

    private getGroups(): void {
        this.groupService
            .getGroups(this.nextIndex, this.savedFilters)
            .pipe(
                tap((groups) => (this.lastFetchedGroupsCount = groups.length)),
            )
            .subscribe(this.appendGroupsToList());
    }

    private getNextPageGroups(): void {
        this.nextIndex++;
        this.getGroups();
    }

    private appendGroupsToList(): (groups: Groups) => void {
        return (newGroups: Groups) => {
            let groups = this.$groups.getValue().filter((group) => !!group);
            groups = groups.concat(newGroups);
            this.$groups.next(groups);
        };
    }

    private isGroupNearListEnd(groupId: string): boolean {
        const index = this.findGroupIndexWith(groupId);
        const isNearArrayEnd = index > this.$groups.getValue().length - 10;
        return isNearArrayEnd;
    }

    private findGroupIndexWith(groupId: string): number {
        return this.$groups
            .getValue()
            .findIndex((group) => group?.getId() === groupId);
    }

    private resetNextIndex(): void {
        this.nextIndex = 0;
    }

    private saveFilters(filters: Filters): void {
        this.savedFilters = filters;
    }

    private emptyList(): void {
        this.$groups.next([]);
    }
}
