import { Contact, Contacts } from '@core/model/contact/contact';
import { Filters } from '@core/model/expense/filters';
import { Observable } from 'rxjs';

export interface ContactService {
    getContact(id: string): Observable<Contact>;
    getContacts(pageIndex?: number, filters?: Filters): Observable<Contacts>;
}
