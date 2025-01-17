import { Injectable, InjectionToken } from '@angular/core';
import { Form } from '@core/model/form/form';

@Injectable({ providedIn: 'root' })
export class FormService {
    private currentFormToken: InjectionToken<Form> | null = null;

    getUsedForm(): InjectionToken<Form> {
        if (!this.currentFormToken) {
            throw new Error('No form is being used');
        }
        return this.currentFormToken;
    }

    use(formToken: InjectionToken<Form>): void {
        this.currentFormToken = formToken;
    }
}
