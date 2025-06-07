import { Contacts } from '@core/model/contact/contact';
import { ContactWithBalanceV2 } from '@core/model/contact/v2/contact-with-balance';
import { Filters } from '@core/model/filters/filters';
import { Observable } from 'rxjs';

export interface ContactService {
    getContact(id: string): Observable<ContactWithBalanceV2>;
    getContacts(pageIndex?: number, filters?: Filters): Observable<Contacts>;
}
