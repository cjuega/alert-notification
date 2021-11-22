import AlertEscalatedDomainEventMother from '@src/alerts/domain/alertEscalatedDomainEvent.mother';
import TargetNotifierMock from '@src/notifications/__mocks__/targetNotifier.mock';
import NotifyTargetsOnAlertEscalated from '@src/notifications/application/notify/notifyTargetsOnAlertEscalated';
import TargetsNotifier from '@src/notifications/application/notify/targetsNotifier';
import NotifiedTargetsFilterMock from '@src/notifications/__mocks__/notifiedTargetsFilter.mock';
import MotherCreator from '@ans/ctx-shared/domain/motherCreator.mother';

describe('targetsNotifier', () => {
    it('should filter out targets', async () => {
        expect.hasAssertions();

        const filter = new NotifiedTargetsFilterMock(),
            notifier = new TargetNotifierMock(),
            subscriber = new NotifyTargetsOnAlertEscalated(new TargetsNotifier(filter, notifier)),
            domainEvent = AlertEscalatedDomainEventMother.random(),
            expected = AlertEscalatedDomainEventMother.extractTargets(domainEvent);

        filter.whenFilterThenReturn([]);

        await subscriber.on(domainEvent);

        filter.assertFilterHasBeenCalledWith(expected);
    });

    it('should notify all targets in the level', async () => {
        expect.hasAssertions();

        const filter = new NotifiedTargetsFilterMock(),
            notifier = new TargetNotifierMock(),
            subscriber = new NotifyTargetsOnAlertEscalated(new TargetsNotifier(filter, notifier)),
            domainEvent = AlertEscalatedDomainEventMother.random(),
            expected = AlertEscalatedDomainEventMother.extractTargets(domainEvent);

        filter.whenFilterThenReturn(expected);

        await subscriber.on(domainEvent);

        notifier.assertNotifyHasBeenCalledWith(expected);
    });

    it('should not notify targets that were already notified', async () => {
        expect.hasAssertions();

        const filter = new NotifiedTargetsFilterMock(),
            notifier = new TargetNotifierMock(),
            subscriber = new NotifyTargetsOnAlertEscalated(new TargetsNotifier(filter, notifier)),
            domainEvent = AlertEscalatedDomainEventMother.random(),
            targets = AlertEscalatedDomainEventMother.extractTargets(domainEvent),
            expected = targets.filter(() => MotherCreator.boolean());

        filter.whenFilterThenReturn(expected);

        await subscriber.on(domainEvent);

        notifier.assertNotifyHasBeenCalledWith(expected);
    });
});
