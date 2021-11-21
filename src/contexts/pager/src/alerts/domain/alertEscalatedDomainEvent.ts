import { DomainEvent } from '@ans/ctx-shared/domain/bus/event/domainEvent';
import { AlertPrimitives } from '@src/alerts/domain/alertPrimitives';
import AlertStatus from '@src/alerts/domain/alertStatus';
import { EscalationPolicyLevelPrimitives } from '@src/shared/domain/escalationPolicies/escalationPolicyLevel';

type EscalateAlertDomainEventBody = Readonly<Omit<AlertPrimitives, 'id' | 'escalationPolicy' | 'resolvedAt'>> & {
    readonly currentLevel: EscalationPolicyLevelPrimitives;
};

export default class AlertEscalatedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME = 'aircall.pager.1.event.alert.escalated';

    readonly serviceId: string;

    readonly message: string;

    readonly status: AlertStatus;

    readonly currentLevel: EscalationPolicyLevelPrimitives;

    readonly createdAt: string;

    constructor({
        id,
        serviceId,
        message,
        status,
        currentLevel,
        createdAt,
        eventId,
        occurredOn
    }: Omit<AlertPrimitives, 'escalationPolicy' | 'resolvedAt'> & {
        currentLevel: EscalationPolicyLevelPrimitives;
        eventId?: string;
        occurredOn?: Date;
    }) {
        super(AlertEscalatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);

        this.serviceId = serviceId;
        this.message = message;
        this.status = status;
        this.currentLevel = currentLevel;
        this.createdAt = createdAt;
    }

    toPrimitives(): EscalateAlertDomainEventBody {
        const {
            serviceId, message, status, currentLevel, createdAt
        } = this;

        return {
            serviceId,
            message,
            status,
            currentLevel,
            createdAt
        };
    }

    static fromPrimitives(aggregateId: string, body: EscalateAlertDomainEventBody, eventId: string, occurredOn: Date): DomainEvent {
        return new AlertEscalatedDomainEvent({
            id: aggregateId,
            serviceId: body.serviceId,
            message: body.message,
            status: body.status,
            currentLevel: body.currentLevel,
            createdAt: body.createdAt,
            eventId,
            occurredOn
        });
    }
}
