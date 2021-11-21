/* eslint-disable no-underscore-dangle */
import AggregateRoot from '@ans/ctx-shared/domain/aggregateRoot';
import { Nullable } from '@ans/ctx-shared/domain/nullable';
import Datetime from '@ans/ctx-shared/domain/datetime';
import { AlertPrimitives } from '@src/alerts/domain/alertPrimitives';
import AlertId from '@src/alerts/domain/alertId';
import AlertStatus from '@src/alerts/domain/alertStatus';
import AlertMessage from '@src/alerts/domain/alertMessage';
import AlertCreatedDomainEvent from '@src/alerts/domain/alertCreatedDomainEvent';
import MonitoredServiceId from '@src/shared/domain/monitoredServiceId';
import AlertResolvedDomainEvent from '@src/alerts/domain/alertResolvedDomainEvent';

export default class Alert extends AggregateRoot {
    readonly id: AlertId;

    readonly serviceId: MonitoredServiceId;

    readonly message: AlertMessage;

    readonly status: AlertStatus;

    readonly createdAt: Datetime;

    private _resolvedAt: Nullable<Datetime>;

    get resolvedAt(): Nullable<Datetime> {
        return this._resolvedAt ? Datetime.clone(this._resolvedAt) : null;
    }

    constructor(
        id: AlertId,
        serviceId: MonitoredServiceId,
        message: AlertMessage,
        status: AlertStatus,
        createdAt: Datetime,
        resolvedAt: Nullable<Datetime>
    ) {
        super();

        this.id = id;
        this.serviceId = serviceId;
        this.message = message;
        this.status = status;
        this.createdAt = createdAt;
        this._resolvedAt = resolvedAt;
    }

    static create(id: AlertId, serviceId: MonitoredServiceId, message: AlertMessage, createdAt: Datetime): Alert {
        const alert = new Alert(id, serviceId, message, AlertStatus.Pending, createdAt, null);

        alert.record(new AlertCreatedDomainEvent(alert.toPrimitives()));

        return alert;
    }

    isResolved(): boolean {
        return this.status === AlertStatus.Resolved;
    }

    resolve(resolvedAt: Datetime): void {
        this._resolvedAt = resolvedAt;

        this.record(new AlertResolvedDomainEvent(this.toPrimitives()));
    }

    toPrimitives(): AlertPrimitives {
        return {
            id: this.id.value,
            serviceId: this.serviceId.value,
            message: this.message.value,
            status: this.status,
            createdAt: this.createdAt.value,
            resolvedAt: this._resolvedAt?.value || null
        };
    }
}
