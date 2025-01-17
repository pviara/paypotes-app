import { Injectable, InjectionToken } from '@angular/core';
import { Form } from '@core/model/form/form';

@Injectable()
export class FormService {
    private currentFormToken: InjectionToken<Form> | null = null;

    get currentForm(): InjectionToken<Form> | null {
        return this.currentFormToken;
    }

    set currentForm(value: InjectionToken<Form>) {
        this.currentFormToken = value;
    }
}
