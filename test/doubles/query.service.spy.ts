import { QueryService } from '@core/services/query/query.service';
import { Spy } from '@test/model/spy';

export class QueryServiceSpy implements Spy<QueryService> {
    calls = {
        buildQueryFrom: {
            count: 0,
            history: [] as Record<string, any>[],
        },
    };

    buildQueryFrom(query: Record<string, any>): string {
        this.incrementCallsWith(query);
        return '';
    }

    incrementCallsWith(query: Record<string, any>): void {
        this.calls.buildQueryFrom.count++;
        this.calls.buildQueryFrom.history.push(query);
    }
}

export function stubBuildQueryFrom(
    service: QueryServiceSpy,
    value: string,
): void {
    service.buildQueryFrom = (object: Record<string, any>): string => {
        service.incrementCallsWith(object);
        return value;
    };
}
