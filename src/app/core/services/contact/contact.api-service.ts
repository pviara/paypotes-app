import {
    ContactMetadata,
    Contacts,
    Contact,
} from '@core/model/contact/contact';
import { ContactDTO, ContactDTOs } from '@core/model/contact/contact.dto';
import { ContactService } from '@core/services/contact/contact.service';
import {
    ContactsWithBalance,
    ContactWithBalance,
} from '@core/model/contact/contact-with-balance';
import {
    ContactWithBalanceDTO,
    ContactWithBalanceDTOs,
} from '@core/model/contact/contact-with-balance.dto';
import { environment } from 'src/environments/environment';
import { Filters } from '@core/model/filters/filters';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { Observable, map } from 'rxjs';
import { QueryService } from '@core/services/query/query.service';

export class ContactAPIService implements ContactService {
    private readonly endpoint = `${environment.API_URL}/contacts`;

    constructor(
        private httpClientService: HttpClientService,
        private queryService: QueryService,
    ) {}

    getContact(id: string): Observable<ContactWithBalance> {
        return this.httpClientService
            .get<ContactWithBalanceDTO>(`${this.endpoint}/${id}`)
            .pipe(map((contact) => this.mapContactWithBalance(contact)));
    }

    getContacts(): Observable<Contacts> {
        return this.httpClientService
            .get<ContactDTOs>(`${this.endpoint}/without-balance`)
            .pipe(map((contacts) => this.mapContacts(contacts)));
    }

    getContactsWithBalance(
        pageIndex = 0,
        filters?: Filters,
    ): Observable<ContactsWithBalance> {
        const query = this.queryService.buildQueryFrom({ pageIndex, filters });

        return this.httpClientService
            .get<ContactWithBalanceDTOs>(`${this.endpoint}${query}`)
            .pipe(map((contacts) => this.mapContactsWithBalance(contacts)));
    }

    private mapContacts(contacts: ContactDTOs): Contacts {
        return contacts.map((contact) => this.mapContact(contact));
    }

    private mapContact(contact: ContactDTO): Contact {
        const metadata: ContactMetadata = {
            id: contact.id,
            firstname: contact.firstname,
            lastname: contact.lastname,
            avatarUrl: contact.avatarUrl,
        };
        return new Contact(metadata);
    }

    private mapContactsWithBalance(
        contacts: ContactWithBalanceDTOs,
    ): ContactsWithBalance {
        return contacts.map((contact) => this.mapContactWithBalance(contact));
    }

    private mapContactWithBalance(
        contact: ContactWithBalanceDTO,
    ): ContactWithBalance {
        const metadata: ContactMetadata = {
            id: contact.id,
            firstname: contact.firstname,
            lastname: contact.lastname,
            avatarUrl: contact.avatarUrl,
        };
        return new ContactWithBalance(metadata, contact.balance);
    }
}
