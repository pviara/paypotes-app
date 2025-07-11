import { Component, inject, input } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'contact-description',
    templateUrl: './contact-description.component.html',
    styleUrls: ['./contact-description.component.scss'],
    standalone: false,
})
export class ContactDescriptionComponent {
    private document = inject(DOCUMENT);

    avatarUrl = input.required<string>();

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
