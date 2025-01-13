import { ActivatedRoute, Router } from '@angular/router';
import { BalanceFormatter } from './model/balance-formatter';
import { Component, inject, OnInit } from '@angular/core';
import { AddExpenseFormServiceToken } from '@core/services/form/form.service.provider';

@Component({
    selector: 'set-balance',
    templateUrl: './set-balance.component.html',
    styleUrls: ['./set-balance.component.scss'],
})
export class SetBalanceComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    form = inject(AddExpenseFormServiceToken);

    label = 'balance';
    formatter = new BalanceFormatter();

    ngOnInit(): void {
        if (!this.form.exist(this.label)) {
            this.addFormField();
        }
    }

    onButtonClicked(): void {
        if (this.form.valid(this.label)) {
            this.router.navigate([
                'groups',
                this.getCurrentGroupId(),
                'add-expense',
                'emoji',
            ]);
        }
    }

    onKeyClicked(key: string): void {
        this.formatter.append(key);
        const balance = this.formatter.getBalance();

        this.form.setField({ label: this.label, value: balance });
    }

    getPreviousRoute(): string {
        const groupId = this.getCurrentGroupId();
        return `/groups/${groupId}`;
    }

    private getCurrentGroupId(): string {
        return this.route.snapshot.params['groupId'];
    }

    private addFormField(): void {
        const VALID_BALANCE_RANGE_REGEXP = /^(?:\d{1,2}|\d{1,2},\d{1,2})$/;
        this.form.addField({
            label: this.label,
            value: '',
            validators: [VALID_BALANCE_RANGE_REGEXP],
        });
    }
}
