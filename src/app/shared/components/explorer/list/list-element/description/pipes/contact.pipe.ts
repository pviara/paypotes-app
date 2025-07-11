import { ContactWithBalance } from '@core/model/contact/contact-with-balance';
import { ListElement } from '@core/model/list-element/list-element';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'contact',
    standalone: false,
})
export class ContactPipe implements PipeTransform {
    transform(value: ListElement): ContactWithBalance | null {
        return value instanceof ContactWithBalance
            ? (value as ContactWithBalance)
            : null;
    }
}
