import { GroupWithBalanceV2 } from '@core/model/group/v2/group-with-balance';
import { ListElement } from '@core/model/list-element/list-element';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'group',
})
export class GroupPipe implements PipeTransform {
    transform(value: ListElement): GroupWithBalanceV2 | null {
        return value instanceof GroupWithBalanceV2
            ? (value as GroupWithBalanceV2)
            : null;
    }
}
