import { Expense } from '@core/model/expense/expense';
import { ListElement } from '@core/model/list-element/list-element';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'expense',
})
export class ExpensePipe implements PipeTransform {
    transform(value: ListElement): Expense | null {
        return value instanceof Expense ? (value as Expense) : null;
    }
}
