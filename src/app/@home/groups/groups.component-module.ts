import { CommonModule } from '@angular/common';
import { GroupCallToActionComponent } from '@home/groups/group-call-to-action/group-call-to-action.component';
import { GroupComponent } from '@home/groups/group/group.component';
import { GroupsComponent } from '@home/groups/groups.component';
import { NgModule } from '@angular/core';
import { SkeletonComponent } from '@home/groups/group/skeleton/skeleton.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        GroupCallToActionComponent,
        GroupComponent,
        GroupsComponent,
        SkeletonComponent,
    ],
    exports: [GroupsComponent],
    imports: [CommonModule, RouterModule],
})
export class GroupsComponentModule {}
