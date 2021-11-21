/* eslint-disable no-underscore-dangle */
import AggregateRoot from '@ans/ctx-shared/domain/aggregateRoot';
import MonitoredServiceId from '@src/monitoredServices/domain/monitoredServiceId';
import MonitoredServiceName from '@src/monitoredServices/domain/monitoredServiceName';
import MonitoredServiceStatus from '@src/monitoredServices/domain/monitoredServiceStatus';
import EscalationPolicy from '@src/monitoredServices/domain/escalationPolicy';
import MonitoredServiceCreatedDomainEvent from '@src/monitoredServices/domain/monitoredServiceCreatedDomainEvent';
import { MonitoredServicePrimitives } from '@src/monitoredServices/domain/monitoredServicePrimitives';
import MonitoredServiceStatusChangedDomainEvent from '@src/monitoredServices/domain/monitoredServiceStatusChangedDomainEvent';
import MonitoredServiceUpdatedDomainEvent from '@src/monitoredServices/domain/monitoredServiceUpdatedDomainEvent';

export type MonitoredServiceUpdatableProps = {
    name?: MonitoredServiceName;
    escalationPolicy?: EscalationPolicy;
};
export default class MonitoredService extends AggregateRoot {
    readonly id: MonitoredServiceId;

    private _name: MonitoredServiceName;

    private _status: MonitoredServiceStatus;

    private _escalationPolicy: EscalationPolicy;

    get name(): MonitoredServiceName {
        return MonitoredServiceName.clone(this._name);
    }

    get status(): MonitoredServiceStatus {
        return this._status;
    }

    get escalationPolicy(): EscalationPolicy {
        return EscalationPolicy.clone(this._escalationPolicy);
    }

    constructor(id: string, name: string, status: MonitoredServiceStatus, escalationPolicy: EscalationPolicy) {
        super();

        this.id = new MonitoredServiceId(id);
        this._name = new MonitoredServiceName(name);
        this._status = status;
        this._escalationPolicy = escalationPolicy;
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

    update({ name, escalationPolicy }: MonitoredServiceUpdatableProps): void {
        if (name) {
            this._name = name;
        }

        if (escalationPolicy) {
            this._escalationPolicy = escalationPolicy;
        }

        this.record(new MonitoredServiceUpdatedDomainEvent(this.toPrimitives()));
    }

    toPrimitives(): MonitoredServicePrimitives {
        return {
            id: this.id.value,
            name: this._name.value,
            status: this.status,
            escalationPolicy: this._escalationPolicy.toPrimitives()
        };
    }
}
