import EventBusMock from '@ans/ctx-shared/__mocks__/eventBus.mock';
import MonitoredServiceRepositoryMock from '@src/monitoredServices/__mocks__/monitoredServiceRepository.mock';
import MonitoredServiceIdMother from '@src/monitoredServices/domain/monitoredServiceId.mother';
import MonitoredServiceNotFound from '@src/monitoredServices/domain/monitoredServiceNotFound';
import MonitoredServiceStatusMother from '@src/monitoredServices/domain/monitoredServiceStatus.mother';
import MonitoredServiceStatusUpdater from '@src/monitoredServices/application/updateStatus/monitoredServiceStatusUpdater';
import MonitoredServiceMother from '@src/monitoredServices/domain/monitoredService.mother';
import MonitoredServiceStatusChangedDomainEventMother from '@src/monitoredServices/domain/monitoredServiceStatusChangedDomainEvent.mother';

describe('monitoredServiceStatusUpdater', () => {
    it("should throw a MonitoredServiceNotFound when updating a MonitoredService that doesn't exist", async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            eventBus = new EventBusMock(),
            useCase = new MonitoredServiceStatusUpdater(repository, eventBus);

        repository.whenSearchThenReturn(null);

        let error;

        try {
            await useCase.run(MonitoredServiceIdMother.random(), MonitoredServiceStatusMother.random());
        } catch (e) {
            error = e;
        } finally {
            expect(error).toBeInstanceOf(MonitoredServiceNotFound);
        }
    });

    it("should do nothing when the status doesn't change", async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            eventBus = new EventBusMock(),
            useCase = new MonitoredServiceStatusUpdater(repository, eventBus),
            service = MonitoredServiceMother.random();

        repository.whenSearchThenReturn(service);

        await useCase.run(service.id, service.status);

        repository.assertNothingSaved();
    });

    it("should publish nothing when the status doesn't change", async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            eventBus = new EventBusMock(),
            useCase = new MonitoredServiceStatusUpdater(repository, eventBus),
            service = MonitoredServiceMother.random();

        repository.whenSearchThenReturn(service);

        await useCase.run(service.id, service.status);

        eventBus.assertNothingPublished();
    });

    it('should update a MonitoredService when status changes', async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            eventBus = new EventBusMock(),
            useCase = new MonitoredServiceStatusUpdater(repository, eventBus),
            service = MonitoredServiceMother.random(),
            expected = MonitoredServiceMother.toggleStatus(service);

        repository.whenSearchThenReturn(service);

        await useCase.run(service.id, MonitoredServiceStatusMother.toggle(service.status));

        repository.assertSaveHasBeenCalledWith(expected);
    });

    it('should publish a MonitoredServiceStatusChangedDomainEvent when status changes', async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            eventBus = new EventBusMock(),
            useCase = new MonitoredServiceStatusUpdater(repository, eventBus),
            service = MonitoredServiceMother.random(),
            expected = MonitoredServiceStatusChangedDomainEventMother.fromMonitoredService(MonitoredServiceMother.toggleStatus(service));

        repository.whenSearchThenReturn(service);

        await useCase.run(service.id, MonitoredServiceStatusMother.toggle(service.status));

        eventBus.assertLastPublishedEventIs(expected);
    });
});
