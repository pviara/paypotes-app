import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [GroupsComponent],
    exports: [GroupsComponent],
    imports: [CommonModule],
})
export class GroupsComponentModule {}
