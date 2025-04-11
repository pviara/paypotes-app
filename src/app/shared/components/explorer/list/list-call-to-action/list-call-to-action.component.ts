import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'list-call-to-action',
    templateUrl: './list-call-to-action.component.html',
    styleUrls: [
        '../list-element.styles.scss',
        './list-call-to-action.component.scss',
    ],
})
export class ListCallToActionComponent {
    private router = inject(Router);

    redirectToForm(): void {
        this.router.navigate(['expenses', 'add']);
    }
}
