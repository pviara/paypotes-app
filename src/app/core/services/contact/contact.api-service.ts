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
import { Filters } from '@core/model/filters/filters';
import { generateRandomString } from '@shared/utils/generate-random-string';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { Observable, map } from 'rxjs';
import { QueryService } from '@core/services/query/query.service';
import { getRandomAvatarUrl } from '@shared/utils/generate-random-avatar-url';
import { generateRandomName } from '@shared/utils/generate-random-name';
import { generateRandomBalance } from '@shared/utils/generate-random-balance';

export class ContactAPIService implements ContactService {
    private readonly endpoint = '/api/contact';

    constructor(
        private httpClientService: HttpClientService,
        private queryService: QueryService,
    ) {}

    getContact(id: string): Observable<ContactWithBalance> {
        return this.httpClientService.get(`${this.endpoint}/${id}`).pipe(
            map(() => this.getDeterministicContactWithBalanceDTOs()[0]),
            map((contact) => this.mapContactWithBalanceV2(contact)),
        );
    }

    getContacts(): Observable<Contacts> {
        return this.httpClientService
            .get(`${this.endpoint}/without-balance`)
            .pipe(
                map(() => this.getDeterministicContactDTOs()),
                map((contacts) => this.mapContactsV2(contacts)),
            );
    }

    getContactsWithBalance(
        pageIndex = 0,
        filters?: Filters,
    ): Observable<ContactsWithBalance> {
        const query = this.queryService.buildQueryFrom({ pageIndex, filters });

        return this.httpClientService.get(`${this.endpoint}${query}`).pipe(
            map(() => this.getDeterministicContactWithBalanceDTOs()),
            map((contacts) => this.mapContactsWithBalanceV2(contacts)),
        );
    }

    private mapContactsV2(contacts: ContactDTOs): Contacts {
        return contacts.map((contact) => this.mapContactV2(contact));
    }

    private mapContactV2(contact: ContactDTO): Contact {
        const metadata: ContactMetadata = {
            id: contact.id,
            firstname: contact.firstname,
            lastname: contact.lastname,
            avatarUrl: contact.avatarUrl,
        };
        return new Contact(metadata);
    }

    private mapContactsWithBalanceV2(
        contacts: ContactWithBalanceDTOs,
    ): ContactsWithBalance {
        return contacts.map((contact) => this.mapContactWithBalanceV2(contact));
    }

    private mapContactWithBalanceV2(
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

    private getDeterministicContactDTOs(): ContactDTOs {
        return [
            {
                id: generateRandomString(),
                firstname: generateRandomName().firstname,
                lastname: generateRandomName().lastname,
                avatarUrl: getRandomAvatarUrl(),
            },
            {
                id: generateRandomString(),
                firstname: generateRandomName().firstname,
                lastname: generateRandomName().lastname,
                avatarUrl: getRandomAvatarUrl(),
            },
            {
                id: generateRandomString(),
                firstname: generateRandomName().firstname,
                lastname: generateRandomName().lastname,
                avatarUrl: getRandomAvatarUrl(),
            },
            {
                id: generateRandomString(),
                firstname: generateRandomName().firstname,
                lastname: generateRandomName().lastname,
                avatarUrl: getRandomAvatarUrl(),
            },
        ];
    }

    private getDeterministicContactWithBalanceDTOs(): ContactWithBalanceDTOs {
        return [
            {
                id: generateRandomString(),
                firstname: generateRandomName().firstname,
                lastname: generateRandomName().lastname,
                avatarUrl: getRandomAvatarUrl(),
                balance: generateRandomBalance(),
            },
            {
                id: generateRandomString(),
                firstname: generateRandomName().firstname,
                lastname: generateRandomName().lastname,
                avatarUrl: getRandomAvatarUrl(),
                balance: generateRandomBalance(),
            },
            {
                id: generateRandomString(),
                firstname: generateRandomName().firstname,
                lastname: generateRandomName().lastname,
                avatarUrl: getRandomAvatarUrl(),
                balance: generateRandomBalance(),
            },
            {
                id: generateRandomString(),
                firstname: generateRandomName().firstname,
                lastname: generateRandomName().lastname,
                avatarUrl: getRandomAvatarUrl(),
                balance: generateRandomBalance(),
            },
        ];
    }
}
