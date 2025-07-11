import { Observable } from 'rxjs';

export type RequestOptions = {
    headers: {
        Authorization: string;
    };
    observeResponse?: boolean;
};

export interface HttpClientService {
    get<T>(url: string, options: RequestOptions): Observable<T>;
    getText(url: string, options: RequestOptions): Observable<string>;
    put(
        url: string,
        payload: unknown,
        options: RequestOptions,
    ): Observable<void>;
    post(
        url: string,
        payload: unknown,
        options: RequestOptions,
    ): Observable<void>;
}
