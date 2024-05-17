import { Group } from '../../model/group';
import { HttpClient } from '@angular/common/http';
import { HttpClientService } from './http-client.service';
import { Observable, of } from 'rxjs';

export class DefaultHttpClientService implements HttpClientService {
    constructor(private httpClient: HttpClient) {}

    get<T>(url: string): Observable<T> {
        return of([
            new Group({
                id: 'A',
                name: 'Bretagne',
                members: Array.from({ length: 6 }),
            }),
            new Group({
                id: 'B',
                name: 'BBQ',
                members: Array.from({ length: 4 }),
            }),
            new Group({
                id: 'C',
                name: 'Fiesta',
                members: Array.from({ length: 18 }),
            }),
        ]) as Observable<T>;
    }
}
