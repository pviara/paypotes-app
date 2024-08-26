import { ContactServiceProvider } from '@core/services/contact/contact.api-service.provider';
import { ExpenseServiceProvider } from '@core/services/expense/expense.service.provider';
import { GroupServiceProvider } from '@core/services/group/group.service.provider';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientServiceProvider } from '@core/services/http-client/http-client.service.provider';
import { HttpInterceptorProvider } from '@core/interceptors/fake.http-interceptor.provider';
import { NgModule } from '@angular/core';
import { QueryServiceProvider } from '@core/services/query/query.service.provider';
import { UserServiceProvider } from '@core/services/user/user.api-service.provider';

@NgModule({
    imports: [HttpClientModule],
    providers: [
        ContactServiceProvider,
        ExpenseServiceProvider,
        GroupServiceProvider,
        HttpClientServiceProvider,
        HttpInterceptorProvider,
        QueryServiceProvider,
        UserServiceProvider,
    ],
})
export class CoreModule {}
