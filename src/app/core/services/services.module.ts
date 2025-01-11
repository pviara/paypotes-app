import { ContactServiceProvider } from '@core/services/contact/contact.api-service.provider';
import { ExpenseServiceProvider } from '@core/services/expense/expense.service.provider';
import { AddExpenseFormServiceProvider } from '@core/services/form/form.service.provider';
import { GroupServiceProvider } from '@core/services/group/group.service.provider';
import { HttpClientServiceProvider } from '@core/services/http-client/http-client.service.provider';
import { QueryServiceProvider } from '@core/services/query/query.service.provider';
import { NgModule } from '@angular/core';
import { UserServiceProvider } from '@core/services/user/user.api-service.provider';

@NgModule({
    providers: [
        ContactServiceProvider,
        ExpenseServiceProvider,
        AddExpenseFormServiceProvider,
        GroupServiceProvider,
        HttpClientServiceProvider,
        QueryServiceProvider,
        UserServiceProvider,
    ],
})
export class ServicesModule {}
