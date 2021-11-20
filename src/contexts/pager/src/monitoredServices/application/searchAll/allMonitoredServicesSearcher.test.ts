import MonitoredServiceRepositoryMock from '@src/monitoredServices/__mocks__/monitoredServiceRepository.mock';
import AllMonitoredServicesSearcher from '@src/monitoredServices/application/searchAll/allMonitoredServicesSearcher';
import MonitoredServiceMother from '@src/monitoredServices/domain/monitoredService.mother';
// eslint-disable-next-line max-len
import SearchAllMonitoredServicesResponseMother from '@src/monitoredServices/application/searchAll/searchAllMonitoredServicesResponse.mother';
import MonitoredServiceStatusMother from '@src/monitoredServices/domain/monitoredServiceStatus.mother';

describe('allMonitoredServicesSearcher', () => {
    it('should return all MonitoredServices', async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            useCase = new AllMonitoredServicesSearcher(repository),
            services = MonitoredServiceMother.randomList(),
            expected = SearchAllMonitoredServicesResponseMother.fromMonitoredServices(services);

        repository.whenSearchAllThenReturn(services);

        // eslint-disable-next-line one-var
        const response = await useCase.run();

        repository.assertSearchAllHasBeenCalledWith();
        expect(response).toStrictEqual(expected);
    });

    it('should return MonitoredServices filtered by status', async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            useCase = new AllMonitoredServicesSearcher(repository),
            status = MonitoredServiceStatusMother.random(),
            services = MonitoredServiceMother.randomList(undefined, { status }),
            expected = SearchAllMonitoredServicesResponseMother.fromMonitoredServices(services);

        repository.whenSearchAllThenReturn(services);

        // eslint-disable-next-line one-var
        const response = await useCase.run(status);

        repository.assertSearchAllHasBeenCalledWith(status);
        expect(response).toStrictEqual(expected);
    });
});
