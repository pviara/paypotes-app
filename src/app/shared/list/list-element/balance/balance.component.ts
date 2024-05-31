import { Component, computed, input } from '@angular/core';

@Component({
    selector: 'balance',
    templateUrl: './balance.component.html',
    styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent {
    isClaim = computed(() => !this.isDebt());

    isDebt = input.required<boolean>();

    sign = computed(() => (this.isDebt() ? '-' : '+'));

    balance = input.required<string>();

    balanceClass = computed(() => ({
        claim: this.isClaim(),
        debt: this.isDebt(),
    }));
}
