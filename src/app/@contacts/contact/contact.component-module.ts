import { BalanceComponent } from '@shared/balance/balance.component';
import { CommonModule } from '@angular/common';
import { ContactComponent } from '@contacts/contact/contact.component';
import { ExplorerComponentModule } from '@shared/explorer/explorer.component-module';
import { HeadbarComponent } from '@shared/headbar/headbar.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ContactComponent],
    imports: [
        BalanceComponent,
        CommonModule,
        ExplorerComponentModule,
        HeadbarComponent,
    ],
})
export class ContactComponentModule {}
