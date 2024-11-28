import { AddGroupFormService } from '@groups/add-group/add-group.form-service';
import { addGroupRoutes } from '@groups/add-group/add-group.routes';
import { AddGroupView } from '@groups/add-group/add-group.view';
import { FillDetailsComponentModule } from '@groups/add-group/fill-details/fill-details.component-module';
import { MembersComponentModule } from '@groups/add-group/members/members.component-module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SelectEmojiComponentModule } from '@groups/add-group/select-emoji/select-emoji.component-module';

@NgModule({
    declarations: [AddGroupView],
    imports: [
        FillDetailsComponentModule,
        MembersComponentModule,
        RouterModule.forChild(addGroupRoutes),
        SelectEmojiComponentModule,
    ],
    providers: [AddGroupFormService],
})
export class AddGroupViewModule {}
