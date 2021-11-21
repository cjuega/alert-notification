import { EventBus } from '@ans/ctx-shared/domain/bus/event/eventBus';
import EscalationPolicy from '@src/shared/domain/escalationPolicies/escalationPolicy';
import MonitoredService from '@src/monitoredServices/domain/monitoredService';
import MonitoredServiceAlreadyExists from '@src/monitoredServices/domain/monitoredServiceAlreadyExists';
import MonitoredServiceId from '@src/shared/domain/monitoredServiceId';
import { MonitoredServiceRepository } from '@src/monitoredServices/domain/monitoredServiceRepository';
import MonitoredServiceName from '@src/monitoredServices/domain/monitoredServiceName';

export default class MonitoredServiceRegistor {
    private repository: MonitoredServiceRepository;

    private eventBus: EventBus;

    constructor(repository: MonitoredServiceRepository, eventBus: EventBus) {
        this.repository = repository;
        this.eventBus = eventBus;
    }

    async run(id: MonitoredServiceId, name: MonitoredServiceName, escalationPolicy: EscalationPolicy): Promise<void> {
        await this.ensureMonitoredServiceDoesntExist(id);

        const service = MonitoredService.create(id, name, escalationPolicy);

        await this.repository.save(service);
        await this.eventBus.publish(service.pullDomainEvents());
    }

    private async ensureMonitoredServiceDoesntExist(id: MonitoredServiceId): Promise<void> {
        const service = await this.repository.search(id);

        if (service) {
            throw new MonitoredServiceAlreadyExists(id.value);
        }
    }
}
