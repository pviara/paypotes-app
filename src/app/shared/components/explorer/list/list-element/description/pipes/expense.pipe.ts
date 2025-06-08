import { ListElement } from '@core/model/list-element/list-element';
import { PairExpense } from '@core/model/expense/v2/pair-expense';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'expense',
})
export class ExpensePipe implements PipeTransform {
    transform(value: ListElement): PairExpense | null {
        return value instanceof PairExpense ? (value as PairExpense) : null;
    }
}
