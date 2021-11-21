import Alert from '@src/alerts/domain/alert';
import { AlertPrimitives } from '@src/alerts/domain/alertPrimitives';
import AlertCreatedDomainEvent from '@src/alerts/domain/alertCreatedDomainEvent';
import AlertMother from '@src/alerts/domain/alert.mother';

export default class AlertCreatedDomainEventMother {
    static create(
        params: AlertPrimitives & {
            eventId?: string;
            occurredOn?: Date;
        }
    ): AlertCreatedDomainEvent {
        return new AlertCreatedDomainEvent(params);
    }

    static fromAlert(alert: Alert): AlertCreatedDomainEvent {
        return AlertCreatedDomainEventMother.create(alert.toPrimitives());
    }

    static random(): AlertCreatedDomainEvent {
        const alert = AlertMother.random();

        return AlertCreatedDomainEventMother.fromAlert(alert);
    }
}
