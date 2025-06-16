import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
    selector: 'balance',
    templateUrl: './balance.component.html',
    styleUrls: ['./balance.component.scss'],
    standalone: true,
    imports: [CommonModule],
})
export class BalanceComponent {
    balance = input<string | null>(null);

    balanceClass = computed(() => ({
        claim: this.isClaim(),
        debt: this.isDebt(),
    }));

    balanceToDisplay = computed(() =>
        this.balance()?.replace('-', '').replace('+', ''),
    );

    isClaim = computed(() => !this.isDebt());

    isDebt = input<boolean | null>(null);

    sign = computed(() => (this.isDebt() ? '-' : '+'));
}
