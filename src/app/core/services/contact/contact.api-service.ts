import { Contacts } from '@core/model/contact/contact';
import { ContactService } from '@core/services/contact/contact.service';
import { Filters } from '@core/model/expense/filters';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { Observable } from 'rxjs';

export class ContactAPIService implements ContactService {
    constructor(private httpClientService: HttpClientService) {}

    getContacts(filters?: Filters): Observable<Contacts> {
        throw new Error('Method not implemented.');
    }
}
