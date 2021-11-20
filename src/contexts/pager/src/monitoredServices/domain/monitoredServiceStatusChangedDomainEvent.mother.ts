import { MonitoredServicePrimitives } from '@src/monitoredServices/domain/monitoredServicePrimitives';
import MonitoredServiceStatusChangedDomainEvent from '@src/monitoredServices/domain/monitoredServiceStatusChangedDomainEvent';
import MonitoredService from '@src/monitoredServices/domain/monitoredService';

export default class MonitoredServiceStatusChangedDomainEventMother {
    static create(
        params: Omit<MonitoredServicePrimitives, 'escalationPolicy'> & {
            eventId?: string;
            occurredOn?: Date;
        }
    ): MonitoredServiceStatusChangedDomainEvent {
        return new MonitoredServiceStatusChangedDomainEvent(params);
    }

    static fromMonitoredService(service: MonitoredService): MonitoredServiceStatusChangedDomainEvent {
        return MonitoredServiceStatusChangedDomainEventMother.create(service.toPrimitives());
    }
}
