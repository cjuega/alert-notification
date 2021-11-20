import SearchAllMonitoredServicesResponse from '@src/monitoredServices/application/searchAll/searchAllMonitoredServicesResponse';
import MonitoredService from '@src/monitoredServices/domain/monitoredService';

export default class SearchAllMonitoredServicesResponseMother {
    static fromMonitoredServices(services: MonitoredService[]): SearchAllMonitoredServicesResponse {
        return new SearchAllMonitoredServicesResponse(services);
    }
}
