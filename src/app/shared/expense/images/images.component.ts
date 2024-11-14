import { Component, input } from '@angular/core';

@Component({
    selector: 'expense-images',
    templateUrl: './images.component.html',
    styleUrls: ['./images.component.scss'],
    standalone: true,
})
export class ExpenseImagesComponent {
    avatarURL = input.required<string>();
    emoji = input.required<string>();
}
