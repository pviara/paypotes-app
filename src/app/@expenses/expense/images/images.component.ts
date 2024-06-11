import { Component, input } from '@angular/core';
import { Emoji } from '@core/model/emoji';

@Component({
    selector: 'expense-images',
    templateUrl: './images.component.html',
    styleUrls: ['./images.component.scss'],
})
export class ExpenseImagesComponent {
    avatarURL = input.required<string>();
    emoji = input.required<Emoji>();
}
