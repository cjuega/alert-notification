import { Response } from '@ans/ctx-shared/domain/bus/query/response';
import MonitoredService from '@src/monitoredServices/domain/monitoredService';
import { MonitoredServicePrimitives } from '@src/monitoredServices/domain/monitoredServicePrimitives';

type SimplifiedMonitoredServicePrimitives = Omit<MonitoredServicePrimitives, 'escalationPolicy'>;

export default class SearchAllMonitoredServicesResponse implements Response {
    readonly items: SimplifiedMonitoredServicePrimitives[];

    constructor(services: MonitoredService[]) {
        this.items = services.map((service) => {
            const { id, name, status } = service.toPrimitives();

            return { id, name, status };
        });
    }
}
