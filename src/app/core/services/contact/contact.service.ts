import { ContactsV2 } from '@core/model/contact/contact';
import {
    ContactsWithBalanceV2,
    ContactWithBalanceV2,
} from '@core/model/contact/contact-with-balance';
import { Filters } from '@core/model/filters/filters';
import { Observable } from 'rxjs';

export interface ContactService {
    getContact(id: string): Observable<ContactWithBalanceV2>;
    getContacts(): Observable<ContactsV2>;
    getContactsWithBalance(
        pageIndex?: number,
        filters?: Filters,
    ): Observable<ContactsWithBalanceV2>;
}
