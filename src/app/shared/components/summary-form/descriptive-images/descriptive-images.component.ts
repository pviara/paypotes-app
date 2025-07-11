import { Component, input } from '@angular/core';

@Component({
    selector: 'descriptive-images',
    templateUrl: './descriptive-images.component.html',
    styleUrls: ['./descriptive-images.component.scss'],
    standalone: false,
})
export class DescriptiveImagesComponent {
    avatarUrl = input.required<string>();
    expenseEmoji = input.required<string>();
    groupEmoji = input<string>();
}
