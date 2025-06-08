import { Contacts } from '@core/model/contact/contact';
import {
    ContactsWithBalance,
    ContactWithBalance,
} from '@core/model/contact/contact-with-balance';
import { Filters } from '@core/model/filters/filters';
import { Observable } from 'rxjs';

export interface ContactService {
    getContact(id: string): Observable<ContactWithBalance>;
    getContacts(): Observable<Contacts>;
    getContactsWithBalance(
        pageIndex?: number,
        filters?: Filters,
    ): Observable<ContactsWithBalance>;
}
