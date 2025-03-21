import { ChoseMemberComponent } from '@groups/add-group-expense/chose-member/chose-member.component';
import { CommonModule } from '@angular/common';
import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { NgModule } from '@angular/core';
import { SelectorFormComponentModule } from '@shared/components/selector-form/selector-form.component-module';

@NgModule({
    declarations: [ChoseMemberComponent],
    imports: [CommonModule, HeadbarComponent, SelectorFormComponentModule],
})
export class ChoseMemberComponentModule {}
