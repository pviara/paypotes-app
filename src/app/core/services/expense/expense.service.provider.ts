import { ExpenseAPIService } from './expense.api-service';
import { ExpenseService } from './expense.service';
import { HttpClientService } from '../http-client/http-client.service';
import { HttpClientServiceToken } from '../http-client/http-client.service.provider';
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
