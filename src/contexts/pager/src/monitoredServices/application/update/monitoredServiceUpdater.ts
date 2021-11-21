import { EventBus } from '@ans/ctx-shared/domain/bus/event/eventBus';
import { MonitoredServiceUpdatableProps } from '@src/monitoredServices/domain/monitoredService';
import MonitoredServiceFinder from '@src/monitoredServices/domain/monitoredServiceFinder';
import MonitoredServiceId from '@src/shared/domain/monitoredServiceId';
import { MonitoredServiceRepository } from '@src/monitoredServices/domain/monitoredServiceRepository';

export default class MonitoredServiceUpdater {
    private finder: MonitoredServiceFinder;

    private repository: MonitoredServiceRepository;

    private eventBus: EventBus;

    constructor(repository: MonitoredServiceRepository, eventBus: EventBus) {
        this.finder = new MonitoredServiceFinder(repository);
        this.repository = repository;
        this.eventBus = eventBus;
    }

    async run(id: MonitoredServiceId, updates: MonitoredServiceUpdatableProps): Promise<void> {
        const service = await this.finder.find(id);

        service.update(updates);

        await this.repository.save(service);
        await this.eventBus.publish(service.pullDomainEvents());
    }
}
