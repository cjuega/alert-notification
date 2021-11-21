import EventBusMock from '@ans/ctx-shared/__mocks__/eventBus.mock';
import AlertMother from '@src/alerts/domain/alert.mother';
import AlertNotFound from '@src/alerts/domain/alertNotFound';
import AlertRepositoryMock from '@src/alerts/__mocks__/alertRepository.mock';
import AlertAcknowledger from '@src/alerts/application/acknowledge/alertAcknowledger';
import AlertAcknowledgedDomainEventMother from '@src/alerts/domain/alertAcknowledgedDomainEvent.mother';
import AcknowledgeAlertCommandHandler from '@src/alerts/application/acknowledge/acknowledgeAlertCommandHandler';
import AcknowledgeAlertCommandMother from '@src/alerts/application/acknowledge/acknowledgeAlertCommand.mother';

describe('alertAcknowledger', () => {
    it("should throw a AlertNotFound when acknowledging an Alert that doesn't exist", async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new AcknowledgeAlertCommandHandler(new AlertAcknowledger(repository, eventBus)),
            command = AcknowledgeAlertCommandMother.random();

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

    it("should do nothing when the Alert wasn't pending", async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new AcknowledgeAlertCommandHandler(new AlertAcknowledger(repository, eventBus)),
            alert = AlertMother.notPendingAlert(),
            command = AcknowledgeAlertCommandMother.create({ id: alert.id.value });

        repository.whenSearchThenReturn(alert);

        await handler.handle(command);

        repository.assertNothingSaved();
    });

    it("should publish nothing when the Alert wasn't pending", async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new AcknowledgeAlertCommandHandler(new AlertAcknowledger(repository, eventBus)),
            alert = AlertMother.notPendingAlert(),
            command = AcknowledgeAlertCommandMother.create({ id: alert.id.value });

        repository.whenSearchThenReturn(alert);

        await handler.handle(command);

        eventBus.assertNothingPublished();
    });

    it('should acknowledge the Alert when it was pending', async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new AcknowledgeAlertCommandHandler(new AlertAcknowledger(repository, eventBus)),
            alert = AlertMother.pendingAlert(),
            command = AcknowledgeAlertCommandMother.create({ id: alert.id.value }),
            expected = AlertMother.acknowledge(alert);

        repository.whenSearchThenReturn(alert);

        await handler.handle(command);

        repository.assertSaveHasBeenCalledWith(expected);
    });

    it('should publish a AlertAcknowledgedDomainEvent when the Alert was pending', async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            eventBus = new EventBusMock(),
            handler = new AcknowledgeAlertCommandHandler(new AlertAcknowledger(repository, eventBus)),
            alert = AlertMother.pendingAlert(),
            command = AcknowledgeAlertCommandMother.create({ id: alert.id.value }),
            expected = AlertAcknowledgedDomainEventMother.fromAlert(AlertMother.acknowledge(alert));

        repository.whenSearchThenReturn(alert);

        await handler.handle(command);

        eventBus.assertLastPublishedEventIs(expected);
    });
});
