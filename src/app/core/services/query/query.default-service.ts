import { QueryService } from '@core/services/query/query.service';

type KeyValuePair = {
    key: string;
    value: string;
};

export class QueryDefaultService implements QueryService {
    buildQueryFrom(object: Record<string, any>): string {
        const isEmpty = this.isEmpty(object);
        if (isEmpty) {
            return '';
        }

        const query = this.mapPropertiesOf(object);
        return `?${query}`;
    }

    private mapPropertiesOf(object: Record<string, any>, query = '') {
        const keys = Object.keys(object);

        for (let i = 0; i < keys.length; i++) {
            const { key, value } = this.getObjectKeyValueAt(i, object);

            if (value) {
                if (typeof value === 'object') {
                    query += this.mapPropertiesOf(value);
                    continue;
                }

                query += `${key}=${value}`;

                const { value: nextValue } = this.getObjectKeyValueAt(
                    i + 1,
                    object,
                );
                query += nextValue ? '&' : '';
            }
        }

        return query;
    }

    private isEmpty(object: Record<string, any>): boolean {
        return Object.values(object).every((value) => {
            if (typeof value === 'object') {
                return this.isEmpty(value);
            }
            return !value;
        });
    }

    private getObjectKeyValueAt(
        i: number,
        object: Record<string, any>,
    ): KeyValuePair {
        const key = Object.keys(object)[i];
        const value = object[key];
        return { key, value };
    }
}
