import { Component, OnInit, inject } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'expense',
    templateUrl: './expense.component.html',
    styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent implements OnInit {
    private location = inject(Location);

    ngOnInit(): void {
        console.log(this.location.getState());
    }
}
