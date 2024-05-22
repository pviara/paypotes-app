import { ExpenseServiceProvider } from './services/expense/expense.service.provider';
import { GroupServiceProvider } from './services/group/group.service.provider';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientServiceProvider } from './services/http-client/http-client.service.provider';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [HttpClientModule],
    providers: [
        ExpenseServiceProvider,
        HttpClientServiceProvider,
        GroupServiceProvider,
    ],
})
export class CoreModule {}
