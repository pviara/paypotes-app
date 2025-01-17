import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'set-balance',
    templateUrl: './set-balance.component.html',
    styleUrls: ['./set-balance.component.scss'],
})
export class SetBalanceComponent {
    private router = inject(Router);

    onButtonClicked(): void {
        this.router.navigate(['expenses', 'add', 'emoji']);
    }
}
