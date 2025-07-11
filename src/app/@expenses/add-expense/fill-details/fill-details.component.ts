import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'fill-expense-details',
    templateUrl: './fill-details.component.html',
    styleUrls: ['./fill-details.component.scss'],
    standalone: false,
})
export class FillDetailsComponent {
    private router = inject(Router);

    onButtonClicked(): void {
        this.router.navigate(['expenses', 'add', 'person']);
    }
}
