import { DomainEvent } from '@ans/ctx-shared/domain/bus/event/domainEvent';
import { MonitoredServicePrimitives } from '@src/monitoredServices/domain/monitoredServicePrimitives';
import MonitoredServiceStatus from '@src/monitoredServices/domain/monitoredServiceStatus';

type ChangeMonitoredServiceStatusDomainEventBody = Readonly<Omit<MonitoredServicePrimitives, 'id' | 'escalationPolicy'>>;

export default class MonitoredServiceStatusChangedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME = 'aircall.pager.1.event.monitoredService.status-changed';

    readonly name: string;

    readonly status: MonitoredServiceStatus;

    constructor({
        id,
        name,
        status,
        eventId,
        occurredOn
    }: Omit<MonitoredServicePrimitives, 'escalationPolicy'> & {
        eventId?: string;
        occurredOn?: Date;
    }) {
        super(MonitoredServiceStatusChangedDomainEvent.EVENT_NAME, id, eventId, occurredOn);

        this.name = name;
        this.status = status;
    }

    toPrimitives(): ChangeMonitoredServiceStatusDomainEventBody {
        const { name, status } = this;

        return {
            name,
            status
        };
    }

    static fromPrimitives(
        aggregateId: string,
        body: ChangeMonitoredServiceStatusDomainEventBody,
        eventId: string,
        occurredOn: Date
    ): DomainEvent {
        return new MonitoredServiceStatusChangedDomainEvent({
            id: aggregateId,
            name: body.name,
            status: body.status,
            eventId,
            occurredOn
        });
    }
}
