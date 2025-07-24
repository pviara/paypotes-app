import { Observable } from 'rxjs';

export type RequestOptions = {
    headers: {
        Authorization: string;
    };
    observeResponse: boolean;
};

export interface HttpClientService {
    get<T>(url: string, options: Partial<RequestOptions>): Observable<T>;
    getText(url: string, options: Partial<RequestOptions>): Observable<string>;
    put(
        url: string,
        payload: unknown,
        options: Partial<RequestOptions>,
    ): Observable<void>;
    post<T = void>(
        url: string,
        payload: unknown,
        options: Partial<RequestOptions>,
    ): Observable<T>;
}
