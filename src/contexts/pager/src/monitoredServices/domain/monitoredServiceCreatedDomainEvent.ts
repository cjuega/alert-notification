import { DomainEvent } from '@ans/ctx-shared/domain/bus/event/domainEvent';
import { MonitoredServicePrimitives } from '@src/monitoredServices/domain/monitoredServicePrimitives';
import { EscalationPolicyPrimitives } from '@src/monitoredServices/domain/escalationPolicy';
import MonitoredServiceStatus from '@src/monitoredServices/domain/monitoredServiceStatus';

type CreateMonitoredServiceDomainEventBody = Readonly<Omit<MonitoredServicePrimitives, 'id'>>;

export default class MonitoredServiceCreatedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME = 'aircall.pager.1.event.monitoredService.created';

    readonly name: string;

    readonly status: MonitoredServiceStatus;

    readonly escalationPolicy: EscalationPolicyPrimitives;

    constructor({
        id,
        name,
        status,
        escalationPolicy,
        eventId,
        occurredOn
    }: MonitoredServicePrimitives & {
        eventId?: string;
        occurredOn?: Date;
    }) {
        super(MonitoredServiceCreatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);

        this.name = name;
        this.status = status;
        this.escalationPolicy = escalationPolicy;
    }

    toPrimitives(): CreateMonitoredServiceDomainEventBody {
        const { name, status, escalationPolicy } = this;

        return {
            name,
            status,
            escalationPolicy
        };
    }

    static fromPrimitives(
        aggregateId: string,
        body: CreateMonitoredServiceDomainEventBody,
        eventId: string,
        occurredOn: Date
    ): DomainEvent {
        return new MonitoredServiceCreatedDomainEvent({
            id: aggregateId,
            name: body.name,
            status: body.status,
            escalationPolicy: body.escalationPolicy,
            eventId,
            occurredOn
        });
    }
}
