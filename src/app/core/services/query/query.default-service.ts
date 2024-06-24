import { QueryService } from '@core/services/query/query.service';

type KeyValuePair = {
    key: string;
    value: string | Record<string, any>;
};

export class QueryDefaultService implements QueryService {
    buildQueryFrom(object: Record<string, any>): string {
        const isEmpty = this.isEmpty(object);
        if (isEmpty) {
            return '';
        }

        const cleanedObject = this.removeFalsyValuesFrom(object);
        const query = this.mapPropertiesOf(cleanedObject);

        return `?${query}`;
    }

    private removeFalsyValuesFrom(
        object: Record<string, any>,
    ): Record<string, any> {
        const entries = Object.entries(object).filter((element) => {
            const [, value] = element;
            if (value) {
                if (typeof value === 'object') {
                    return !this.isEmpty(value);
                }
                return element;
            }
            return null;
        });
        return Object.fromEntries(entries);
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
                query += this.writeAmpersandFor(nextValue);
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

    private writeAmpersandFor(value: KeyValuePair['value']): string {
        if (typeof value === 'object') {
            return this.isEmpty(value) ? '' : '&';
        } else {
            return value ? '&' : '';
        }
    }
}
