import { addGroupRoutes } from '@groups/add-group/add-group.routes';
import { AddGroupView } from '@groups/add-group/add-group.view';
import { ChoseContactsComponentModule } from '@groups/add-group/chose-contacts/chose-contacts.component-module';
import { FillDetailsComponentModule } from '@groups/add-group/fill-details/fill-details.component-module';
import { MembersComponentModule } from '@groups/add-group/members/members.component-module';
import { NgModule } from '@angular/core';
import { ReadSummaryComponentModule } from '@groups/add-group/read-summary/read-summary.component-module';
import { RouterModule } from '@angular/router';
import { SelectEmojiComponentModule } from '@groups/add-group/select-emoji/select-emoji.component-module';
import { SelectPersonsComponentModule } from '@groups/add-group/select-persons/select-persons.component-module';
import { FormService } from '@core/services/form/form.service';
import { AddGroupFormToken } from '@core/services/form/form.provider';
import { ServicesModule } from '@core/services/services.module';

@NgModule({
    declarations: [AddGroupView],
    imports: [
        ChoseContactsComponentModule,
        FillDetailsComponentModule,
        MembersComponentModule,
        ReadSummaryComponentModule,
        RouterModule.forChild(addGroupRoutes),
        SelectEmojiComponentModule,
        SelectPersonsComponentModule,
        ServicesModule,
    ],
})
export class AddGroupViewModule {
    constructor(private formService: FormService) {
        this.formService.use(AddGroupFormToken);
    }
}
