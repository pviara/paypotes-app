import { Form } from '@core/model/form/form';
import { InjectionToken, Provider } from '@angular/core';

export const AddExpenseFormToken = new InjectionToken<Form>('AddExpenseForm');
export const AddExpenseFormProvider: Provider = {
    provide: AddExpenseFormToken,
    useClass: Form,
};

export const AddGroupFormToken = new InjectionToken<Form>('AddGroupForm');
export const AddGroupFormProvider: Provider = {
    provide: AddGroupFormToken,
    useClass: Form,
};

export const AddGroupExpenseFormToken = new InjectionToken<Form>(
    'AddGroupExpenseForm',
);
export const AddGroupExpenseFormProvider: Provider = {
    provide: AddGroupExpenseFormToken,
    useClass: Form,
};
