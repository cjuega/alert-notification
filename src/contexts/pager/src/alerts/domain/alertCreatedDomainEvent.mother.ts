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

    static fromAlert(service: Alert): AlertCreatedDomainEvent {
        return AlertCreatedDomainEventMother.create(service.toPrimitives());
    }

    static random(): AlertCreatedDomainEvent {
        const service = AlertMother.random();

        return AlertCreatedDomainEventMother.fromAlert(service);
    }
}
