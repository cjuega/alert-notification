import { Nullable } from '@ans/ctx-shared/domain/nullable';
import Alert from '@src/alerts/domain/alert';
import AlertId from '@src/alerts/domain/alertId';
import MonitoredServiceId from '@src/shared/domain/monitoredServiceId';

export interface AlertRepository {
    save(alert: Alert): Promise<void>;

    search(id: AlertId): Promise<Nullable<Alert>>;

    searchPendingByService(serviceId: MonitoredServiceId): Promise<Nullable<Alert>>;
}
