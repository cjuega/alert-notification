import { DomainEvent } from '@ans/ctx-shared/domain/bus/event/domainEvent';
import { Nullable } from '@ans/ctx-shared/domain/nullable';
import { AlertPrimitives } from '@src/alerts/domain/alertPrimitives';
import AlertStatus from '@src/alerts/domain/alertStatus';
import { AlertEscalationPolicyPrimitives } from '@src/alerts/domain/alertEscalationPolicy';

type ResolveAlertDomainEventBody = Readonly<Omit<AlertPrimitives, 'id'>>;

export default class AlertResolvedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME = 'aircall.pager.1.event.alert.resolved';

    readonly serviceId: string;

    readonly message: string;

    readonly status: AlertStatus;

    readonly escalationPolicy: AlertEscalationPolicyPrimitives;

    readonly createdAt: string;

    readonly resolvedAt: Nullable<string>;

    constructor({
        id,
        serviceId,
        message,
        status,
        escalationPolicy,
        createdAt,
        resolvedAt,
        eventId,
        occurredOn
    }: AlertPrimitives & {
        eventId?: string;
        occurredOn?: Date;
    }) {
        super(AlertResolvedDomainEvent.EVENT_NAME, id, eventId, occurredOn);

        this.serviceId = serviceId;
        this.message = message;
        this.status = status;
        this.escalationPolicy = escalationPolicy;
        this.createdAt = createdAt;
        this.resolvedAt = resolvedAt;
    }

    toPrimitives(): ResolveAlertDomainEventBody {
        const {
            serviceId, message, status, escalationPolicy, createdAt, resolvedAt
        } = this;

        return {
            serviceId,
            message,
            status,
            escalationPolicy,
            createdAt,
            resolvedAt
        };
    }

    static fromPrimitives(aggregateId: string, body: ResolveAlertDomainEventBody, eventId: string, occurredOn: Date): DomainEvent {
        return new AlertResolvedDomainEvent({
            id: aggregateId,
            serviceId: body.serviceId,
            message: body.message,
            status: body.status,
            escalationPolicy: body.escalationPolicy,
            createdAt: body.createdAt,
            resolvedAt: body.resolvedAt,
            eventId,
            occurredOn
        });
    }
}
