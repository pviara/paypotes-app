import { ChoseContactsComponentModule } from '@groups/add-group/chose-contacts/chose-contacts.component-module';
import { AddGroupFormService } from '@groups/add-group/add-group.form-service';
import { addGroupRoutes } from '@groups/add-group/add-group.routes';
import { AddGroupView } from '@groups/add-group/add-group.view';
import { FillDetailsComponentModule } from '@groups/add-group/fill-details/fill-details.component-module';
import { MembersComponentModule } from '@groups/add-group/members/members.component-module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SelectEmojiComponentModule } from '@groups/add-group/select-emoji/select-emoji.component-module';
import { SelectPersonsComponentModule } from '@groups/add-group/select-persons/select-persons.component-module';

@NgModule({
    declarations: [AddGroupView],
    imports: [
        ChoseContactsComponentModule,
        FillDetailsComponentModule,
        MembersComponentModule,
        RouterModule.forChild(addGroupRoutes),
        SelectEmojiComponentModule,
        SelectPersonsComponentModule,
    ],
    providers: [AddGroupFormService],
})
export class AddGroupViewModule {}
