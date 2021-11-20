import MonitoredServiceRepositoryMock from '@src/monitoredServices/__mocks__/monitoredServiceRepository.mock';
import MonitoredServiceRegistor from '@src/monitoredServices/application/register/monitoredServiceRegistor';
import MonitoredServiceMother from '@src/monitoredServices/domain/monitoredService.mother';
import MonitoredServiceStatus from '@src/monitoredServices/domain/monitoredServiceStatus';
import MonitoredServiceNameMother from '@src/monitoredServices/domain/monitoredServiceName.mother';
import InvalidArgumentError from '@ans/ctx-shared/domain/invalidArgumentError';
import MonitoredServiceAlreadyExists from '@src/monitoredServices/domain/monitoredServiceAlreadyExists';

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

    it('should throw an InvalidArgumentError when creating an invalid MonitoredService', async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            useCase = new MonitoredServiceRegistor(repository),
            { id, name } = MonitoredServiceMother.invalid();

        repository.whenSearchThenReturn(null);

        let error;

        try {
            await useCase.run(id, name);
        } catch (e) {
            error = e;
        } finally {
            expect(error).toBeInstanceOf(InvalidArgumentError);
        }
    });

    it('should throw a MonitoredServiceAlreadyExists when creating a MonitoredService which id already exists', async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            useCase = new MonitoredServiceRegistor(repository),
            monitoredService = MonitoredServiceMother.random();

        repository.whenSearchThenReturn(monitoredService);

        let error;

        try {
            await useCase.run(monitoredService.id.value, MonitoredServiceNameMother.random().value);
        } catch (e) {
            error = e;
        } finally {
            expect(error).toBeInstanceOf(MonitoredServiceAlreadyExists);
        }
    });
});
