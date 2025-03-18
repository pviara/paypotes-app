import { ChoseUserFromSearchComponent } from '@groups/add-group/chose-user-from-search/chose-user-from-search.component';
import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { SelectorFormComponentModule } from '@shared/components/selector-form/selector-form.component-module';

@NgModule({
    declarations: [ChoseUserFromSearchComponent],
    imports: [HeadbarComponent, SelectorFormComponentModule],
})
export class ChoseUserFromSearchComponentModule {}
