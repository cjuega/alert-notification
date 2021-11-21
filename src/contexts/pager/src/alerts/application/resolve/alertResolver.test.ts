import ClockMock from '@ans/ctx-shared/__mocks__/clock.mock';
import EventBusMock from '@ans/ctx-shared/__mocks__/eventBus.mock';
import AlertRepositoryMock from '@src/alerts/__mocks__/alertRepository.mock';
import AlertMother from '@src/alerts/domain/alert.mother';
import AlertNotFound from '@src/alerts/domain/alertNotFound';
import AlertResolver from '@src/alerts/application/resolve/alertResolver';
import DatetimeMother from '@ans/ctx-shared/domain/datetime.mother';
import AlertResolvedDomainEventMother from '@src/alerts/domain/alertResolvedDomainEvent.mother';
import ResolveAlertCommandMother from '@src/alerts/application/resolve/resolveAlertCommand.mother';
import ResolveAlertCommandHandler from '@src/alerts/application/resolve/resolveAlertCommandHandler';

describe('alertResolver', () => {
    it("should throw a AlertNotFound when resolving an Alert that doesn't exist", async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            clock = new ClockMock(),
            eventBus = new EventBusMock(),
            handler = new ResolveAlertCommandHandler(new AlertResolver(repository, clock, eventBus)),
            command = ResolveAlertCommandMother.random();

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

    it('should do nothing when the Alert was already resolved', async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            clock = new ClockMock(),
            eventBus = new EventBusMock(),
            handler = new ResolveAlertCommandHandler(new AlertResolver(repository, clock, eventBus)),
            alert = AlertMother.resolvedAlert(),
            command = ResolveAlertCommandMother.create({ id: alert.id.value });

        repository.whenSearchThenReturn(alert);

        await handler.handle(command);

        repository.assertNothingSaved();
    });

    it('should publish nothing when the Alert was already resolved', async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            clock = new ClockMock(),
            eventBus = new EventBusMock(),
            handler = new ResolveAlertCommandHandler(new AlertResolver(repository, clock, eventBus)),
            alert = AlertMother.resolvedAlert(),
            command = ResolveAlertCommandMother.create({ id: alert.id.value });

        repository.whenSearchThenReturn(alert);

        await handler.handle(command);

        eventBus.assertNothingPublished();
    });

    it("should update the Alert when it wasn't resolved yet", async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            clock = new ClockMock(),
            eventBus = new EventBusMock(),
            handler = new ResolveAlertCommandHandler(new AlertResolver(repository, clock, eventBus)),
            alert = AlertMother.pendingAlert(),
            command = ResolveAlertCommandMother.create({ id: alert.id.value }),
            resolvedAt = DatetimeMother.random(),
            expected = AlertMother.resolve(alert, resolvedAt);

        repository.whenSearchThenReturn(alert);
        clock.whenNowThenReturn(resolvedAt);

        await handler.handle(command);

        repository.assertSaveHasBeenCalledWith(expected);
    });

    it("should publish an AlertResolvedDomainEvent when the Alert wasn't resolved yet", async () => {
        expect.hasAssertions();

        const repository = new AlertRepositoryMock(),
            clock = new ClockMock(),
            eventBus = new EventBusMock(),
            handler = new ResolveAlertCommandHandler(new AlertResolver(repository, clock, eventBus)),
            alert = AlertMother.pendingAlert(),
            command = ResolveAlertCommandMother.create({ id: alert.id.value }),
            resolvedAt = DatetimeMother.random(),
            expected = AlertResolvedDomainEventMother.fromAlert(AlertMother.resolve(alert, resolvedAt));

        repository.whenSearchThenReturn(alert);
        clock.whenNowThenReturn(resolvedAt);

        await handler.handle(command);

        eventBus.assertLastPublishedEventIs(expected);
    });
});
