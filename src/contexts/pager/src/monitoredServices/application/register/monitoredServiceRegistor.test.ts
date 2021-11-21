import MonitoredServiceRepositoryMock from '@src/monitoredServices/__mocks__/monitoredServiceRepository.mock';
import EventBusMock from '@ans/ctx-shared/__mocks__/eventBus.mock';
import MonitoredServiceRegistor from '@src/monitoredServices/application/register/monitoredServiceRegistor';
import MonitoredServiceMother from '@src/monitoredServices/domain/monitoredService.mother';
import MonitoredServiceStatus from '@src/monitoredServices/domain/monitoredServiceStatus';
import MonitoredServiceNameMother from '@src/monitoredServices/domain/monitoredServiceName.mother';
import MonitoredServiceAlreadyExists from '@src/monitoredServices/domain/monitoredServiceAlreadyExists';
import EscalationPolicyMother from '@src/shared/domain/escalationPolicies/escalationPolicy.mother';
import MonitoredServiceCreatedDomainEventMother from '@src/monitoredServices/domain/monitoredServiceCreatedDomainEvent.mother';

describe('monitoredServiceRegistor', () => {
    it('should create a valid MonitoredService', async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            eventBus = new EventBusMock(),
            useCase = new MonitoredServiceRegistor(repository, eventBus),
            expected = MonitoredServiceMother.random({ status: MonitoredServiceStatus.Healthy });

        repository.whenSearchThenReturn(null);

        await useCase.run(expected.id, expected.name, expected.escalationPolicy);

        repository.assertSaveHasBeenCalledWith(expected);
    });

    // FIXME: uncomment when Controllers and Use cases are decoupled with Command/Query buses. Otherwise, this is an e2e test
    // eslint-disable-next-line jest/no-commented-out-tests
    // it('should throw an InvalidArgumentError when creating an invalid MonitoredService', async () => {
    //     expect.hasAssertions();

    //     const repository = new MonitoredServiceRepositoryMock(),
    //         eventBus = new EventBusMock(),
    //         useCase = new MonitoredServiceRegistor(repository, eventBus),
    //         { id, name } = MonitoredServiceMother.invalid();

    //     repository.whenSearchThenReturn(null);

    //     let error;

    //     try {
    //         await useCase.run(id, name, EscalationPolicyMother.random());
    //     } catch (e) {
    //         error = e;
    //     } finally {
    //         expect(error).toBeInstanceOf(InvalidArgumentError);
    //     }
    // });

    it('should throw a MonitoredServiceAlreadyExists when creating a MonitoredService which id already exists', async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            eventBus = new EventBusMock(),
            useCase = new MonitoredServiceRegistor(repository, eventBus),
            monitoredService = MonitoredServiceMother.random();

        repository.whenSearchThenReturn(monitoredService);

        let error;

        try {
            await useCase.run(monitoredService.id, MonitoredServiceNameMother.random(), EscalationPolicyMother.random());
        } catch (e) {
            error = e;
        } finally {
            expect(error).toBeInstanceOf(MonitoredServiceAlreadyExists);
        }
    });

    it('should publish a MonitoredServiceCreatedDomainEvent', async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            eventBus = new EventBusMock(),
            useCase = new MonitoredServiceRegistor(repository, eventBus),
            monitoredService = MonitoredServiceMother.random({ status: MonitoredServiceStatus.Healthy }),
            expected = MonitoredServiceCreatedDomainEventMother.fromMonitoredService(monitoredService);

        repository.whenSearchThenReturn(null);

        await useCase.run(monitoredService.id, monitoredService.name, monitoredService.escalationPolicy);

        eventBus.assertLastPublishedEventIs(expected);
    });
});
