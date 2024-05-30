import { Component, inject, input } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'description',
    templateUrl: './description.component.html',
    styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent {
    private document = inject(DOCUMENT);
    
    avatarURL = input.required<string>();

    firstname = input.required<string>();

    lastname = input.required<string>();

    onImageLoaded(event: any): void {
        const avatars = this.document.getElementsByClassName('hidden');
        if (avatars.length === 0) {
            return;
        }

        for (const avatar of Array.from(avatars)) {
            avatar.classList.remove('hidden');
        }
    }
}
