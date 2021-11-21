import { Response } from '@ans/ctx-shared/domain/bus/query/response';
import MonitoredService from '@src/monitoredServices/domain/monitoredService';
import { MonitoredServicePrimitives } from '@src/monitoredServices/domain/monitoredServicePrimitives';

type SimplifiedMonitoredServicePrimitives = Omit<MonitoredServicePrimitives, 'escalationPolicy'>;

export default class SearchAllMonitoredServicesResponse implements Response {
    readonly items: SimplifiedMonitoredServicePrimitives[];

    constructor(services: MonitoredService[]) {
        this.items = services.map((service) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { escalationPolicy, ...others } = service.toPrimitives();

            return { ...others };
        });
    }
}
