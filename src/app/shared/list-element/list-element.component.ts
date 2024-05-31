import { Component, computed, input } from '@angular/core';
import { Contact } from '@core/model/contact/contact';
import { Expense } from '@core/model/expense/expense';
import { generateRandomString } from '@shared/utils/generate-random-string';
import { ListElement } from '@core/model/list-element/list-element';

@Component({
    selector: 'list-element',
    templateUrl: './list-element.component.html',
    styleUrls: ['./list-element.component.scss'],
})
export class ListElementComponent {
    element = input.required<ListElement | null>();

    randomId = generateRandomString();
}
