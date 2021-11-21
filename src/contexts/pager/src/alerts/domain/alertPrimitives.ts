import { Nullable } from '@ans/ctx-shared/domain/nullable';
import AlertStatus from '@src/alerts/domain/alertStatus';
import { AlertEscalationPolicyPrimitives } from '@src/alerts/domain/alertEscalationPolicy';

export type AlertPrimitives = {
    id: string;
    serviceId: string;
    message: string;
    status: AlertStatus;
    escalationPolicy: AlertEscalationPolicyPrimitives;
    createdAt: string;
    resolvedAt: Nullable<string>;
};
