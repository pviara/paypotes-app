import { Component, computed, input } from '@angular/core';
import { Contact } from '@core/model/contact/contact';
import { Expense } from '@core/model/expense/expense';
import { generateRandomString } from '@shared/utils/generate-random-string';
import { SkeletonComponent } from '@shared/skeleton/skeleton.component';
import { BalanceComponent } from '@shared/balance/balance.component';

type ListElement = Contact | Expense;

@Component({
    selector: 'list-element',
    templateUrl: './list-element.component.html',
    styleUrls: ['./list-element.component.scss'],
    standalone: true,
    imports: [BalanceComponent, SkeletonComponent], // todo -> move both balance and skeleton inside this folder
})
export class ListElementComponent {
    element = input.required<ListElement | null>();

    elementType = computed(() => {
        const type = {
            isContact: this.element() instanceof Contact,
            isExpense: this.element() instanceof Expense,
        };

        if (type.isContact) {
            return 'contact';
        } else if (type.isExpense) {
            return 'expense';
        }

        return '';
    });

    randomId = generateRandomString();
}
