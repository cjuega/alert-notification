import ClockMock from '@ans/ctx-shared/__mocks__/clock.mock';
import EventBusMock from '@ans/ctx-shared/__mocks__/eventBus.mock';
import AlertRepositoryMock from '@src/alerts/__mocks__/alertRepository.mock';
import AlertMother from '@src/alerts/domain/alert.mother';
import AlertIdMother from '@src/alerts/domain/alertId.mother';
import AlertNotFound from '@src/alerts/domain/alertNotFound';
import AlertResolver from '@src/alerts/application/resolve/alertResolver';
import DatetimeMother from '@ans/ctx-shared/domain/datetime.mother';
import AlertResolvedDomainEventMother from '@src/alerts/domain/alertResolvedDomainEvent.mother';

describe('alertResolver', () => {
    it("should throw a AlertNotFound when resolving an Alert that doesn't exist", async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            clock = new ClockMock(),
            eventBus = new EventBusMock(),
            useCase = new AlertResolver(repository, clock, eventBus);

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
            clock = new ClockMock(),
            eventBus = new EventBusMock(),
            useCase = new AlertResolver(repository, clock, eventBus),
            alert = AlertMother.resolvedAlert();

        repository.whenSearchThenReturn(alert);

        await useCase.run(alert.id);

        repository.assertNothingSaved();
    });

    it('should publish nothing when the Alert was already resolved', async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            clock = new ClockMock(),
            eventBus = new EventBusMock(),
            useCase = new AlertResolver(repository, clock, eventBus),
            alert = AlertMother.resolvedAlert();

        repository.whenSearchThenReturn(alert);

        await useCase.run(alert.id);

        eventBus.assertNothingPublished();
    });

    it("should update the Alert when it wasn't resolved yet", async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            clock = new ClockMock(),
            eventBus = new EventBusMock(),
            useCase = new AlertResolver(repository, clock, eventBus),
            alert = AlertMother.pendingAlert(),
            resolvedAt = DatetimeMother.random(),
            expected = AlertMother.resolve(alert, resolvedAt);

        repository.whenSearchThenReturn(alert);
        clock.whenNowThenReturn(resolvedAt);

        await useCase.run(alert.id);

        repository.assertSaveHasBeenCalledWith(expected);
    });

    it("should publish a AlertStatusChangedDomainEvent when the Alert wasn't resolved yet", async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            clock = new ClockMock(),
            eventBus = new EventBusMock(),
            useCase = new AlertResolver(repository, clock, eventBus),
            alert = AlertMother.pendingAlert(),
            resolvedAt = DatetimeMother.random(),
            expected = AlertResolvedDomainEventMother.fromAlert(AlertMother.resolve(alert, resolvedAt));

        repository.whenSearchThenReturn(alert);
        clock.whenNowThenReturn(resolvedAt);

        await useCase.run(alert.id);

        eventBus.assertLastPublishedEventIs(expected);
    });
});
