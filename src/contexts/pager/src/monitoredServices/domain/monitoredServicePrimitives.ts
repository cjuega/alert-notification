import { EscalationPolicyPrimitives } from '@src/monitoredServices/domain/escalationPolicy';
import MonitoredServiceStatus from '@src/monitoredServices/domain/monitoredServiceStatus';

export type MonitoredServicePrimitives = {
    id: string;
    name: string;
    status: MonitoredServiceStatus;
    escalationPolicy: EscalationPolicyPrimitives;
};
