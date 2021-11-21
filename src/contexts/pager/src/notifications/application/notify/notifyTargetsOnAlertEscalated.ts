import { DomainEventClass } from '@ans/ctx-shared/domain/bus/event/domainEvent';
import { DomainEventSubscriber } from '@ans/ctx-shared/domain/bus/event/domainEventSubscriber';
import AlertEscalatedDomainEvent from '@src/alerts/domain/alertEscalatedDomainEvent';
import EscalationPolicyLevel from '@src/shared/domain/escalationPolicies/escalationPolicyLevel';
import TargetsNotifier from '@src/notifications/application/notify/targetsNotifier';

export default class NotifyTargetsOnAlertEscalated implements DomainEventSubscriber<AlertEscalatedDomainEvent> {
    private notifier: TargetsNotifier;

    constructor(notifier: TargetsNotifier) {
        this.notifier = notifier;
    }

    // eslint-disable-next-line class-methods-use-this
    subscribedTo(): DomainEventClass[] {
        return [AlertEscalatedDomainEvent];
    }

    async on(domainEvent: AlertEscalatedDomainEvent): Promise<void> {
        const level = EscalationPolicyLevel.fromPrimitives(domainEvent.currentLevel);

        await this.notifier.run(level.targets);
    }
}
