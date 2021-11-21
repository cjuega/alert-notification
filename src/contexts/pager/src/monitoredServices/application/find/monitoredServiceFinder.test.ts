import MonitoredServiceRepositoryMock from '@src/monitoredServices/__mocks__/monitoredServiceRepository.mock';
import MonitoredServiceFinder from '@src/monitoredServices/application/find/monitoredServiceFinder';
import MonitoredServiceNotFound from '@src/monitoredServices/domain/monitoredServiceNotFound';
import MonitoredServiceMother from '@src/monitoredServices/domain/monitoredService.mother';
import FindMonitoredServiceQueryHandler from '@src/monitoredServices/application/find/findMonitoredServiceQueryHandler';
import FindMonitoredServiceResponseMother from '@src/monitoredServices/application/find/findMonitoredServiceResponse.mother';
import FindMonitoredServiceQueryMother from '@src/monitoredServices/application/find/findMonitoredServiceQuery.mother';

describe('monitoredServiceFinder', () => {
    it("should throw a MonitoredServiceNotFound when the MonitoredService doesn't exist", async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            handler = new FindMonitoredServiceQueryHandler(new MonitoredServiceFinder(repository)),
            query = FindMonitoredServiceQueryMother.random();

        repository.whenSearchThenReturn(null);

        let error;

        try {
            await handler.handle(query);
        } catch (e) {
            error = e;
        } finally {
            expect(error).toBeInstanceOf(MonitoredServiceNotFound);
        }
    });

    it('should return an existing MonitoredService', async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            handler = new FindMonitoredServiceQueryHandler(new MonitoredServiceFinder(repository)),
            service = MonitoredServiceMother.random(),
            query = FindMonitoredServiceQueryMother.create({ id: service.id.value }),
            expected = FindMonitoredServiceResponseMother.fromMonitoredService(service);

        repository.whenSearchThenReturn(service);

        // eslint-disable-next-line one-var
        const response = await handler.handle(query);

        repository.assertSearchHasBeenCalledWith(service.id);
        expect(response).toStrictEqual(expected);
    });
});
