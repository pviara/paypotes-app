import { Contact } from '@core/model/contact/contact';
import { ListElement } from '@core/model/list-element/list-element';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'contact',
})
export class ContactPipe implements PipeTransform {
    transform(value: ListElement): Contact | null {
        return value instanceof Contact ? (value as Contact) : null;
    }
}
