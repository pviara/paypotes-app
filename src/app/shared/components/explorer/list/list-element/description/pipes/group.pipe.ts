import { GroupWithBalance } from '@core/model/group/group-with-balance';
import { ListElement } from '@core/model/list-element/list-element';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'group',
    standalone: false,
})
export class GroupPipe implements PipeTransform {
    transform(value: ListElement): GroupWithBalance | null {
        return value instanceof GroupWithBalance
            ? (value as GroupWithBalance)
            : null;
    }
}
