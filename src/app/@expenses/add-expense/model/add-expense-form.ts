import { FormControl } from '@angular/forms';

export type AddExpenseForm = {
    balance: FormControl<string>;
    name: FormControl<string>;
    isCurrentPayer: FormControl<boolean>;
};
