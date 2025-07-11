import { ListElement } from '@core/model/list-element/list-element';
import { PairExpense } from '@core/model/expense/pair-expense';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pairExpense',
    standalone: false,
})
export class PairExpensePipe implements PipeTransform {
    transform(value: ListElement): PairExpense | null {
        return value instanceof PairExpense ? (value as PairExpense) : null;
    }
}
