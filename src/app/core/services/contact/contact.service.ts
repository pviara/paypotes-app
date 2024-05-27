import { Contacts } from '@core/model/contact/contact';
import { Filters } from '@core/model/expense/filters';
import { Observable } from 'rxjs';

export interface ContactService {
    getContacts(filters?: Filters): Observable<Contacts>;
}
