import { Component, inject } from '@angular/core';
import {
    ExpenseServiceProvider,
    ExpenseServiceToken,
} from '@core/services/expense/expense.service.provider';
import { HttpClientServiceProvider } from '@core/services/http-client/http-client.service.provider';
import { map } from 'rxjs';
import { QueryServiceProvider } from '@core/services/query/query.service.provider';

@Component({
    selector: 'headbar',
    templateUrl: './headbar.component.html',
    styleUrls: ['./headbar.component.scss'],
    providers: [
        ExpenseServiceProvider,
        HttpClientServiceProvider,
        QueryServiceProvider,
    ],
})
export class HeadbarComponent {
    private expenseService = inject(ExpenseServiceToken);

    $balance = this.expenseService.computeBalance();

    $isDebt = this.$balance.pipe(
        map((balance) => (balance.includes('-') ? true : false)),
    );
}
