import { QueryService } from '@core/services/query/query.service';
import { Spy } from '@test/model/spy';

export class QueryServiceSpy extends Spy<QueryService> implements QueryService {
    buildQueryFrom(query: Record<string, any>): string {
        this.increment('buildQueryFrom', query);
        return this.getStubOrDefault('buildQueryFrom', '');
    }
}
