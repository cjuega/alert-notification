import EventBusMock from '@ans/ctx-shared/__mocks__/eventBus.mock';
import AlertMother from '@src/alerts/domain/alert.mother';
import AlertIdMother from '@src/alerts/domain/alertId.mother';
import AlertNotFound from '@src/alerts/domain/alertNotFound';
import AlertRepositoryMock from '@src/alerts/__mocks__/alertRepository.mock';
import AlertEscalator from '@src/alerts/application/escalate/alertEscalator';
import AlertEscalatedDomainEventMother from '@src/alerts/domain/alertEscalatedDomainEvent.mother';
import AlertStatus from '@src/alerts/domain/alertStatus';

describe('alertEscalator', () => {
    it("should throw a AlertNotFound when escalating an Alert that doesn't exist", async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            eventBus = new EventBusMock(),
            useCase = new AlertEscalator(repository, eventBus);

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

    it('should do nothing when the Alert was already resolved', async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            eventBus = new EventBusMock(),
            useCase = new AlertEscalator(repository, eventBus),
            alert = AlertMother.resolvedAlert();

        repository.whenSearchThenReturn(alert);

        await useCase.run(alert.id);

        repository.assertNothingSaved();
    });

    it('should publish nothing when the Alert was already resolved', async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            eventBus = new EventBusMock(),
            useCase = new AlertEscalator(repository, eventBus),
            alert = AlertMother.resolvedAlert();

        repository.whenSearchThenReturn(alert);

        await useCase.run(alert.id);

        eventBus.assertNothingPublished();
    });

    it('should do nothing when the Alert has already reached its max EscalationLevel', async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            eventBus = new EventBusMock(),
            useCase = new AlertEscalator(repository, eventBus),
            alert = AlertMother.maxEscalationReached();

        repository.whenSearchThenReturn(alert);

        await useCase.run(alert.id);

        repository.assertNothingSaved();
    });

    it('should publish nothing when the Alert has already reached its max EscalationLevel', async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            eventBus = new EventBusMock(),
            useCase = new AlertEscalator(repository, eventBus),
            alert = AlertMother.maxEscalationReached();

        repository.whenSearchThenReturn(alert);

        await useCase.run(alert.id);

        eventBus.assertNothingPublished();
    });

    it("should escalate the Alert when it wasn't resolved and max EscalationLevel isn't reached", async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            eventBus = new EventBusMock(),
            useCase = new AlertEscalator(repository, eventBus),
            alert = AlertMother.maxEscalationNotReached({ status: AlertStatus.Pending }),
            expected = AlertMother.escalate(alert);

        repository.whenSearchThenReturn(alert);

        await useCase.run(alert.id);

        repository.assertSaveHasBeenCalledWith(expected);
    });

    it("should publish an AlertEscalatedDomainEvent when the Alert wasn't resolved and max EscalationLevel isn't reached", async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            eventBus = new EventBusMock(),
            useCase = new AlertEscalator(repository, eventBus),
            alert = AlertMother.maxEscalationNotReached({ status: AlertStatus.Pending }),
            expected = AlertEscalatedDomainEventMother.fromAlert(AlertMother.escalate(alert));

        repository.whenSearchThenReturn(alert);

        await useCase.run(alert.id);

        eventBus.assertLastPublishedEventIs(expected);
    });
});
