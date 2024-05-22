import { CommonModule } from '@angular/common';
import { GroupComponent } from './group/group.component';
import { GroupsComponent } from './groups.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [GroupComponent, GroupsComponent],
    exports: [GroupsComponent],
    imports: [CommonModule],
})
export class GroupsComponentModule {}
