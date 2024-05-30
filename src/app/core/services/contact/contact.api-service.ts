import { Contact, Contacts } from '@core/model/contact/contact';
import { ContactService } from '@core/services/contact/contact.service';
import { Filters } from '@core/model/expense/filters';
import { HttpClientService } from '@core/services/http-client/http-client.service';
import { Observable, delay, of } from 'rxjs';

export class ContactAPIService implements ContactService {
    constructor(private httpClientService: HttpClientService) {}

    getContacts(filters?: Filters): Observable<Contacts> {
        return of([
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
        ]).pipe(delay(2000));
    }
}
