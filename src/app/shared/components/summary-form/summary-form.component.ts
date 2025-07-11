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
import { FormContext } from '@core/model/form/form-context';
import { FormService } from '@core/services/form/form.service';
import { GroupServiceToken } from '@core/services/group/group.service.provider';
import { Member } from '@core/model/group/member';
import { Person } from '@core/model/person';

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
    standalone: false,
})
export class SummaryFormComponent {
    private authService = inject(AuthServiceToken);
    private confettiService = inject(ConfettiService);
    private formService = inject(FormService);
    private form = this.formService.injectCurrentForm();
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
                userId: this.getPerson().getId(),
            });
        } else {
            this.buttonClicked.emit({
                balance: formValue['balance'],
                emoji: formValue['emoji'],
                isCurrentPayer: formValue['isCurrentPayer'],
                name: formValue['name'],
                userId: this.getPerson().getId(),
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
        return this.getPerson().getAvatarUrl();
    }

    private getPerson(): Person {
        try {
            return this.form.getFieldFrom('person').getValue<Person>();
        } catch (error: unknown) {
            const user = this.authService.actor;
            if (user) return user;
            throw new Error(
                'User cannot be found when trying to retrieve form person',
            );
        }
    }

    getPersonFullname(): string {
        try {
            const person = this.getPerson();
            return person.getFullName();
        } catch (error: unknown) {
            return '';
        }
    }

    private changeLoadingStatus(): void {
        this.loading = !this.loading;
    }
}
