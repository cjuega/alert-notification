import MonitoredServiceRepositoryMock from '@src/monitoredServices/__mocks__/monitoredServiceRepository.mock';
import EventBusMock from '@ans/ctx-shared/__mocks__/eventBus.mock';
import RegisterMonitoredServiceCommandMother from '@src/monitoredServices/application/register/registerMonitoredServiceCommand.mother';
import RegisterMonitoredServiceCommandHandler from '@src/monitoredServices/application/register/registerMonitoredServiceCommandHandler';
import MonitoredServiceRegistor from '@src/monitoredServices/application/register/monitoredServiceRegistor';
import MonitoredServiceMother from '@src/monitoredServices/domain/monitoredService.mother';
import MonitoredServiceAlreadyExists from '@src/monitoredServices/domain/monitoredServiceAlreadyExists';
import MonitoredServiceCreatedDomainEventMother from '@src/monitoredServices/domain/monitoredServiceCreatedDomainEvent.mother';
import InvalidArgumentError from '@ans/ctx-shared/domain/invalidArgumentError';

describe('monitoredServiceRegistor', () => {
    it('should throw an InvalidArgumentError when creating an invalid MonitoredService', async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new RegisterMonitoredServiceCommandHandler(new MonitoredServiceRegistor(repository, eventBus)),
            command = RegisterMonitoredServiceCommandMother.invalid();

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

    it('should throw a MonitoredServiceAlreadyExists when creating a MonitoredService which id already exists', async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new RegisterMonitoredServiceCommandHandler(new MonitoredServiceRegistor(repository, eventBus)),
            monitoredService = MonitoredServiceMother.random(),
            command = RegisterMonitoredServiceCommandMother.random({ id: monitoredService.id.value });

        repository.whenSearchThenReturn(monitoredService);

        let error;

        try {
            await handler.handle(command);
        } catch (e) {
            error = e;
        } finally {
            expect(error).toBeInstanceOf(MonitoredServiceAlreadyExists);
        }
    });

    it('should create a valid MonitoredService', async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new RegisterMonitoredServiceCommandHandler(new MonitoredServiceRegistor(repository, eventBus)),
            command = RegisterMonitoredServiceCommandMother.random(),
            expected = RegisterMonitoredServiceCommandMother.applyCommand(command);

        repository.whenSearchThenReturn(null);

        await handler.handle(command);

        repository.assertSaveHasBeenCalledWith(expected);
    });

    it('should publish a MonitoredServiceCreatedDomainEvent', async () => {
        expect.hasAssertions();

        const repository = new MonitoredServiceRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new RegisterMonitoredServiceCommandHandler(new MonitoredServiceRegistor(repository, eventBus)),
            command = RegisterMonitoredServiceCommandMother.random(),
            expected = MonitoredServiceCreatedDomainEventMother.fromMonitoredService(
                RegisterMonitoredServiceCommandMother.applyCommand(command)
            );

        repository.whenSearchThenReturn(null);

        await handler.handle(command);

        eventBus.assertLastPublishedEventIs(expected);
    });
});
