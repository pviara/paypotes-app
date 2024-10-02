import { FormControl } from '@angular/forms';
import { User } from '@core/model/user/user';

export type AddExpenseForm = {
    balance: FormControl<string>;
    name: FormControl<string>;
    emoji: FormControl<string>;
    isCurrentPayer: FormControl<boolean>;
    user: FormControl<User | null>;
};

export type AddExpenseFormRawValue = {
    balance: string;
    name: string;
    emoji: string;
    isCurrentPayer: boolean;
    user: User;
};
