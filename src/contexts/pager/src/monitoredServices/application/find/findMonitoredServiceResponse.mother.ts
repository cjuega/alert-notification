import MonitoredService from '@src/monitoredServices/domain/monitoredService';
import FindMonitoredServiceResponse from '@src/monitoredServices/application/find/findMonitoredServiceResponse';
import MonitoredServiceMother from '@src/monitoredServices/domain/monitoredService.mother';

export default class FindMonitoredServiceResponseMother {
    static fromMonitoredService(service: MonitoredService): FindMonitoredServiceResponse {
        return new FindMonitoredServiceResponse(service);
    }

    static random(): FindMonitoredServiceResponse {
        const service = MonitoredServiceMother.random();

        return FindMonitoredServiceResponseMother.fromMonitoredService(service);
    }
}
