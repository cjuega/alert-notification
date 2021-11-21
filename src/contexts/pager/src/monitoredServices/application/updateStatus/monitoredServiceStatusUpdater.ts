import { EventBus } from '@ans/ctx-shared/domain/bus/event/eventBus';
import MonitoredServiceFinder from '@src/monitoredServices/domain/monitoredServiceFinder';
import MonitoredServiceId from '@src/monitoredServices/domain/monitoredServiceId';
import { MonitoredServiceRepository } from '@src/monitoredServices/domain/monitoredServiceRepository';
import MonitoredServiceStatus from '@src/monitoredServices/domain/monitoredServiceStatus';

export default class MonitoredServiceStatusUpdater {
    private finder: MonitoredServiceFinder;

    private repository: MonitoredServiceRepository;

    private eventBus: EventBus;

    constructor(repository: MonitoredServiceRepository, eventBus: EventBus) {
        this.finder = new MonitoredServiceFinder(repository);
        this.repository = repository;
        this.eventBus = eventBus;
    }

    async run(id: MonitoredServiceId, status: MonitoredServiceStatus): Promise<void> {
        const service = await this.finder.find(id);

        if (service.status !== status) {
            service.updateStatus(status);

            await this.repository.save(service);
            await this.eventBus.publish(service.pullDomainEvents());
        }
    }
}
