import { MonitoredServiceRepository } from '@src/monitoredServices/domain/monitoredServiceRepository';
import SearchAllMonitoredServicesResponse from '@src/monitoredServices/application/searchAll/searchAllMonitoredServicesResponse';
import MonitoredServiceStatus from '@src/monitoredServices/domain/monitoredServiceStatus';

export default class AllMonitoredServicesSearcher {
    private repository: MonitoredServiceRepository;

    constructor(repository: MonitoredServiceRepository) {
        this.repository = repository;
    }

    async run(statusFilter?: MonitoredServiceStatus): Promise<SearchAllMonitoredServicesResponse> {
        const services = await this.repository.searchAll(statusFilter);

        return new SearchAllMonitoredServicesResponse(services);
    }
}
