import { EventBus } from '@ans/ctx-shared/domain/bus/event/eventBus';
import EscalationPolicy from '@src/monitoredServices/domain/escalationPolicy';
import MonitoredService from '@src/monitoredServices/domain/monitoredService';
import MonitoredServiceAlreadyExists from '@src/monitoredServices/domain/monitoredServiceAlreadyExists';
import MonitoredServiceId from '@src/shared/domain/monitoredServiceId';
import { MonitoredServiceRepository } from '@src/monitoredServices/domain/monitoredServiceRepository';

export default class MonitoredServiceRegistor {
    private repository: MonitoredServiceRepository;

    private eventBus: EventBus;

    constructor(repository: MonitoredServiceRepository, eventBus: EventBus) {
        this.repository = repository;
        this.eventBus = eventBus;
    }

    async run(serviceId: string, serviceName: string, escalationPolicy: EscalationPolicy): Promise<void> {
        await this.ensureMonitoredServiceDoesntExist(serviceId);

        const service = MonitoredService.create(serviceId, serviceName, escalationPolicy);

        await this.repository.save(service);
        await this.eventBus.publish(service.pullDomainEvents());
    }

    private async ensureMonitoredServiceDoesntExist(serviceId: string): Promise<void> {
        const service = await this.repository.search(new MonitoredServiceId(serviceId));

        if (service) {
            throw new MonitoredServiceAlreadyExists(serviceId);
        }
    }
}
