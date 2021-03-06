import { Nullable } from '@ans/ctx-shared/domain/nullable';
import Alert from '@src/alerts/domain/alert';
import AlertId from '@src/alerts/domain/alertId';
import AlertStatus from '@src/alerts/domain/alertStatus';

export interface AlertRepository {
    save(alert: Alert): Promise<void>;

    search(id: AlertId): Promise<Nullable<Alert>>;

    searchAll(statusFilter?: AlertStatus): Promise<Alert[]>;
}
