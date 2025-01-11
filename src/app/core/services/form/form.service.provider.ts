import { Form } from '@core/model/form/form';
import { InjectionToken, Provider } from '@angular/core';

export const AddExpenseFormServiceToken = new InjectionToken<Form>(
    'AddExpenseFormService',
);

export const AddExpenseFormServiceProvider: Provider = {
    provide: AddExpenseFormServiceToken,
    useClass: Form,
};

export const AddGroupExpenseFormServiceToken = new InjectionToken<Form>(
    'AddGroupExpenseFormService',
);

export const AddGroupExpenseFormServiceProvider: Provider = {
    provide: AddGroupExpenseFormServiceToken,
    useClass: Form,
};
