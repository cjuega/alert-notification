import { Nullable } from '@ans/ctx-shared/domain/nullable';
import AlertStatus from '@src/alerts/domain/alertStatus';

export type AlertPrimitives = {
    id: string;
    serviceId: string;
    message: string;
    status: AlertStatus;
    createdAt: string;
    resolvedAt: Nullable<string>;
};
