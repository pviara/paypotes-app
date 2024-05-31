import { ExpenseAPIService } from '@core/services/expense/expense.api-service';
import { ExpenseService } from '@core/services/expense/expense.service';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { HttpClientServiceToken } from '@core/services/http-client/http-client.service.provider';
import { InjectionToken, Provider } from '@angular/core';

export const ExpenseServiceToken = new InjectionToken<ExpenseService>(
    'ExpenseService',
);

const expenseServiceFactory = (httpClientService: HttpClientService) =>
    new ExpenseAPIService(httpClientService);

export const ExpenseServiceProvider: Provider = {
    provide: ExpenseServiceToken,
    useFactory: expenseServiceFactory,
    deps: [HttpClientServiceToken],
};
