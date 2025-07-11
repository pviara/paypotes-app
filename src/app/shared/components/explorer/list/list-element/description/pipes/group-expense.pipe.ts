import { GroupExpense } from '@core/model/expense/group-expense';
import { ListElement } from '@core/model/list-element/list-element';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'groupExpense',
    standalone: false,
})
export class GroupExpensePipe implements PipeTransform {
    transform(value: ListElement): GroupExpense | null {
        return value instanceof GroupExpense ? (value as GroupExpense) : null;
    }
}
