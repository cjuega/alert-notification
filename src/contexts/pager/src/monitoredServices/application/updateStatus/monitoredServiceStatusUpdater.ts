import { EventBus } from '@ans/ctx-shared/domain/bus/event/eventBus';
import MonitoredService from '@src/monitoredServices/domain/monitoredService';
import MonitoredServiceId from '@src/monitoredServices/domain/monitoredServiceId';
import MonitoredServiceNotFound from '@src/monitoredServices/domain/monitoredServiceNotFound';
import { MonitoredServiceRepository } from '@src/monitoredServices/domain/monitoredServiceRepository';
import MonitoredServiceStatus from '@src/monitoredServices/domain/monitoredServiceStatus';

export default class MonitoredServiceStatusUpdater {
    private repository: MonitoredServiceRepository;

    private eventBus: EventBus;

    constructor(repository: MonitoredServiceRepository, eventBus: EventBus) {
        this.repository = repository;
        this.eventBus = eventBus;
    }

    async run(id: MonitoredServiceId, status: MonitoredServiceStatus): Promise<void> {
        const service = await this.findMonitoredService(id);

        if (service.status !== status) {
            service.updateStatus(status);

            await this.repository.save(service);
            await this.eventBus.publish(service.pullDomainEvents());
        }
    }

    private async findMonitoredService(id: MonitoredServiceId): Promise<MonitoredService> {
        const service = await this.repository.search(id);

        if (!service) {
            throw new MonitoredServiceNotFound(id.value);
        }

        return service;
    }
}
