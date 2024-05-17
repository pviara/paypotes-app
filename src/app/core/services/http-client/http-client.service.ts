import { Observable } from 'rxjs';

export interface HttpClientService {
    get<T>(url: string): Observable<T>;
}
