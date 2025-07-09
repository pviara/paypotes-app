import {
    AddExpenseFormProvider,
    AddGroupExpenseFormProvider,
    AddGroupFormProvider,
    PaybackGroupExpenseFormProvider,
} from '@core/services/form/form.provider';
import { AuthServiceProvider } from '@core/services/auth/auth.api-service.provider';
import { ContactServiceProvider } from '@core/services/contact/contact.api-service.provider';
import { ExpenseServiceProvider } from '@core/services/expense/expense.service.provider';
import { FormService } from '@core/services/form/form.service';
import { GroupServiceProvider } from '@core/services/group/group.service.provider';
import { HttpClientServiceProvider } from '@core/services/http-client/http-client.service.provider';
import { MenuService } from '@core/services/menu/menu.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { routes } from 'src/app/app.routes';
import { QueryServiceProvider } from '@core/services/query/query.service.provider';
import { UserServiceProvider } from '@core/services/user/user.api-service.provider';
import { ApplicationConfig, isDevMode } from '@angular/core';

export const appConfig: ApplicationConfig = {
    providers: [
        AuthServiceProvider,
        ContactServiceProvider,
        ExpenseServiceProvider,
        AddExpenseFormProvider,
        AddGroupExpenseFormProvider,
        AddGroupFormProvider,
        FormService,
        GroupServiceProvider,
        HttpClientServiceProvider,
        MenuService,
        PaybackGroupExpenseFormProvider,
        provideHttpClient(withFetch()),
        provideRouter(routes),
        provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000',
        }),
        QueryServiceProvider,
        UserServiceProvider,
    ],
};
