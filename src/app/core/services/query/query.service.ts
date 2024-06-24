export interface QueryService {
    buildQueryFrom(object: Record<string, any>): string;
}
