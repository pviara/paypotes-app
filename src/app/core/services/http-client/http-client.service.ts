import { Observable } from 'rxjs';

export interface HttpClientService {
    get<T>(url: string): Observable<T>;
    getText(url: string): Observable<string>;
    put(url: string, payload: unknown): Observable<void>;
    post(url: string, payload: unknown): Observable<void>;
}
