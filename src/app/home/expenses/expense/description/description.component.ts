import { Component, computed, input } from '@angular/core';
import { Emoji } from '../../../../core/model/expense/emoji';

@Component({
    selector: 'description',
    templateUrl: './description.component.html',
    styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent {
    emoji = input.required<Emoji>();

    label = input.required<string>();

    origin = input.required<string>();

    prefix = computed(() => (this.isDebt() ? 'à' : 'de'));

    isDebt = input.required<boolean>();
}
