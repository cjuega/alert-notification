import MonitoredServiceRepositoryMock from '@src/monitoredServices/__mocks__/monitoredServiceRepository.mock';
import MonitoredServiceFinder from '@src/monitoredServices/application/find/monitoredServiceFinder';
import MonitoredServiceIdMother from '@src/shared/domain/monitoredServiceId.mother';
import MonitoredServiceNotFound from '@src/monitoredServices/domain/monitoredServiceNotFound';
import MonitoredServiceMother from '@src/monitoredServices/domain/monitoredService.mother';
import FindMonitoredServiceResponseMother from '@src/monitoredServices/application/find/findMonitoredServiceResponse.mother';

describe('monitoredServiceFinder', () => {
    it("should throw a MonitoredServiceNotFound when the MonitoredService doesn't exist", async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            useCase = new MonitoredServiceFinder(repository);

        repository.whenSearchThenReturn(null);

        let error;

        try {
            await useCase.run(MonitoredServiceIdMother.random());
        } catch (e) {
            error = e;
        } finally {
            expect(error).toBeInstanceOf(MonitoredServiceNotFound);
        }
    });

    it('should return an existing MonitoredService', async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            useCase = new MonitoredServiceFinder(repository),
            service = MonitoredServiceMother.random(),
            expected = FindMonitoredServiceResponseMother.fromMonitoredService(service);

        repository.whenSearchThenReturn(service);

        // eslint-disable-next-line one-var
        const response = await useCase.run(service.id);

        repository.assertSearchHasBeenCalledWith(service.id);
        expect(response).toStrictEqual(expected);
    });
});
