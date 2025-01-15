import { ChoseMemberComponent } from '@groups/add-group-expense/chose-member/chose-member.component';
import { CommonModule } from '@angular/common';
import { MemberComponent } from '@groups/add-group-expense/chose-member/member/member.component';
import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ChoseMemberComponent, MemberComponent],
    imports: [CommonModule, HeadbarComponent],
})
export class ChoseMemberComponentModule {}
