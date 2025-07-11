import { Component, input } from '@angular/core';

@Component({
    selector: 'pair-expense-images',
    templateUrl: './images.component.html',
    styleUrls: ['./images.component.scss'],
    standalone: false,
})
export class ExpenseImagesComponent {
    avatarUrl = input.required<string>();
    emoji = input.required<string>();
}
