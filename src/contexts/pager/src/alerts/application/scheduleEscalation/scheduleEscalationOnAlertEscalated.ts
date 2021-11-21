import { DomainEventClass } from '@ans/ctx-shared/domain/bus/event/domainEvent';
import { DomainEventSubscriber } from '@ans/ctx-shared/domain/bus/event/domainEventSubscriber';
import AlertEscalatedDomainEvent from '@src/alerts/domain/alertEscalatedDomainEvent';
import EscalationLevelNotifier from '@src/alerts/application/scheduleEscalation/escalationScheduler';
import AlertId from '@src/alerts/domain/alertId';

export default class scheduleEscalationOnAlertEscalated implements DomainEventSubscriber<AlertEscalatedDomainEvent> {
    private scheduler: EscalationLevelNotifier;

    constructor(scheduler: EscalationLevelNotifier) {
        this.scheduler = scheduler;
    }

    // eslint-disable-next-line class-methods-use-this
    subscribedTo(): DomainEventClass[] {
        return [AlertEscalatedDomainEvent];
    }

    async on(domainEvent: AlertEscalatedDomainEvent): Promise<void> {
        const id = new AlertId(domainEvent.aggregateId);

        await this.scheduler.run(id);
    }
}
