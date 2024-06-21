import { ActivatedRoute } from '@angular/router';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { ViewType } from '@core/model/view/view';

@Component({
    templateUrl: './expenses.view.html',
    styleUrls: ['./expenses.view.scss'],
})
export class ExpensesView {
    private route = inject(ActivatedRoute);

    $mustDisplaySharedHeadbar = this.route.firstChild?.data.pipe(
        map(({ type }) => type === ViewType.List),
    );
}
