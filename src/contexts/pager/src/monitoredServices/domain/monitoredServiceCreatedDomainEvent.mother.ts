import MonitoredService from '@src/monitoredServices/domain/monitoredService';
import { MonitoredServicePrimitives } from '@src/monitoredServices/domain/monitoredServicePrimitives';
import MonitoredServiceCreatedDomainEvent from '@src/monitoredServices/domain/monitoredServiceCreatedDomainEvent';
import MonitoredServiceMother from '@src/monitoredServices/domain/monitoredService.mother';

export default class MonitoredServiceCreatedDomainEventMother {
    static create(
        params: MonitoredServicePrimitives & {
            eventId?: string;
            occurredOn?: Date;
        }
    ): MonitoredServiceCreatedDomainEvent {
        return new MonitoredServiceCreatedDomainEvent(params);
    }

    static fromMonitoredService(service: MonitoredService): MonitoredServiceCreatedDomainEvent {
        return MonitoredServiceCreatedDomainEventMother.create(service.toPrimitives());
    }

    static random(): MonitoredServiceCreatedDomainEvent {
        const service = MonitoredServiceMother.random();

        return MonitoredServiceCreatedDomainEventMother.fromMonitoredService(service);
    }
}
