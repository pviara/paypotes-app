import { Component, computed, input } from '@angular/core';

@Component({
    selector: 'balance',
    templateUrl: './total.component.html',
    styleUrls: ['./total.component.scss'],
})
export class TotalComponent {
    isClaim = computed(() => !this.isDebt());

    isDebt = input.required<boolean>();

    sign = computed(() => (this.isDebt() ? '-' : '+'));

    balance = input.required<string>();

    balanceClass = computed(() => ({
        claim: this.isClaim(),
        debt: this.isDebt(),
    }));
}
