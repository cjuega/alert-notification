import MonitoredServiceRepositoryMock from '@src/monitoredServices/__mocks__/monitoredServiceRepository.mock';
import MonitoredServiceRegistor from '@src/monitoredServices/application/register/monitoredServiceRegistor';
import MonitoredServiceMother from '@src/monitoredServices/domain/monitoredService.mother';
import MonitoredServiceStatus from '@src/monitoredServices/domain/monitoredServiceStatus';

describe('monitoredServiceRegistor', () => {
    it('should create a valid MonitoredService', async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            useCase = new MonitoredServiceRegistor(repository),
            expected = MonitoredServiceMother.random({ status: MonitoredServiceStatus.Healthy });

        repository.whenSearchThenReturn(null);

        await useCase.run(expected.id.value, expected.name.value);

        repository.assertSaveHasBeenCalledWith(expected);
    });
});
