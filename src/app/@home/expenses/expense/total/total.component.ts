import { Component, computed, input } from '@angular/core';

@Component({
    selector: 'total',
    templateUrl: './total.component.html',
    styleUrls: ['./total.component.scss'],
})
export class TotalComponent {
    isClaim = computed(() => !this.isDebt());

    isDebt = input.required<boolean>();

    sign = computed(() => (this.isDebt() ? '-' : '+'));

    total = input.required<string>();

    totalClass = computed(() => ({
        claim: this.isClaim(),
        debt: this.isDebt(),
    }));
}
