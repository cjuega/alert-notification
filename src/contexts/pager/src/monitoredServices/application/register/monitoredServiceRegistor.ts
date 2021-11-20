import EscalationPolicy from '@src/monitoredServices/domain/escalationPolicy';
import MonitoredService from '@src/monitoredServices/domain/monitoredService';
import MonitoredServiceAlreadyExists from '@src/monitoredServices/domain/monitoredServiceAlreadyExists';
import MonitoredServiceId from '@src/monitoredServices/domain/monitoredServiceId';
import { MonitoredServiceRepository } from '@src/monitoredServices/domain/monitoredServiceRepository';

export default class MonitoredServiceRegistor {
    private repository: MonitoredServiceRepository;

    constructor(repository: MonitoredServiceRepository) {
        this.repository = repository;
    }

    async run(serviceId: string, serviceName: string, escalationPolicy: EscalationPolicy): Promise<void> {
        await this.ensureMonitoredServiceDoesntExist(serviceId);

        const service = MonitoredService.create(serviceId, serviceName, escalationPolicy);

        await this.repository.save(service);
    }

    private async ensureMonitoredServiceDoesntExist(serviceId: string): Promise<void> {
        const service = await this.repository.search(new MonitoredServiceId(serviceId));

        if (service) {
            throw new MonitoredServiceAlreadyExists(serviceId);
        }
    }
}
