import AggregateRoot from '@ans/ctx-shared/domain/aggregateRoot';
import MonitoredServiceId from '@src/monitoredServices/domain/monitoredServiceId';
import MonitoredServiceName from '@src/monitoredServices/domain/monitoredServiceName';
import MonitoredServiceStatus from '@src/monitoredServices/domain/monitoredServiceStatus';
import EscalationPolicy, { EscalationPolicyPrimitives } from '@src/monitoredServices/domain/escalationPolicy';

type MonitoredServicePrimitives = {
    id: string;
    name: string;
    status: MonitoredServiceStatus;
    escalationPolicy: EscalationPolicyPrimitives;
};

export default class MonitoredService extends AggregateRoot {
    readonly id: MonitoredServiceId;

    readonly name: MonitoredServiceName;

    readonly status: MonitoredServiceStatus;

    readonly escalationPolicy: EscalationPolicy;

    constructor(id: string, name: string, status: MonitoredServiceStatus, escalationPolicy: EscalationPolicy) {
        super();

        this.id = new MonitoredServiceId(id);
        this.name = new MonitoredServiceName(name);
        this.status = status;
        this.escalationPolicy = escalationPolicy;
    }

    static create(id: string, name: string, escalationPolicy: EscalationPolicy): MonitoredService {
        const service = new MonitoredService(id, name, MonitoredServiceStatus.Healthy, escalationPolicy);

        return service;
    }

    toPrimitives(): MonitoredServicePrimitives {
        return {
            id: this.id.value,
            name: this.name.value,
            status: this.status,
            escalationPolicy: this.escalationPolicy.toPrimitives()
        };
    }
}
