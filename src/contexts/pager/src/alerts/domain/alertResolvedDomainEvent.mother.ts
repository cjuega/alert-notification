import Alert from '@src/alerts/domain/alert';
import { AlertPrimitives } from '@src/alerts/domain/alertPrimitives';
import AlertResolvedDomainEvent from '@src/alerts/domain/alertResolvedDomainEvent';
import AlertMother from '@src/alerts/domain/alert.mother';

export default class AlertResolvedDomainEventMother {
    static create(
        params: AlertPrimitives & {
            eventId?: string;
            occurredOn?: Date;
        }
    ): AlertResolvedDomainEvent {
        return new AlertResolvedDomainEvent(params);
    }

    static fromAlert(alert: Alert): AlertResolvedDomainEvent {
        return AlertResolvedDomainEventMother.create(alert.toPrimitives());
    }

    static random(): AlertResolvedDomainEvent {
        const alert = AlertMother.random();

        return AlertResolvedDomainEventMother.fromAlert(alert);
    }
}
