import { QueryService } from '@core/services/query/query.service';

export class QueryDefaultService implements QueryService {
    buildQueryFrom(object: Record<string, any>): string {
        const isEmpty = this.isEmpty(object);
        if (isEmpty) {
            return '';
        }

        const queryStart = '?';
        return this.mapPropertiesOf(object, queryStart);
    }

    private mapPropertiesOf(object: Record<string, any>, query = '') {
        for (const key in object) {
            const value = object[key];

            if (value) {
                if (typeof value === 'object') {
                    query += this.mapPropertiesOf(value, '');
                    continue;
                }

                const prefix = query.endsWith('?') ? '' : '&';
                query += `${prefix}${key}=${value}`;
            }
        }

        return query;
    }

    private isEmpty(object: Record<string, any>): boolean {
        return Object.values(object).every((value) => !value);
    }
}
