import { Contact, Contacts } from '@core/model/contact/contact';
import { ContactService } from '@core/services/contact/contact.service';
import { Filters } from '@core/model/expense/filters';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { Observable, map } from 'rxjs';

export class ContactAPIService implements ContactService {
    private readonly endpoint = 'api_url_to_contact';

    constructor(private httpClientService: HttpClientService) {}

    getContacts(pageIndex = 0, filters?: Filters): Observable<Contacts> {
        const url = this.buildURLWith(pageIndex, filters);

        return this.httpClientService.get<Contacts>(url).pipe(
            map(() => [
                new Contact({
                    id: 'A',
                    firstname: 'Claire',
                    lastname: 'Belleroche',
                    avatarURL: 'claire.png',
                    balance: 11812,
                }),
                new Contact({
                    id: 'B',
                    firstname: 'Ahmed',
                    lastname: 'Benjelloun',
                    avatarURL: 'ahmed.png',
                    balance: -3220,
                }),
                new Contact({
                    id: 'C',
                    firstname: 'Valentin',
                    lastname: 'Spyniack',
                    avatarURL: 'valentin.png',
                    balance: -710,
                }),
                new Contact({
                    id: 'D',
                    firstname: 'Estelle',
                    lastname: 'Zhou',
                    avatarURL: 'estelle.png',
                    balance: -9800,
                }),
            ]),
        );
    }

    private buildURLWith(pageIndex: number, filters?: Filters): string {
        const query: Record<string, string | undefined> = {
            pageIndex: pageIndex.toString(),
            search: filters?.search,
            type: filters?.type,
        };

        const isQueryEmpty = Object.values(query).every((value) => !value);
        if (isQueryEmpty) {
            return this.endpoint;
        }

        let url = `${this.endpoint}?`;

        Object.keys(query).forEach((key) => {
            const value = query[key];

            if (value) {
                const prefix = url.endsWith('?') ? '' : '&';
                url += `${prefix}${key}=${value}`;
            }
        });

        return url;
    }
}
