import { MonitoredServiceRepository } from '@src/monitoredServices/domain/monitoredServiceRepository';
import MonitoredServiceFinderDomainService from '@src/monitoredServices/domain/monitoredServiceFinder';
import MonitoredServiceId from '@src/shared/domain/monitoredServiceId';
import FindMonitoredServiceResponse from '@src/monitoredServices/application/find/findMonitoredServiceResponse';

export default class MonitoredServiceFinder {
    private finder: MonitoredServiceFinderDomainService;

    constructor(repository: MonitoredServiceRepository) {
        this.finder = new MonitoredServiceFinderDomainService(repository);
    }

    async run(id: MonitoredServiceId): Promise<FindMonitoredServiceResponse> {
        const service = await this.finder.find(id);

        return new FindMonitoredServiceResponse(service);
    }
}
