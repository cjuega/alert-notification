import MonitoredServiceRepositoryMock from '@src/monitoredServices/__mocks__/monitoredServiceRepository.mock';
import AllMonitoredServicesSearcher from '@src/monitoredServices/application/searchAll/allMonitoredServicesSearcher';
import MonitoredServiceMother from '@src/monitoredServices/domain/monitoredService.mother';
// eslint-disable-next-line max-len
import SearchAllMonitoredServicesResponseMother from '@src/monitoredServices/application/searchAll/searchAllMonitoredServicesResponse.mother';
import SearchAllMonitoredServicesQueryMother from '@src/monitoredServices/application/searchAll/searchAllMonitoredServicesQuery.mother';
import SearchAllMonitoredServicesQueryHandler from '@src/monitoredServices/application/searchAll/searchAllMonitoredServicesQueryHandler';

describe('allMonitoredServicesSearcher', () => {
    it('should return all MonitoredServices', async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            handler = new SearchAllMonitoredServicesQueryHandler(new AllMonitoredServicesSearcher(repository)),
            query = SearchAllMonitoredServicesQueryMother.random(),
            services = MonitoredServiceMother.randomList(undefined, query.statusFilter ? { status: query.statusFilter } : undefined),
            expected = SearchAllMonitoredServicesResponseMother.fromMonitoredServices(services);

        repository.whenSearchAllThenReturn(services);

        // eslint-disable-next-line one-var
        const response = await handler.handle(query);

        repository.assertSearchAllHasBeenCalledWith(query.statusFilter);
        expect(response).toStrictEqual(expected);
    });
});
