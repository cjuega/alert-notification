import { Response } from '@ans/ctx-shared/domain/bus/query/response';
import MonitoredService from '@src/monitoredServices/domain/monitoredService';
import { MonitoredServicePrimitives } from '@src/monitoredServices/domain/monitoredServicePrimitives';

export default class FindMonitoredServiceResponse implements Response {
    readonly monitoredService: MonitoredServicePrimitives;

    constructor(service: MonitoredService) {
        this.monitoredService = service.toPrimitives();
    }
}
