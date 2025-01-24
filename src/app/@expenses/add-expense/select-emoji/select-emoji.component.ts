import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'select-expense-emoji',
    templateUrl: './select-emoji.component.html',
    styleUrls: ['./select-emoji.component.scss'],
})
export class SelectEmojiComponent {
    private router = inject(Router);

    onButtonClicked(): void {
        this.router.navigate(['expenses', 'add', 'details']);
    }
}
