import { AddGroupFormService } from '@groups/add-group/add-group.form-service';
import { addGroupRoutes } from '@groups/add-group/add-group.routes';
import { AddGroupView } from '@groups/add-group/add-group.view';
import { FillDetailsComponentModule } from '@groups/add-group/fill-details/fill-details.component-module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [AddGroupView],
    imports: [
        FillDetailsComponentModule,
        RouterModule.forChild(addGroupRoutes),
    ],
    providers: [AddGroupFormService],
})
export class AddGroupViewModule {}
