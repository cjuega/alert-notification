import EventBusMock from '@ans/ctx-shared/__mocks__/eventBus.mock';
import MonitoredServiceRepositoryMock from '@src/monitoredServices/__mocks__/monitoredServiceRepository.mock';
import MonitoredServiceNotFound from '@src/monitoredServices/domain/monitoredServiceNotFound';
import MonitoredServiceUpdater from '@src/monitoredServices/application/update/monitoredServiceUpdater';
import MonitoredServiceMother from '@src/monitoredServices/domain/monitoredService.mother';
import MonitoredServiceUpdatedDomainEventMother from '@src/monitoredServices/domain/monitoredServiceUpdatedDomainEvent.mother';
import UpdateMonitoredServiceCommandMother from '@src/monitoredServices/application/update/updateMonitoredServiceCommand.mother';
import UpdateMonitoredServiceCommandHandler from '@src/monitoredServices/application/update/updateMonitoredServiceCommandHandler';
import InvalidArgumentError from '@ans/ctx-shared/domain/invalidArgumentError';

describe('monitoredServiceUpdater', () => {
    it('should throw an InvalidArgumentError when updating with invalid values', async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new UpdateMonitoredServiceCommandHandler(new MonitoredServiceUpdater(repository, eventBus)),
            command = UpdateMonitoredServiceCommandMother.invalid();

        repository.whenSearchThenReturn(null);

        let error;

        try {
            await handler.handle(command);
        } catch (e) {
            error = e;
        } finally {
            expect(error).toBeInstanceOf(InvalidArgumentError);
        }
    });

    it("should throw a MonitoredServiceNotFound when updating a MonitoredService that doesn't exist", async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new UpdateMonitoredServiceCommandHandler(new MonitoredServiceUpdater(repository, eventBus)),
            command = UpdateMonitoredServiceCommandMother.random();

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

    it('should update an existing MonitoredService', async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new UpdateMonitoredServiceCommandHandler(new MonitoredServiceUpdater(repository, eventBus)),
            service = MonitoredServiceMother.random(),
            command = UpdateMonitoredServiceCommandMother.random({ id: service.id.value }),
            expected = UpdateMonitoredServiceCommandMother.applyCommand(command, service);

        repository.whenSearchThenReturn(service);

        await handler.handle(command);

        repository.assertSaveHasBeenCalledWith(expected);
    });

    it('should publish a MonitoredServiceStatusChangedDomainEvent', async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new UpdateMonitoredServiceCommandHandler(new MonitoredServiceUpdater(repository, eventBus)),
            service = MonitoredServiceMother.random(),
            command = UpdateMonitoredServiceCommandMother.random({ id: service.id.value }),
            expected = MonitoredServiceUpdatedDomainEventMother.fromMonitoredService(
                UpdateMonitoredServiceCommandMother.applyCommand(command, service)
            );

        repository.whenSearchThenReturn(service);

        await handler.handle(command);

        eventBus.assertLastPublishedEventIs(expected);
    });
});
