import { BalanceComponent } from '@shared/components/balance/balance.component';
import { ExplorerComponentModule } from '@shared/components/explorer/explorer.component-module';
import { CommonModule } from '@angular/common';
import { ContactComponent } from '@contacts/contact/contact.component';
import { HeadbarComponent } from '@shared/components/headbar/headbar.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [ContactComponent],
    imports: [
        BalanceComponent,
        ExplorerComponentModule,
        CommonModule,
        HeadbarComponent,
    ],
})
export class ContactComponentModule {}
