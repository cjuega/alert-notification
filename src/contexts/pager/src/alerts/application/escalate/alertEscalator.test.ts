import EventBusMock from '@ans/ctx-shared/__mocks__/eventBus.mock';
import AlertMother from '@src/alerts/domain/alert.mother';
import AlertNotFound from '@src/alerts/domain/alertNotFound';
import AlertRepositoryMock from '@src/alerts/__mocks__/alertRepository.mock';
import AlertEscalator from '@src/alerts/application/escalate/alertEscalator';
import AlertEscalatedDomainEventMother from '@src/alerts/domain/alertEscalatedDomainEvent.mother';
import AlertStatus from '@src/alerts/domain/alertStatus';
import EscalateAlertCommandMother from '@src/alerts/application/escalate/escalateAlertCommand.mother';
import EscalateAlertCommandHandler from '@src/alerts/application/escalate/escalateAlertCommandHandler';

describe('alertEscalator', () => {
    it("should throw a AlertNotFound when escalating an Alert that doesn't exist", async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new EscalateAlertCommandHandler(new AlertEscalator(repository, eventBus)),
            command = EscalateAlertCommandMother.random();

        repository.whenSearchThenReturn(null);

        let error;

        try {
            await handler.handle(command);
        } catch (e) {
            error = e;
        } finally {
            expect(error).toBeInstanceOf(AlertNotFound);
        }
    });

    it('should do nothing when the Alert was already acknowledged', async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new EscalateAlertCommandHandler(new AlertEscalator(repository, eventBus)),
            alert = AlertMother.notPendingAlert(),
            command = EscalateAlertCommandMother.create({ id: alert.id.value });

        repository.whenSearchThenReturn(alert);

        await handler.handle(command);

        repository.assertNothingSaved();
    });

    it('should publish nothing when the Alert was already acknowledged', async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new EscalateAlertCommandHandler(new AlertEscalator(repository, eventBus)),
            alert = AlertMother.notPendingAlert(),
            command = EscalateAlertCommandMother.create({ id: alert.id.value });

        repository.whenSearchThenReturn(alert);

        await handler.handle(command);

        eventBus.assertNothingPublished();
    });

    it('should do nothing when the Alert has already reached its max EscalationLevel', async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new EscalateAlertCommandHandler(new AlertEscalator(repository, eventBus)),
            alert = AlertMother.maxEscalationReached(),
            command = EscalateAlertCommandMother.create({ id: alert.id.value });

        repository.whenSearchThenReturn(alert);

        await handler.handle(command);

        repository.assertNothingSaved();
    });

    it('should publish nothing when the Alert has already reached its max EscalationLevel', async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new EscalateAlertCommandHandler(new AlertEscalator(repository, eventBus)),
            alert = AlertMother.maxEscalationReached(),
            command = EscalateAlertCommandMother.create({ id: alert.id.value });

        repository.whenSearchThenReturn(alert);

        await handler.handle(command);

        eventBus.assertNothingPublished();
    });

    it("should escalate the Alert when it wasn't resolved and max EscalationLevel isn't reached", async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new EscalateAlertCommandHandler(new AlertEscalator(repository, eventBus)),
            alert = AlertMother.maxEscalationNotReached({ status: AlertStatus.Pending }),
            command = EscalateAlertCommandMother.create({ id: alert.id.value }),
            expected = AlertMother.escalate(alert);

        repository.whenSearchThenReturn(alert);

        await handler.handle(command);

        repository.assertSaveHasBeenCalledWith(expected);
    });

    it("should publish an AlertEscalatedDomainEvent when the Alert wasn't resolved and max EscalationLevel isn't reached", async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new EscalateAlertCommandHandler(new AlertEscalator(repository, eventBus)),
            alert = AlertMother.maxEscalationNotReached({ status: AlertStatus.Pending }),
            command = EscalateAlertCommandMother.create({ id: alert.id.value }),
            expected = AlertEscalatedDomainEventMother.fromAlert(AlertMother.escalate(alert));

        repository.whenSearchThenReturn(alert);

        await handler.handle(command);

        eventBus.assertLastPublishedEventIs(expected);
    });
});
