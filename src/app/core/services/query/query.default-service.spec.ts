import { QueryDefaultService } from '@core/services/query/query.default-service';

describe('QueryDefaultService', () => {
    let sut: QueryDefaultService;

    beforeEach(() => {
        sut = new QueryDefaultService();
    });

    it('should return empty string when given object is empty', () => {
        const object = {};
        const result = sut.buildQueryFrom(object);
        expect(result).toBe('');
    });

    describe('object is not empty', () => {
        it('should return empty string when given object only contains empty object', () => {
            const object = {
                filters: {
                    type: '',
                },
            };
            const result = sut.buildQueryFrom(object);
            expect(result).toBe('');
        });

        it('should not return empty string', () => {
            const object = {
                search: 'text',
            };
            const result = sut.buildQueryFrom(object);
            expect(result).not.toBe('');
        });

        it('should contain a "?" in first position', () => {
            const object = {
                search: 'text',
            };
            const result = sut.buildQueryFrom(object);
            expect(result.charAt(0)).toBe('?');
        });

        it('should return object property with its value', () => {
            const object = {
                search: 'text',
            };
            const result = sut.buildQueryFrom(object);
            expect(result).toBe(`?search=${object.search}`);
        });

        it('should return all object properties with their own value', () => {
            const object = {
                pageIndex: 1,
                search: 'text',
            };
            const result = sut.buildQueryFrom(object);
            expect(result).toBe(
                `?pageIndex=${object.pageIndex}&search=${object.search}`,
            );
        });

        it('should return all nested object properties with their own value', () => {
            const object = {
                pageIndex: 1,
                search: 'text',
                filters: {
                    type: 'debt',
                },
            };
            const result = sut.buildQueryFrom(object);
            expect(result).toBe(
                `?pageIndex=${object.pageIndex}&search=${object.search}&type=debt`,
            );
        });

        it('should not return property when its value is empty', () => {
            const object = {
                pageIndex: 1,
                search: '',
                filters: {
                    type: '',
                },
            };
            const result = sut.buildQueryFrom(object);
            expect(result).toBe(`?pageIndex=${object.pageIndex}`);
        });

        it('should add ampersand for every query string element', () => {
            const object = {
                groupId: 'group_id',
                pageIndex: 0,
                filters: {
                    type: 'claim',
                },
            };
            const result = sut.buildQueryFrom(object);
            expect(result).toBe(
                `?groupId=${object.groupId}&type=${object.filters.type}`,
            );
        });
    });
});
