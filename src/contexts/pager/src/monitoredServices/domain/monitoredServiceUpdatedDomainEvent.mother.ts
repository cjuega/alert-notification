import MonitoredService from '@src/monitoredServices/domain/monitoredService';
import { MonitoredServicePrimitives } from '@src/monitoredServices/domain/monitoredServicePrimitives';
import MonitoredServiceUpdatedDomainEvent from '@src/monitoredServices/domain/monitoredServiceUpdatedDomainEvent';
import MonitoredServiceMother from '@src/monitoredServices/domain/monitoredService.mother';

export default class MonitoredServiceUpdatedDomainEventMother {
    static Update(
        params: MonitoredServicePrimitives & {
            eventId?: string;
            occurredOn?: Date;
        }
    ): MonitoredServiceUpdatedDomainEvent {
        return new MonitoredServiceUpdatedDomainEvent(params);
    }

    static fromMonitoredService(service: MonitoredService): MonitoredServiceUpdatedDomainEvent {
        return MonitoredServiceUpdatedDomainEventMother.Update(service.toPrimitives());
    }

    static random(): MonitoredServiceUpdatedDomainEvent {
        const service = MonitoredServiceMother.random();

        return MonitoredServiceUpdatedDomainEventMother.fromMonitoredService(service);
    }
}
