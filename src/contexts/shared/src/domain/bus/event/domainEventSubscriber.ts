import { DomainEvent, DomainEventClass } from '@src/domain/bus/event/domainEvent';

export interface DomainEventSubscriber<T extends DomainEvent> {
    subscribedTo(): Array<DomainEventClass>;

    on(domainEvent: T): void;
}
