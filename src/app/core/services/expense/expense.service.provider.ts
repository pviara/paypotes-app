import { ExpenseAPIService } from '@core/services/expense/expense.api-service';
import { ExpenseService } from '@core/services/expense/expense.service';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { HttpClientServiceToken } from '@core/services/http-client/http-client.service.provider';
import { InjectionToken, Provider } from '@angular/core';
import { QueryService } from '@core/services/query/query.service';
import { QueryServiceToken } from '@core/services/query/query.service.provider';

export const ExpenseServiceToken = new InjectionToken<ExpenseService>(
    'ExpenseService',
);

const expenseServiceFactory = (
    httpClientService: HttpClientService,
    queryService: QueryService,
) => new ExpenseAPIService(httpClientService, queryService);

export const ExpenseServiceProvider: Provider = {
    provide: ExpenseServiceToken,
    useFactory: expenseServiceFactory,
    deps: [HttpClientServiceToken, QueryServiceToken],
};
