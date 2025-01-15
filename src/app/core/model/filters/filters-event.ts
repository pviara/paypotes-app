import { Filters } from '@core/model/filters/filters';

export type FiltersEvent = {
    pageIndex?: number;
    filters?: Filters;
};
