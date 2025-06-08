import { ContactWithBalanceV2 } from '@core/model/contact/contact-with-balance';
import { ListElement } from '@core/model/list-element/list-element';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'contact',
})
export class ContactPipe implements PipeTransform {
    transform(value: ListElement): ContactWithBalanceV2 | null {
        return value instanceof ContactWithBalanceV2
            ? (value as ContactWithBalanceV2)
            : null;
    }
}
