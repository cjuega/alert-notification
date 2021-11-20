import MonitoredServiceRepositoryMock from '@src/monitoredServices/__mocks__/monitoredServiceRepository.mock';
import MonitoredServiceRegistor from '@src/monitoredServices/application/register/monitoredServiceRegistor';
import MonitoredServiceMother from '@src/monitoredServices/domain/monitoredService.mother';

describe('monitoredServiceRegistor', () => {
    it('should create a valid MonitoredService', async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            useCase = new MonitoredServiceRegistor(repository),
            expected = MonitoredServiceMother.random();

        repository.whenSearchThenReturn(null);

        await useCase.run(expected.id.value);

        repository.assertSaveHasBeenCalledWith(expected);
    });
});
