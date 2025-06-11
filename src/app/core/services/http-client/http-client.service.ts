import { Observable } from 'rxjs';

export interface HttpClientService {
    get<T>(url: string): Observable<T>;
    put(url: string, payload: unknown): Observable<void>;
    post(url: string, payload: unknown): Observable<void>;
}
