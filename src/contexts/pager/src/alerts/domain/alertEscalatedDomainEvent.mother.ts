import Alert from '@src/alerts/domain/alert';
import { AlertPrimitives } from '@src/alerts/domain/alertPrimitives';
import AlertEscalatedDomainEvent from '@src/alerts/domain/alertEscalatedDomainEvent';
import AlertMother from '@src/alerts/domain/alert.mother';
import { EscalationPolicyLevelPrimitives } from '@src/shared/domain/escalationPolicies/escalationPolicyLevel';

export default class AlertEscalatedDomainEventMother {
    static create(
        params: Omit<AlertPrimitives, 'escalationPolicy' | 'resolvedAt'> & {
            currentLevel: EscalationPolicyLevelPrimitives;
            eventId?: string;
            occurredOn?: Date;
        }
    ): AlertEscalatedDomainEvent {
        return new AlertEscalatedDomainEvent(params);
    }

    static fromAlert(alert: Alert): AlertEscalatedDomainEvent {
        const { escalationPolicy, ...others } = alert.toPrimitives(),
            currentLevel = escalationPolicy.levels[escalationPolicy.currentLevel];

        return AlertEscalatedDomainEventMother.create({ ...others, currentLevel });
    }

    static random(): AlertEscalatedDomainEvent {
        const alert = AlertMother.random();

        return AlertEscalatedDomainEventMother.fromAlert(alert);
    }
}
