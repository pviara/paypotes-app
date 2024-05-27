import { ExpenseServiceProvider } from '@core/services/expense/expense.service.provider';
import { GroupServiceProvider } from '@core/services/group/group.service.provider';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientServiceProvider } from '@core/services/http-client/http-client.service.provider';
import { HttpInterceptorProvider } from '@core/interceptors/fake.http-interceptor.provider';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [HttpClientModule],
    providers: [
        ExpenseServiceProvider,
        HttpClientServiceProvider,
        GroupServiceProvider,
        HttpInterceptorProvider,
    ],
})
export class CoreModule {}
