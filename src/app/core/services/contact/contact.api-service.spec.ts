import { ContactAPIService } from './contact.api-service';
import { HttpClientServiceSpy } from '@test/doubles/http-client.service.spy';
import { Subscription } from 'rxjs';

describe('ContactAPIService', () => {
    let sut: ContactAPIService;
    let httpClientService: HttpClientServiceSpy;

    const subscription = new Subscription();

    beforeEach(() => {
        httpClientService = new HttpClientServiceSpy();
        sut = new ContactAPIService(httpClientService);
    });

    afterAll(() => subscription.unsubscribe());

    it('should get contacts from server', () => {
        sut.getContacts().subscribe(() => {
            expect(httpClientService.calls.get.count).toBe(1);

            const [call] = httpClientService.calls.get.history;
            const clientHasNotBeenCalledWithAnyElement =
                !call.includes('search') && !call.includes('type');
            expect(clientHasNotBeenCalledWithAnyElement).toBe(true);
        });
    });

    describe('search', () => {
        it('should get the contacts from server', () => {
            const search = 'labelXYZ';
            subscription.add(
                sut.getContacts(0, { search }).subscribe(() => {
                    expect(httpClientService.calls.get.count).toBe(1);

                    const [call] = httpClientService.calls.get.history;
                    const clientHasBeenCalledWithSearch = call.includes(
                        `search=${search}`,
                    );
                    expect(clientHasBeenCalledWithSearch).toBe(true);
                }),
            );
        });
    });

    describe('pageIndex', () => {
        it('should get the contacts from server', () => {
            const pageIndex = 1;
            subscription.add(
                sut.getContacts(pageIndex).subscribe(() => {
                    expect(httpClientService.calls.get.count).toBe(1);

                    const [call] = httpClientService.calls.get.history;
                    const clientHasBeenCalledWithSearch = call.includes(
                        `?pageIndex=${pageIndex}`,
                    );
                    expect(clientHasBeenCalledWithSearch).toBe(true);
                }),
            );
        });
    });

    describe('pageIndex and search', () => {
        it('should get the contacts from server', () => {
            const pageIndex = 1;
            const search = 'ABC';
            subscription.add(
                sut.getContacts(pageIndex, { search }).subscribe(() => {
                    expect(httpClientService.calls.get.count).toBe(1);

                    const [call] = httpClientService.calls.get.history;
                    const clientCalledWithSearchAndPage = call.includes(
                        `?pageIndex=${pageIndex}&search=${search}`,
                    );
                    expect(clientCalledWithSearchAndPage).toBe(true);
                }),
            );
        });
    });

    describe('type', () => {
        it('should get the contacts from server', () => {
            const type = 'debt';
            subscription.add(
                sut.getContacts(0, { type }).subscribe(() => {
                    expect(httpClientService.calls.get.count).toBe(1);

                    const [call] = httpClientService.calls.get.history;
                    console.log(call);
                    const clientHasBeenCalledWithType = call.includes(
                        `&type=${type}`,
                    );
                    expect(clientHasBeenCalledWithType).toBe(true);
                }),
            );
        });
    });
});
