import { Form } from '@core/model/form/form';
import { InjectionToken, Provider } from '@angular/core';

export const FormServiceToken = new InjectionToken<Form>('FormService');

export const FormServiceProvider: Provider = {
    provide: FormServiceToken,
    useClass: Form,
};
