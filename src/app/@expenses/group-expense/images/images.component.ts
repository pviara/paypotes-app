import { Component, input } from '@angular/core';

@Component({
    selector: 'group-expense-images',
    templateUrl: './images.component.html',
    styleUrls: ['./images.component.scss'],
})
export class ExpenseImagesComponent {
    avatarURL = input.required<string>();
    emoji = input.required<string>();
}
