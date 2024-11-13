import { Component, inject } from '@angular/core';
import { AddExpenseFormService } from '../add-expense.form-service';
import {
    ExpenseServiceProvider,
    ExpenseServiceToken,
} from '@core/services/expense/expense.service.provider';
import { HttpClientServiceProvider } from '@core/services/http-client/http-client.service.provider';
import { QueryServiceProvider } from '@core/services/query/query.service.provider';

@Component({
    selector: 'read-summary',
    templateUrl: './read-summary.component.html',
    styleUrls: ['./read-summary.component.scss'],
    providers: [
        ExpenseServiceProvider,
        HttpClientServiceProvider,
        QueryServiceProvider,
    ],
})
export class ReadSummaryComponent {
    private formService = inject(AddExpenseFormService);
    private expenseService = inject(ExpenseServiceToken);

    addExpense(): void {
        console.log('add the following expense:');
    }
}
