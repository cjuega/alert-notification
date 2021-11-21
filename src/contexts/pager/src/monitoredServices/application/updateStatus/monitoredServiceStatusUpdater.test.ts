import EventBusMock from '@ans/ctx-shared/__mocks__/eventBus.mock';
import CommandBusMock from '@ans/ctx-shared/__mocks__/commandBus.mock';
import MonitoredServiceRepositoryMock from '@src/monitoredServices/__mocks__/monitoredServiceRepository.mock';
import MonitoredServiceNotFound from '@src/monitoredServices/domain/monitoredServiceNotFound';
import MonitoredServiceStatusUpdater from '@src/monitoredServices/application/updateStatus/monitoredServiceStatusUpdater';
import MonitoredServiceMother from '@src/monitoredServices/domain/monitoredService.mother';
import MonitoredServiceStatusChangedDomainEventMother from '@src/monitoredServices/domain/monitoredServiceStatusChangedDomainEvent.mother';
// eslint-disable-next-line max-len
import UpdateMonitoredServiceStatusCommandMother from '@src/monitoredServices/application/updateStatus/updateMonitoredServiceStatusCommand.mother';
// eslint-disable-next-line max-len
import UpdateMonitoredServiceStatusCommandHandler from '@src/monitoredServices/application/updateStatus/updateMonitoredServiceStatusCommandHandler';
import UpdateToUnhealthyOnAlertCreated from '@src/monitoredServices/application/updateStatus/updateToUnhealthyOnAlertCreated';
import AlertCreatedDomainEventMother from '@src/alerts/domain/alertCreatedDomainEvent.mother';

describe('monitoredServiceStatusUpdater', () => {
    it('should update a MonitoredService to Unhealthy when an Alert is created for that MonitoredService', async () => {
        expect.hasAssertions();

        const commandBus = new CommandBusMock(),
            subscriber = new UpdateToUnhealthyOnAlertCreated(commandBus),
            domainEvent = AlertCreatedDomainEventMother.random(),
            expected = UpdateMonitoredServiceStatusCommandMother.unhealthy(domainEvent.serviceId);

        await subscriber.on(domainEvent);

        commandBus.assertLastDispatchedCommandIs(expected);
    });

    it("should throw a MonitoredServiceNotFound when updating a MonitoredService that doesn't exist", async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new UpdateMonitoredServiceStatusCommandHandler(new MonitoredServiceStatusUpdater(repository, eventBus)),
            command = UpdateMonitoredServiceStatusCommandMother.random();

        repository.whenSearchThenReturn(null);

        let error;

        try {
            await handler.handle(command);
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
            handler = new UpdateMonitoredServiceStatusCommandHandler(new MonitoredServiceStatusUpdater(repository, eventBus)),
            service = MonitoredServiceMother.random(),
            command = UpdateMonitoredServiceStatusCommandMother.fromMonitoredService(service);

        repository.whenSearchThenReturn(service);

        await handler.handle(command);

        repository.assertNothingSaved();
    });

    it("should publish nothing when the status doesn't change", async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new UpdateMonitoredServiceStatusCommandHandler(new MonitoredServiceStatusUpdater(repository, eventBus)),
            service = MonitoredServiceMother.random(),
            command = UpdateMonitoredServiceStatusCommandMother.fromMonitoredService(service);

        repository.whenSearchThenReturn(service);

        await handler.handle(command);

        eventBus.assertNothingPublished();
    });

    it('should update a MonitoredService when status changes', async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new UpdateMonitoredServiceStatusCommandHandler(new MonitoredServiceStatusUpdater(repository, eventBus)),
            service = MonitoredServiceMother.random(),
            command = UpdateMonitoredServiceStatusCommandMother.toggle(service),
            expected = UpdateMonitoredServiceStatusCommandMother.applyCommand(command, service);

        repository.whenSearchThenReturn(service);

        await handler.handle(command);

        repository.assertSaveHasBeenCalledWith(expected);
    });

    it('should publish a MonitoredServiceStatusChangedDomainEvent when status changes', async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new UpdateMonitoredServiceStatusCommandHandler(new MonitoredServiceStatusUpdater(repository, eventBus)),
            service = MonitoredServiceMother.random(),
            command = UpdateMonitoredServiceStatusCommandMother.toggle(service),
            expected = MonitoredServiceStatusChangedDomainEventMother.fromMonitoredService(
                UpdateMonitoredServiceStatusCommandMother.applyCommand(command, service)
            );

        repository.whenSearchThenReturn(service);

        await handler.handle(command);

        eventBus.assertLastPublishedEventIs(expected);
    });
});
