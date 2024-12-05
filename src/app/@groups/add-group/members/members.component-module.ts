import { AddMemberButtonComponent } from '@groups/add-group/members/add-member-button/add-member-button.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { MemberComponent } from '@groups/add-group/members/member/member.component';
import { MembersComponent } from './members.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [AddMemberButtonComponent, MemberComponent, MembersComponent],
    imports: [ButtonComponent, HeadbarComponent, RouterModule],
})
export class MembersComponentModule {}
