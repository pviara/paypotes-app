import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'select-group-emoji',
    templateUrl: './select-emoji.component.html',
    styleUrls: ['./select-emoji.component.scss'],
    standalone: false,
})
export class SelectEmojiComponent {
    private router = inject(Router);

    onButtonClicked(): void {
        this.router.navigate(['groups', 'add', 'members']);
    }
}
