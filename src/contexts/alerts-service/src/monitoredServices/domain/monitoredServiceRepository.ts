import { Nullable } from '@ans/ctx-shared/domain/nullable';
import MonitoredService from '@src/monitoredServices/domain/monitoredService';
import MonitoredServiceId from '@src/monitoredServices/domain/monitoredServiceId';

export interface MonitoredServiceRepository {
    save(service: MonitoredService): Promise<void>;

    search(id: MonitoredServiceId): Promise<Nullable<MonitoredService>>;
}
