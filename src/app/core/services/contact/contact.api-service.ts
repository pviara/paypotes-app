import { Contact, Contacts } from '@core/model/contact/contact';
import { ContactService } from '@core/services/contact/contact.service';
import { Filters } from '@core/model/filters/filters';
import { generateRandomString } from '@shared/utils/generate-random-string';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { Observable, map, of } from 'rxjs';
import { QueryService } from '@core/services/query/query.service';
import {
    ContactMetadata,
    ContactsV2,
    ContactV2,
} from '@core/model/contact/v2/contact';
import {
    ContactWithBalanceDTO,
    ContactWithBalanceDTOs,
} from '@core/model/contact/v2/contact-with-balance.dto';
import { ContactWithBalanceV2 } from '@core/model/contact/v2/contact-with-balance';
import { ContactDTO, ContactDTOs } from '@core/model/contact/v2/contact.dto';

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

    getContactsWithBalance(
        pageIndex = 0,
        filters?: Filters,
    ): Observable<Contacts> {
        const query = this.queryService.buildQueryFrom({ pageIndex, filters });

        return this.httpClientService
            .get<Contacts>(`${this.endpoint}${query}`)
            .pipe(map(this.getDeterministicContacts()));
    }

    private getDeterministicContacts(): () => Contacts {
        return () => [
            new Contact({
                id: generateRandomString(),
                firstname: 'Alice',
                lastname: 'Anderson',
                avatarURL: 'estelle.png',
                balance: 1456,
            }),
            new Contact({
                id: generateRandomString(),
                firstname: 'Bob',
                lastname: 'Brown',
                avatarURL: 'valentin.png',
                balance: -7854,
            }),
            new Contact({
                id: generateRandomString(),
                firstname: 'Charlie',
                lastname: 'Clark',
                avatarURL: 'ahmed.png',
                balance: 6743,
            }),
            new Contact({
                id: generateRandomString(),
                firstname: 'David',
                lastname: 'Davis',
                avatarURL: 'claire.png',
                balance: -3421,
            }),
            new Contact({
                id: generateRandomString(),
                firstname: 'Emily',
                lastname: 'Evans',
                avatarURL: 'estelle.png',
                balance: 2398,
            }),
            new Contact({
                id: generateRandomString(),
                firstname: 'Frank',
                lastname: 'Garcia',
                avatarURL: 'valentin.png',
                balance: -1500,
            }),
            new Contact({
                id: generateRandomString(),
                firstname: 'Grace',
                lastname: 'Harris',
                avatarURL: 'ahmed.png',
                balance: 522,
            }),
            new Contact({
                id: generateRandomString(),
                firstname: 'Hannah',
                lastname: 'Johnson',
                avatarURL: 'claire.png',
                balance: -674,
            }),
            new Contact({
                id: generateRandomString(),
                firstname: 'Ivan',
                lastname: 'King',
                avatarURL: 'estelle.png',
                balance: 8900,
            }),
            new Contact({
                id: generateRandomString(),
                firstname: 'Julia',
                lastname: 'Lewis',
                avatarURL: 'valentin.png',
                balance: -2451,
            }),
            new Contact({
                id: generateRandomString(),
                firstname: 'Kevin',
                lastname: 'Martinez',
                avatarURL: 'ahmed.png',
                balance: 6723,
            }),
            new Contact({
                id: generateRandomString(),
                firstname: 'Laura',
                lastname: 'Nelson',
                avatarURL: 'claire.png',
                balance: -3150,
            }),
            new Contact({
                id: generateRandomString(),
                firstname: 'Mike',
                lastname: 'Owen',
                avatarURL: 'estelle.png',
                balance: 4500,
            }),
            new Contact({
                id: generateRandomString(),
                firstname: 'Nina',
                lastname: 'Parker',
                avatarURL: 'valentin.png',
                balance: -765,
            }),
            new Contact({
                id: generateRandomString(),
                firstname: 'Oscar',
                lastname: 'Roberts',
                avatarURL: 'ahmed.png',
                balance: 8231,
            }),
            new Contact({
                id: generateRandomString(),
                firstname: 'Paul',
                lastname: 'Smith',
                avatarURL: 'claire.png',
                balance: -9520,
            }),
            new Contact({
                id: generateRandomString(),
                firstname: 'Quincy',
                lastname: 'Taylor',
                avatarURL: 'estelle.png',
                balance: 3100,
            }),
            new Contact({
                id: generateRandomString(),
                firstname: 'Rachel',
                lastname: 'Upton',
                avatarURL: 'valentin.png',
                balance: -2200,
            }),
            new Contact({
                id: generateRandomString(),
                firstname: 'Steve',
                lastname: 'Vance',
                avatarURL: 'ahmed.png',
                balance: 5699,
            }),
            new Contact({
                id: generateRandomString(),
                firstname: 'Tina',
                lastname: 'White',
                avatarURL: 'claire.png',
                balance: -1984,
            }),
        ];
    }
}
