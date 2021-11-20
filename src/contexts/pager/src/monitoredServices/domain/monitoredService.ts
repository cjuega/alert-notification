/* eslint-disable no-underscore-dangle */
import AggregateRoot from '@ans/ctx-shared/domain/aggregateRoot';
import MonitoredServiceId from '@src/monitoredServices/domain/monitoredServiceId';
import MonitoredServiceName from '@src/monitoredServices/domain/monitoredServiceName';
import MonitoredServiceStatus from '@src/monitoredServices/domain/monitoredServiceStatus';
import EscalationPolicy from '@src/monitoredServices/domain/escalationPolicy';
import MonitoredServiceCreatedDomainEvent from '@src/monitoredServices/domain/monitoredServiceCreatedDomainEvent';
import { MonitoredServicePrimitives } from '@src/monitoredServices/domain/monitoredServicePrimitives';
import MonitoredServiceStatusChangedDomainEvent from '@src/monitoredServices/domain/monitoredServiceStatusChangedDomainEvent';

export default class MonitoredService extends AggregateRoot {
    readonly id: MonitoredServiceId;

    readonly name: MonitoredServiceName;

    private _status: MonitoredServiceStatus;

    readonly escalationPolicy: EscalationPolicy;

    get status(): MonitoredServiceStatus {
        return this._status;
    }

    constructor(id: string, name: string, status: MonitoredServiceStatus, escalationPolicy: EscalationPolicy) {
        super();

        this.id = new MonitoredServiceId(id);
        this.name = new MonitoredServiceName(name);
        this._status = status;
        this.escalationPolicy = escalationPolicy;
    }

    static create(id: string, name: string, escalationPolicy: EscalationPolicy): MonitoredService {
        const service = new MonitoredService(id, name, MonitoredServiceStatus.Healthy, escalationPolicy);

        service.record(new MonitoredServiceCreatedDomainEvent(service.toPrimitives()));

        return service;
    }

    updateStatus(status: MonitoredServiceStatus): void {
        this._status = status;

        this.record(new MonitoredServiceStatusChangedDomainEvent(this.toPrimitives()));
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
