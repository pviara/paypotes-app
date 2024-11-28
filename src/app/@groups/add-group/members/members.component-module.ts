import { HeadbarComponent } from '@shared/headbar/headbar.component';
import { MembersComponent } from './members.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [MembersComponent],
    imports: [HeadbarComponent],
})
export class MembersComponentModule {}
