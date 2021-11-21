import Alert from '@src/alerts/domain/alert';
import { AlertPrimitives } from '@src/alerts/domain/alertPrimitives';
import AlertAcknowledgedDomainEvent from '@src/alerts/domain/alertAcknowledgedDomainEvent';
import AlertMother from '@src/alerts/domain/alert.mother';

export default class AlertAcknowledgedDomainEventMother {
    static create(
        params: AlertPrimitives & {
            eventId?: string;
            occurredOn?: Date;
        }
    ): AlertAcknowledgedDomainEvent {
        return new AlertAcknowledgedDomainEvent(params);
    }

    static fromAlert(alert: Alert): AlertAcknowledgedDomainEvent {
        return AlertAcknowledgedDomainEventMother.create(alert.toPrimitives());
    }

    static random(): AlertAcknowledgedDomainEvent {
        const alert = AlertMother.random();

        return AlertAcknowledgedDomainEventMother.fromAlert(alert);
    }
}
