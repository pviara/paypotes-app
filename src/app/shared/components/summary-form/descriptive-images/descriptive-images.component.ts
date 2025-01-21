import { Component, input } from '@angular/core';

@Component({
    selector: 'descriptive-images',
    templateUrl: './descriptive-images.component.html',
    styleUrls: ['./descriptive-images.component.scss'],
})
export class DescriptiveImagesComponent {
    avatarURL = input.required<string>();
    expenseEmoji = input.required<string>();
    groupEmoji = input<string>();
}
