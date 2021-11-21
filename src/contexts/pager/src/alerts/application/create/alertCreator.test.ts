import ClockMock from '@ans/ctx-shared/__mocks__/clock.mock';
import QueryBusMock from '@ans/ctx-shared/__mocks__/queryBus.mock';
import EventBusMock from '@ans/ctx-shared/__mocks__/eventBus.mock';
import AlertRepositoryMock from '@src/alerts/__mocks__/alertRepository.mock';
import AlertCreator from '@src/alerts/application/create/alertCreator';
import AlertMother from '@src/alerts/domain/alert.mother';
import AlertAlreadyExists from '@src/alerts/domain/alertAlreadyExists';
import AlertMessageMother from '@src/alerts/domain/alertMessage.mother';
import AlertCreatedDomainEventMother from '@src/alerts/domain/alertCreatedDomainEvent.mother';
import AlertIdMother from '@src/alerts/domain/alertId.mother';
import AnotherAlertPending from '@src/alerts/domain/anotherAlertPending';
import MonitoredServiceIdMother from '@src/shared/domain/monitoredServiceId.mother';
import FindMonitoredServiceResponseMother from '@src/monitoredServices/application/find/findMonitoredServiceResponse.mother';
import MonitoredServiceNotFound from '@src/monitoredServices/domain/monitoredServiceNotFound';
import AlertEscalationPolicyMother from '@src/alerts/domain/alertEscalationPolicy.mother';
import AlertEscalatedDomainEventMother from '@src/alerts/domain/alertEscalatedDomainEvent.mother';

describe('alertCreator', () => {
    it('should create a valid Alert', async () => {
        expect.hasAssertions();

        const queryBus = new QueryBusMock(),
            repository = new AlertRepositoryMock(),
            clock = new ClockMock(),
            eventBus = new EventBusMock(),
            useCase = new AlertCreator(queryBus, repository, clock, eventBus),
            findMonitoredServiceResponse = FindMonitoredServiceResponseMother.random(),
            escalationPolicy = AlertEscalationPolicyMother.initFromFindMonitoredServiceResponse(findMonitoredServiceResponse),
            expected = AlertMother.pendingAlert({ escalationPolicy });

        repository.whenSearchThenReturn(null);
        repository.whenSearchPendingByServiceThenReturn(null);
        queryBus.whenAskThenReturn(findMonitoredServiceResponse);
        clock.whenNowThenReturn(expected.createdAt);

        await useCase.run(expected.id, expected.serviceId, expected.message);

        repository.assertSaveHasBeenCalledWith(expected);
    });

    it('should throw an AlertAlreadyExists when creating an Alert which id already exists', async () => {
        expect.hasAssertions();

        const queryBus = new QueryBusMock(),
            repository = new AlertRepositoryMock(),
            clock = new ClockMock(),
            eventBus = new EventBusMock(),
            useCase = new AlertCreator(queryBus, repository, clock, eventBus),
            alert = AlertMother.random();

        repository.whenSearchThenReturn(alert);
        repository.whenSearchPendingByServiceThenReturn(null);

        let error;

        try {
            await useCase.run(alert.id, MonitoredServiceIdMother.random(), AlertMessageMother.random());
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
            useCase = new AlertCreator(queryBus, repository, clock, eventBus),
            alert = AlertMother.random();

        repository.whenSearchThenReturn(null);
        repository.whenSearchPendingByServiceThenReturn(alert);

        let error;

        try {
            await useCase.run(AlertIdMother.random(), alert.serviceId, AlertMessageMother.random());
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
            useCase = new AlertCreator(queryBus, repository, clock, eventBus),
            alert = AlertMother.random();

        repository.whenSearchThenReturn(null);
        repository.whenSearchPendingByServiceThenReturn(null);
        queryBus.whenAskThenThrow(new MonitoredServiceNotFound(alert.serviceId.value));

        let error;

        try {
            await useCase.run(alert.id, alert.serviceId, AlertMessageMother.random());
        } catch (e) {
            error = e;
        } finally {
            expect(error).toBeInstanceOf(MonitoredServiceNotFound);
        }
    });

    it('should publish an AlertCreatedDomainEvent and an AlertEscalatedDomainEvent', async () => {
        expect.hasAssertions();

        const queryBus = new QueryBusMock(),
            repository = new AlertRepositoryMock(),
            clock = new ClockMock(),
            eventBus = new EventBusMock(),
            useCase = new AlertCreator(queryBus, repository, clock, eventBus),
            findMonitoredServiceResponse = FindMonitoredServiceResponseMother.random(),
            escalationPolicy = AlertEscalationPolicyMother.initFromFindMonitoredServiceResponse(findMonitoredServiceResponse),
            alert = AlertMother.pendingAlert({ escalationPolicy }),
            expected = [AlertCreatedDomainEventMother.fromAlert(alert), AlertEscalatedDomainEventMother.fromAlert(alert)];

        repository.whenSearchThenReturn(null);
        repository.whenSearchPendingByServiceThenReturn(null);
        queryBus.whenAskThenReturn(findMonitoredServiceResponse);
        clock.whenNowThenReturn(alert.createdAt);

        await useCase.run(alert.id, alert.serviceId, alert.message);

        eventBus.assertLastPublishedEventsAre(expected);
    });
});
