import { ContactServiceProvider } from '@core/services/contact/contact.api-service.provider';
import { ExpenseServiceProvider } from '@core/services/expense/expense.service.provider';
import { GroupServiceProvider } from '@core/services/group/group.service.provider';
import { HttpClientServiceProvider } from '@core/services/http-client/http-client.service.provider';
import { QueryServiceProvider } from '@core/services/query/query.service.provider';
import { NgModule } from '@angular/core';

@NgModule({
    providers: [
        ContactServiceProvider,
        ExpenseServiceProvider,
        GroupServiceProvider,
        HttpClientServiceProvider,
        QueryServiceProvider,
    ],
})
export class ServicesModule {}
