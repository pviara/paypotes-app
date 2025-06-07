import { AuthServiceToken } from '@core/services/auth/auth.api-service.provider';
import {
    Component,
    computed,
    EventEmitter,
    inject,
    input,
    Output,
} from '@angular/core';
import { ConfettiService } from '@core/services/confetti/confetti.service';
import { Contact } from '@core/model/contact/contact';
import { Form } from '@core/model/form/form';
import { FormContext } from '@core/model/form/form-context';
import { FormService } from '@core/services/form/form.service';
import { GroupServiceToken } from '@core/services/group/group.service.provider';
import { User } from '@core/model/user/user';
import { MemberV2 } from '@core/model/group/v2/member';

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
    private authService = inject(AuthServiceToken);
    private confettiService = inject(ConfettiService);
    private formService = inject(FormService);
    private form = this.injectCurrentForm();
    private groupService = inject(GroupServiceToken);

    context = input.required<FormContext>();
    currentContextIsExpense = computed(() => this.context() === 'expense');

    loading = false;

    @Output()
    buttonClicked = new EventEmitter<AddExpenseFormValue>();

    onButtonClicked(): void {
        this.confettiService.pan();

        this.changeLoadingStatus();
        const formValue = this.form.raw();

        if (this.currentContextIsExpense()) {
            this.buttonClicked.emit({
                balance: formValue['balance'],
                emoji: formValue['emoji'],
                isCurrentPayer: formValue['isCurrentPayer'],
                name: formValue['name'],
                userId: this.getUserId(),
            });
        } else {
            this.buttonClicked.emit({
                balance: formValue['balance'],
                emoji: formValue['emoji'],
                isCurrentPayer: formValue['isCurrentPayer'],
                name: formValue['name'],
                userId: this.getUserId(),
                groupId: this.groupService.getLastFetchedGroup()?.getId() || '',
            });
        }
    }

    getBalance(): string {
        return this.form.getFieldFrom('balance').getValue<string>();
    }

    getEmoji(): string {
        return this.form.getFieldFrom('emoji').getValue<string>();
    }

    getGroupEmoji(): string {
        return this.currentContextIsExpense()
            ? ''
            : this.groupService.getLastFetchedGroup()?.getEmoji() || '';
    }

    getIsCurrentPayer(): boolean {
        return this.form.getFieldFrom('isCurrentPayer').getValue<boolean>();
    }

    getName(): string {
        return this.form.getFieldFrom('name').getValue<string>();
    }

    getPersonAvatarURL(): string {
        if (this.currentContextIsExpense()) {
            return this.getPerson().getAvatarURL();
        } else {
            if (this.getIsCurrentPayer()) {
                return this.authService.signedInUser?.user.getAvatarURL() || '';
            } else {
                return this.getPerson().getAvatarURL();
            }
        }
    }

    private getPerson(): Contact | User {
        return this.form.getFieldFrom('person').getValue<Contact | User>();
    }

    getPersonFullname(): string {
        try {
            const person = this.form
                .getFieldFrom('person')
                .getValue<Contact | MemberV2>();
            return person instanceof MemberV2 || person instanceof Contact
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
        if (this.getIsCurrentPayer()) {
            return this.authService.signedInUser?.user.getId() || '';
        } else {
            return (
                this.form.getFieldFrom('person').getValue() as User
            ).getId();
        }
    }
}
