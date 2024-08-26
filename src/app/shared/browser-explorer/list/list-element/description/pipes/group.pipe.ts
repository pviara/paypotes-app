import { Group } from '@core/model/group/group';
import { ListElement } from '@core/model/list-element/list-element';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'group',
})
export class GroupPipe implements PipeTransform {
    transform(value: ListElement): Group | null {
        return value instanceof Group ? (value as Group) : null;
    }
}
