import EventBusMock from '@ans/ctx-shared/__mocks__/eventBus.mock';
import AlertMother from '@src/alerts/domain/alert.mother';
import AlertIdMother from '@src/alerts/domain/alertId.mother';
import AlertNotFound from '@src/alerts/domain/alertNotFound';
import AlertRepositoryMock from '@src/alerts/__mocks__/alertRepository.mock';
import AlertAcknowledger from '@src/alerts/application/acknowledge/alertAcknowledger';
import AlertAcknowledgedDomainEventMother from '@src/alerts/domain/alertAcknowledgedDomainEvent.mother';

describe('alertAcknowledger', () => {
    it("should throw a AlertNotFound when acknowledging an Alert that doesn't exist", async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            eventBus = new EventBusMock(),
            useCase = new AlertAcknowledger(repository, eventBus);

        repository.whenSearchThenReturn(null);

        let error;

        try {
            await useCase.run(AlertIdMother.random());
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
            useCase = new AlertAcknowledger(repository, eventBus),
            alert = AlertMother.notPendingAlert();

        repository.whenSearchThenReturn(alert);

        await useCase.run(alert.id);

        repository.assertNothingSaved();
    });

    it("should publish nothing when the Alert wasn't pending", async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            eventBus = new EventBusMock(),
            useCase = new AlertAcknowledger(repository, eventBus),
            alert = AlertMother.notPendingAlert();

        repository.whenSearchThenReturn(alert);

        await useCase.run(alert.id);

        eventBus.assertNothingPublished();
    });

    it('should acknowledge the Alert when it was pending', async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            eventBus = new EventBusMock(),
            useCase = new AlertAcknowledger(repository, eventBus),
            alert = AlertMother.pendingAlert(),
            expected = AlertMother.acknowledge(alert);

        repository.whenSearchThenReturn(alert);

        await useCase.run(alert.id);

        repository.assertSaveHasBeenCalledWith(expected);
    });

    it('should publish a AlertAcknowledgedDomainEvent when the Alert was pending', async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            eventBus = new EventBusMock(),
            useCase = new AlertAcknowledger(repository, eventBus),
            alert = AlertMother.pendingAlert(),
            expected = AlertAcknowledgedDomainEventMother.fromAlert(AlertMother.acknowledge(alert));

        repository.whenSearchThenReturn(alert);

        await useCase.run(alert.id);

        eventBus.assertLastPublishedEventIs(expected);
    });
});
