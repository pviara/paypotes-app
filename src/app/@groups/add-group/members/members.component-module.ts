import { ButtonComponent } from '@shared/components/button/button.component';
import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { MemberComponent } from '@groups/add-group/members/member/member.component';
import { MembersComponent } from './members.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [MemberComponent, MembersComponent],
    imports: [ButtonComponent, HeadbarComponent, ButtonComponent],
})
export class MembersComponentModule {}
