import { FormControl } from '@angular/forms';

export type AddExpenseForm = {
    balance: FormControl<string>;
    name: FormControl<string>;
    emoji: FormControl<string>;
    isCurrentPayer: FormControl<boolean>;
};
