import MotherCreator from '@ans/ctx-shared/domain/motherCreator.mother';
import EventBusMock from '@ans/ctx-shared/__mocks__/eventBus.mock';
import MonitoredServiceRepositoryMock from '@src/monitoredServices/__mocks__/monitoredServiceRepository.mock';
import MonitoredServiceIdMother from '@src/shared/domain/monitoredServiceId.mother';
import MonitoredServiceNotFound from '@src/monitoredServices/domain/monitoredServiceNotFound';
import MonitoredServiceUpdater from '@src/monitoredServices/application/update/monitoredServiceUpdater';
import MonitoredServiceNameMother from '@src/monitoredServices/domain/monitoredServiceName.mother';
import EscalationPolicyMother from '@src/shared/domain/escalationPolicies/escalationPolicy.mother';
import MonitoredServiceMother from '@src/monitoredServices/domain/monitoredService.mother';
import MonitoredServiceUpdatedDomainEventMother from '@src/monitoredServices/domain/monitoredServiceUpdatedDomainEvent.mother';

describe('monitoredServiceUpdater', () => {
    it("should throw a MonitoredServiceNotFound when updating a MonitoredService that doesn't exist", async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            eventBus = new EventBusMock(),
            useCase = new MonitoredServiceUpdater(repository, eventBus);

        repository.whenSearchThenReturn(null);

        let error;

        try {
            await useCase.run(MonitoredServiceIdMother.random(), {});
        } catch (e) {
            error = e;
        } finally {
            expect(error).toBeInstanceOf(MonitoredServiceNotFound);
        }
    });

    it('should update an existing MonitoredService', async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            eventBus = new EventBusMock(),
            useCase = new MonitoredServiceUpdater(repository, eventBus),
            service = MonitoredServiceMother.random(),
            updates = {
                name: MotherCreator.boolean() ? MonitoredServiceNameMother.random() : undefined,
                escalationPolicy: MotherCreator.boolean() ? EscalationPolicyMother.random() : undefined
            },
            expected = MonitoredServiceMother.applyUpdates(service, updates);

        repository.whenSearchThenReturn(service);

        await useCase.run(service.id, updates);

        repository.assertSaveHasBeenCalledWith(expected);
    });

    it('should publish a MonitoredServiceStatusChangedDomainEvent', async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            eventBus = new EventBusMock(),
            useCase = new MonitoredServiceUpdater(repository, eventBus),
            service = MonitoredServiceMother.random(),
            updates = {
                name: MotherCreator.boolean() ? MonitoredServiceNameMother.random() : undefined,
                escalationPolicy: MotherCreator.boolean() ? EscalationPolicyMother.random() : undefined
            },
            expected = MonitoredServiceUpdatedDomainEventMother.fromMonitoredService(MonitoredServiceMother.applyUpdates(service, updates));

        repository.whenSearchThenReturn(service);

        await useCase.run(service.id, updates);

        eventBus.assertLastPublishedEventIs(expected);
    });
});
