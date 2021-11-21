import AlertEscalatedDomainEventMother from '@src/alerts/domain/alertEscalatedDomainEvent.mother';
import TargetNotifierMock from '@src/notifications/__mocks__/targetNotifier.mock';
import NotifyTargetsOnAlertEscalated from '@src/notifications/application/notify/notifyTargetsOnAlertEscalated';
import TargetsNotifier from '@src/notifications/application/notify/targetsNotifier';

describe('targetsNotifier', () => {
    it('should notify all targets in the level', async () => {
        expect.hasAssertions();

        const notifier = new TargetNotifierMock(),
            subscriber = new NotifyTargetsOnAlertEscalated(new TargetsNotifier(notifier)),
            domainEvent = AlertEscalatedDomainEventMother.random(),
            expected = AlertEscalatedDomainEventMother.extractTargets(domainEvent);

        await subscriber.on(domainEvent);

        notifier.assertNotifyHasBeenCalledWith(expected);
    });
});
