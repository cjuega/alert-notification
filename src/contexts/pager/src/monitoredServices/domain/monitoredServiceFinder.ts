import MonitoredService from '@src/monitoredServices/domain/monitoredService';
import MonitoredServiceId from '@src/shared/domain/monitoredServiceId';
import MonitoredServiceNotFound from '@src/monitoredServices/domain/monitoredServiceNotFound';
import { MonitoredServiceRepository } from '@src/monitoredServices/domain/monitoredServiceRepository';

export default class MonitoredServiceFinder {
    private repository: MonitoredServiceRepository;

    constructor(repository: MonitoredServiceRepository) {
        this.repository = repository;
    }

    async find(id: MonitoredServiceId): Promise<MonitoredService> {
        const service = await this.repository.search(id);

        if (!service) {
            throw new MonitoredServiceNotFound(id.value);
        }

        return service;
    }
}
