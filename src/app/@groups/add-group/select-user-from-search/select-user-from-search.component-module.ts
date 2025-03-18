import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { SelectUserFromSearchComponent } from '@groups/add-group/select-user-from-search/select-user-from-search';

@NgModule({
    declarations: [SelectUserFromSearchComponent],
    imports: [HeadbarComponent],
})
export class SelectUserFromSearchComponentModule {}
