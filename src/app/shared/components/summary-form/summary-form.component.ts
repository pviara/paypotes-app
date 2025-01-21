import {
    Component,
    computed,
    EventEmitter,
    inject,
    input,
    Output,
} from '@angular/core';
import { Contact } from '@core/model/contact/contact';
import { Form } from '@core/model/form/form';
import { FormContext } from '@core/model/form/form-context';
import { FormService } from '@core/services/form/form.service';
import { User } from '@core/model/user/user';

export type AddGroupExpenseFormValue = {
    balance: string;
    emoji: string;
    isCurrentPayer: boolean;
    name: string;
    userId: string;
    groupId: string;
};

export type AddSingleExpenseFormValue = Omit<
    AddGroupExpenseFormValue,
    'groupId'
>;

export type AddExpenseFormValue =
    | AddGroupExpenseFormValue
    | AddSingleExpenseFormValue;

@Component({
    selector: 'summary-form',
    templateUrl: './summary-form.component.html',
    styleUrls: ['./summary-form.component.scss'],
})
export class SummaryFormComponent {
    private formService = inject(FormService);
    private form = this.injectCurrentForm();

    context = input.required<FormContext>();
    currentContextIsExpense = computed(() => this.context() === 'expense');

    loading = false;

    @Output()
    buttonClicked = new EventEmitter<AddExpenseFormValue>();

    onButtonClicked(): void {
        this.changeLoadingStatus();
        const formValue = this.form.raw();
        this.buttonClicked.emit({
            balance: formValue['balance'],
            emoji: formValue['emoji'],
            isCurrentPayer: formValue['isCurrentPayer'],
            name: formValue['name'],
            userId: this.getUserId(),
        });
    }

    getBalance(): string {
        return this.form.getFieldFrom('balance').getValue<string>();
    }

    getEmoji(): string {
        return this.form.getFieldFrom('emoji').getValue<string>();
    }

    getGroupEmoji(): string {
        return this.currentContextIsExpense() ? '' : '🏕️';
    }

    getIsCurrentPayer(): boolean {
        return this.form.getFieldFrom('isCurrentPayer').getValue<boolean>();
    }

    getName(): string {
        return this.form.getFieldFrom('name').getValue<string>();
    }

    getPersonAvatarURL(): string {
        try {
            const person = this.form
                .getFieldFrom('person')
                .getValue<Contact | User>();
            return person instanceof User || person instanceof Contact
                ? person.getAvatarURL()
                : '';
        } catch (error: unknown) {
            return 'ahmed.png';
        }
    }

    getPersonFullname(): string {
        try {
            const person = this.form
                .getFieldFrom('person')
                .getValue<Contact | User>();
            return person instanceof User || person instanceof Contact
                ? person.getFullName()
                : '';
        } catch (error: unknown) {
            return '';
        }
    }

    private injectCurrentForm(): Form {
        const currentFormToken = this.formService.getUsedForm();
        return inject(currentFormToken);
    }

    private changeLoadingStatus(): void {
        this.loading = !this.loading;
    }

    private getUserId(): string {
        return (this.form.getFieldFrom('person').getValue() as User).getId();
    }
}
