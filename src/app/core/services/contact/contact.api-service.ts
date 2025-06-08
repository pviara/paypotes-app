import {
    ContactMetadata,
    ContactsV2,
    ContactV2,
} from '@core/model/contact/v2/contact';
import { ContactDTO, ContactDTOs } from '@core/model/contact/v2/contact.dto';
import { ContactService } from '@core/services/contact/contact.service';
import {
    ContactsWithBalanceV2,
    ContactWithBalanceV2,
} from '@core/model/contact/v2/contact-with-balance';
import {
    ContactWithBalanceDTO,
    ContactWithBalanceDTOs,
} from '@core/model/contact/v2/contact-with-balance.dto';
import { Filters } from '@core/model/filters/filters';
import { generateRandomString } from '@shared/utils/generate-random-string';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { Observable, map } from 'rxjs';
import { QueryService } from '@core/services/query/query.service';

export class ContactAPIService implements ContactService {
    private readonly endpoint = '/api/contact';

    constructor(
        private httpClientService: HttpClientService,
        private queryService: QueryService,
    ) {}

    getContact(id: string): Observable<ContactWithBalanceV2> {
        return this.httpClientService.get(`${this.endpoint}/${id}`).pipe(
            map(() => this.getDeterministicContactWithBalanceDTOs()[0]),
            map((contact) => this.mapContactWithBalanceV2(contact)),
        );
    }

    getContacts(): Observable<ContactsV2> {
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
    ): Observable<ContactsWithBalanceV2> {
        const query = this.queryService.buildQueryFrom({ pageIndex, filters });

        return this.httpClientService.get(`${this.endpoint}${query}`).pipe(
            map(() => this.getDeterministicContactWithBalanceDTOs()),
            map((contacts) => this.mapContactsWithBalanceV2(contacts)),
        );
    }

    private mapContactsV2(contacts: ContactDTOs): ContactsV2 {
        return contacts.map((contact) => this.mapContactV2(contact));
    }

    private mapContactV2(contact: ContactDTO): ContactV2 {
        const metadata: ContactMetadata = {
            id: contact.id,
            firstname: contact.firstname,
            lastname: contact.lastname,
            avatarUrl: contact.avatarUrl,
        };
        return new ContactV2(metadata);
    }

    private mapContactsWithBalanceV2(
        contacts: ContactWithBalanceDTOs,
    ): ContactsWithBalanceV2 {
        return contacts.map((contact) => this.mapContactWithBalanceV2(contact));
    }

    private mapContactWithBalanceV2(
        contact: ContactWithBalanceDTO,
    ): ContactWithBalanceV2 {
        const metadata: ContactMetadata = {
            id: contact.id,
            firstname: contact.firstname,
            lastname: contact.lastname,
            avatarUrl: contact.avatarUrl,
        };
        return new ContactWithBalanceV2(metadata, contact.balance);
    }

    private getDeterministicContactDTOs(): ContactDTOs {
        return [
            {
                id: generateRandomString(),
                firstname: this.generateRandomName().firstname,
                lastname: this.generateRandomName().lastname,
                avatarUrl: this.getRandomAvatarUrl(),
            },
            {
                id: generateRandomString(),
                firstname: this.generateRandomName().firstname,
                lastname: this.generateRandomName().lastname,
                avatarUrl: this.getRandomAvatarUrl(),
            },
            {
                id: generateRandomString(),
                firstname: this.generateRandomName().firstname,
                lastname: this.generateRandomName().lastname,
                avatarUrl: this.getRandomAvatarUrl(),
            },
            {
                id: generateRandomString(),
                firstname: this.generateRandomName().firstname,
                lastname: this.generateRandomName().lastname,
                avatarUrl: this.getRandomAvatarUrl(),
            },
        ];
    }

    private getDeterministicContactWithBalanceDTOs(): ContactWithBalanceDTOs {
        return [
            {
                id: generateRandomString(),
                firstname: this.generateRandomName().firstname,
                lastname: this.generateRandomName().lastname,
                avatarUrl: this.getRandomAvatarUrl(),
                balance: '-12,75',
            },
            {
                id: generateRandomString(),
                firstname: this.generateRandomName().firstname,
                lastname: this.generateRandomName().lastname,
                avatarUrl: this.getRandomAvatarUrl(),
                balance: '-12,75',
            },
            {
                id: generateRandomString(),
                firstname: this.generateRandomName().firstname,
                lastname: this.generateRandomName().lastname,
                avatarUrl: this.getRandomAvatarUrl(),
                balance: '-12,75',
            },
            {
                id: generateRandomString(),
                firstname: this.generateRandomName().firstname,
                lastname: this.generateRandomName().lastname,
                avatarUrl: this.getRandomAvatarUrl(),
                balance: '-12,75',
            },
        ];
    }

    private getRandomAvatarUrl(): string {
        const avatars = [
            'ahmed.png',
            'claire.png',
            'claire.png',
            'estelle.png',
            'valentin.png',
        ];
        return avatars[Math.floor(Math.random() * avatars.length)];
    }

    private generateRandomName(): { firstname: string; lastname: string } {
        const firstnames = [
            'Alice',
            'Bob',
            'Charlie',
            'David',
            'Emma',
            'Fiona',
            'George',
            'Hannah',
        ];
        const lastnames = [
            'Smith',
            'Johnson',
            'Williams',
            'Brown',
            'Jones',
            'Garcia',
            'Miller',
            'Davis',
        ];

        const firstname =
            firstnames[Math.floor(Math.random() * firstnames.length)];
        const lastname =
            lastnames[Math.floor(Math.random() * lastnames.length)];

        return { firstname, lastname };
    }
}
