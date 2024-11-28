import { ButtonComponent } from '@shared/button/button.component';
import { HeadbarComponent } from '@shared/headbar/headbar.component';
import { MembersComponent } from './members.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [MembersComponent],
    imports: [ButtonComponent, HeadbarComponent, ButtonComponent],
})
export class MembersComponentModule {}
