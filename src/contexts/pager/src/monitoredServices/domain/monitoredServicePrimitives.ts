import { EscalationPolicyPrimitives } from '@src/shared/domain/escalationPolicies/escalationPolicy';
import MonitoredServiceStatus from '@src/monitoredServices/domain/monitoredServiceStatus';

export type MonitoredServicePrimitives = {
    id: string;
    name: string;
    status: MonitoredServiceStatus;
    escalationPolicy: EscalationPolicyPrimitives;
};
