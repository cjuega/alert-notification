import { Nullable } from '@ans/ctx-shared/domain/nullable';
import MonitoredService from '@src/monitoredServices/domain/monitoredService';
import MonitoredServiceId from '@src/monitoredServices/domain/monitoredServiceId';
import MonitoredServiceStatus from '@src/monitoredServices/domain/monitoredServiceStatus';

export interface MonitoredServiceRepository {
    save(service: MonitoredService): Promise<void>;

    search(id: MonitoredServiceId): Promise<Nullable<MonitoredService>>;

    searchAll(statusFilter?: MonitoredServiceStatus): Promise<MonitoredService[]>;
}
