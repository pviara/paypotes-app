import { CommonModule } from '@angular/common';
import { GroupComponent } from '@home/groups/group/group.component';
import { GroupsComponent } from '@home/groups/groups.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [GroupComponent, GroupsComponent],
    exports: [GroupsComponent],
    imports: [CommonModule],
})
export class GroupsComponentModule {}
