import ClockMock from '@ans/ctx-shared/__mocks__/clock.mock';
import QueryBusMock from '@ans/ctx-shared/__mocks__/queryBus.mock';
import EventBusMock from '@ans/ctx-shared/__mocks__/eventBus.mock';
import AlertRepositoryMock from '@src/alerts/__mocks__/alertRepository.mock';
import AlertCreator from '@src/alerts/application/create/alertCreator';
import AlertMother from '@src/alerts/domain/alert.mother';
import AlertAlreadyExists from '@src/alerts/domain/alertAlreadyExists';
import AlertCreatedDomainEventMother from '@src/alerts/domain/alertCreatedDomainEvent.mother';
import AnotherAlertPending from '@src/alerts/domain/anotherAlertPending';
import FindMonitoredServiceResponseMother from '@src/monitoredServices/application/find/findMonitoredServiceResponse.mother';
import MonitoredServiceNotFound from '@src/monitoredServices/domain/monitoredServiceNotFound';
import AlertEscalationPolicyMother from '@src/alerts/domain/alertEscalationPolicy.mother';
import AlertEscalatedDomainEventMother from '@src/alerts/domain/alertEscalatedDomainEvent.mother';
import CreateAlertCommandMother from '@src/alerts/application/create/createAlertCommand.mother';
import CreateAlertCommandHandler from '@src/alerts/application/create/createAlertCommandHandler';

describe('alertCreator', () => {
    it('should throw an AlertAlreadyExists when creating an Alert which id already exists', async () => {
        expect.hasAssertions();

        const queryBus = new QueryBusMock(),
            repository = new AlertRepositoryMock(),
            clock = new ClockMock(),
            eventBus = new EventBusMock(),
            handler = new CreateAlertCommandHandler(new AlertCreator(queryBus, repository, clock, eventBus)),
            alert = AlertMother.random(),
            command = CreateAlertCommandMother.random({ id: alert.id.value });

        repository.whenSearchThenReturn(alert);
        repository.whenSearchPendingByServiceThenReturn(null);

        let error;

        try {
            await handler.handle(command);
        } catch (e) {
            error = e;
        } finally {
            expect(error).toBeInstanceOf(AlertAlreadyExists);
        }
    });

    it('should throw an AnotherAlertPending when creating an Alert which MonitoredService has a pending alert', async () => {
        expect.hasAssertions();

        const queryBus = new QueryBusMock(),
            repository = new AlertRepositoryMock(),
            clock = new ClockMock(),
            eventBus = new EventBusMock(),
            handler = new CreateAlertCommandHandler(new AlertCreator(queryBus, repository, clock, eventBus)),
            alert = AlertMother.random(),
            command = CreateAlertCommandMother.random({ serviceId: alert.serviceId.value });

        repository.whenSearchThenReturn(null);
        repository.whenSearchPendingByServiceThenReturn(alert);

        let error;

        try {
            await handler.handle(command);
        } catch (e) {
            error = e;
        } finally {
            expect(error).toBeInstanceOf(AnotherAlertPending);
        }
    });

    it("should throw a MonitoredServiceNotFound when creating an Alert which serviceId doesn't exist", async () => {
        expect.hasAssertions();

        const queryBus = new QueryBusMock(),
            repository = new AlertRepositoryMock(),
            clock = new ClockMock(),
            eventBus = new EventBusMock(),
            handler = new CreateAlertCommandHandler(new AlertCreator(queryBus, repository, clock, eventBus)),
            command = CreateAlertCommandMother.random();

        repository.whenSearchThenReturn(null);
        repository.whenSearchPendingByServiceThenReturn(null);
        queryBus.whenAskThenThrow(new MonitoredServiceNotFound(command.serviceId));

        let error;

        try {
            await handler.handle(command);
        } catch (e) {
            error = e;
        } finally {
            expect(error).toBeInstanceOf(MonitoredServiceNotFound);
        }
    });

    it('should create a valid Alert', async () => {
        expect.hasAssertions();

        const queryBus = new QueryBusMock(),
            repository = new AlertRepositoryMock(),
            clock = new ClockMock(),
            eventBus = new EventBusMock(),
            handler = new CreateAlertCommandHandler(new AlertCreator(queryBus, repository, clock, eventBus)),
            command = CreateAlertCommandMother.random(),
            findMonitoredServiceResponse = FindMonitoredServiceResponseMother.random(),
            escalationPolicy = AlertEscalationPolicyMother.initFromFindMonitoredServiceResponse(findMonitoredServiceResponse),
            expected = CreateAlertCommandMother.applyCommand(command, { escalationPolicy });

        repository.whenSearchThenReturn(null);
        repository.whenSearchPendingByServiceThenReturn(null);
        queryBus.whenAskThenReturn(findMonitoredServiceResponse);
        clock.whenNowThenReturn(expected.createdAt);

        await handler.handle(command);

        repository.assertSaveHasBeenCalledWith(expected);
    });

    it('should publish an AlertCreatedDomainEvent and an AlertEscalatedDomainEvent', async () => {
        expect.hasAssertions();

        const queryBus = new QueryBusMock(),
            repository = new AlertRepositoryMock(),
            clock = new ClockMock(),
            eventBus = new EventBusMock(),
            handler = new CreateAlertCommandHandler(new AlertCreator(queryBus, repository, clock, eventBus)),
            command = CreateAlertCommandMother.random(),
            findMonitoredServiceResponse = FindMonitoredServiceResponseMother.random(),
            escalationPolicy = AlertEscalationPolicyMother.initFromFindMonitoredServiceResponse(findMonitoredServiceResponse),
            alert = CreateAlertCommandMother.applyCommand(command, { escalationPolicy }),
            expected = [AlertCreatedDomainEventMother.fromAlert(alert), AlertEscalatedDomainEventMother.fromAlert(alert)];

        repository.whenSearchThenReturn(null);
        repository.whenSearchPendingByServiceThenReturn(null);
        queryBus.whenAskThenReturn(findMonitoredServiceResponse);
        clock.whenNowThenReturn(alert.createdAt);

        await handler.handle(command);

        eventBus.assertLastPublishedEventsAre(expected);
    });
});
