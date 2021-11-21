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
import AlertEscalatedDomainEvent from '@src/alerts/domain/alertEscalatedDomainEvent';
import AlertEscalationPolicy from '@src/alerts/domain/alertEscalationPolicy';
import AlertAcknowledgedDomainEvent from '@src/alerts/domain/alertAcknowledgedDomainEvent';

export default class Alert extends AggregateRoot {
    readonly id: AlertId;

    readonly serviceId: MonitoredServiceId;

    readonly message: AlertMessage;

    private _status: AlertStatus;

    private _escalationPolicy: AlertEscalationPolicy;

    readonly createdAt: Datetime;

    private _resolvedAt: Nullable<Datetime>;

    get status(): AlertStatus {
        return this._status;
    }

    get resolvedAt(): Nullable<Datetime> {
        return this._resolvedAt ? Datetime.clone(this._resolvedAt) : null;
    }

    constructor(
        id: AlertId,
        serviceId: MonitoredServiceId,
        message: AlertMessage,
        status: AlertStatus,
        escalationPolicy: AlertEscalationPolicy,
        createdAt: Datetime,
        resolvedAt: Nullable<Datetime>
    ) {
        super();

        this.id = id;
        this.serviceId = serviceId;
        this.message = message;
        this._status = status;
        this._escalationPolicy = escalationPolicy;
        this.createdAt = createdAt;
        this._resolvedAt = resolvedAt;
    }

    static create(
        id: AlertId,
        serviceId: MonitoredServiceId,
        message: AlertMessage,
        escalationPolicy: AlertEscalationPolicy,
        createdAt: Datetime
    ): Alert {
        const alert = new Alert(id, serviceId, message, AlertStatus.Pending, escalationPolicy, createdAt, null);

        alert.record(new AlertCreatedDomainEvent(alert.toPrimitives()));
        alert.recordEscalationDomainEvent();

        return alert;
    }

    private recordEscalationDomainEvent(): void {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { escalationPolicy, ...others } = this.toPrimitives(),
            currentLevel = this._escalationPolicy.getCurrentLevel();

        this.record(new AlertEscalatedDomainEvent({ ...others, currentLevel: currentLevel.toPrimitives() }));
    }

    isMaxEscalationLevelReached(): boolean {
        return this._escalationPolicy.isMaxEscalationLevelReached();
    }

    escalate(): void {
        this._escalationPolicy = this._escalationPolicy.escalate();

        this.recordEscalationDomainEvent();
    }

    isAcknowledged(): boolean {
        return this.status === AlertStatus.Acknowledged || this.isResolved();
    }

    acknowledge(): void {
        this._status = AlertStatus.Acknowledged;

        this.record(new AlertAcknowledgedDomainEvent(this.toPrimitives()));
    }

    isResolved(): boolean {
        return this.status === AlertStatus.Resolved;
    }

    resolve(resolvedAt: Datetime): void {
        this._status = AlertStatus.Resolved;
        this._resolvedAt = resolvedAt;

        this.record(new AlertResolvedDomainEvent(this.toPrimitives()));
    }

    toPrimitives(): AlertPrimitives {
        return {
            id: this.id.value,
            serviceId: this.serviceId.value,
            message: this.message.value,
            status: this.status,
            escalationPolicy: this._escalationPolicy.toPrimitives(),
            createdAt: this.createdAt.value,
            resolvedAt: this._resolvedAt?.value || null
        };
    }
}
