import Alert from '@src/alerts/domain/alert';
import AlertId from '@src/alerts/domain/alertId';
import AlertStatus from '@src/alerts/domain/alertStatus';
import AlertMessage from '@src/alerts/domain/alertMessage';
import AlertIdMother from '@src/alerts/domain/alertId.mother';
import AlertMessageMother from '@src/alerts/domain/alertMessage.mother';
import AlertStatusMother from '@src/alerts/domain/alertStatus.mother';
import Datetime from '@ans/ctx-shared/domain/datetime';
import DatetimeMother from '@ans/ctx-shared/domain/datetime.mother';
import { Nullable } from '@ans/ctx-shared/domain/nullable';
import MotherCreator from '@ans/ctx-shared/domain/motherCreator.mother';
import Repeater from '@ans/ctx-shared/domain/repeater.mother';
import AlertEscalationPolicy from '@src/alerts/domain/alertEscalationPolicy';
import AlertEscalationPolicyMother from '@src/alerts/domain/alertEscalationPolicy.mother';

export default class AlertMother {
    static create(
        id: AlertId,
        serviceId: AlertId,
        message: AlertMessage,
        status: AlertStatus,
        escalationPolicy: AlertEscalationPolicy,
        createdAt: Datetime,
        resolvedAt: Nullable<Datetime>
    ): Alert {
        return new Alert(id, serviceId, message, status, escalationPolicy, createdAt, resolvedAt);
    }

    static random(overwrites?: { status?: AlertStatus; escalationPolicy?: AlertEscalationPolicy; resolvedAt?: Nullable<Datetime> }): Alert {
        const id = AlertIdMother.random(),
            serviceId = AlertIdMother.random(),
            message = AlertMessageMother.random(),
            status = overwrites?.status ? overwrites.status : AlertStatusMother.random(),
            escalationPolicy = overwrites?.escalationPolicy ? overwrites.escalationPolicy : AlertEscalationPolicyMother.random(),
            createdAt = DatetimeMother.random(),
            randomResolvedAt = status === AlertStatus.Resolved || MotherCreator.boolean() ? DatetimeMother.random() : null,
            resolvedAt = overwrites?.resolvedAt !== undefined ? overwrites.resolvedAt : randomResolvedAt;

        return AlertMother.create(id, serviceId, message, status, escalationPolicy, createdAt, resolvedAt);
    }

    static randomList(nItems?: number, overwrites?: { status?: AlertStatus }): Alert[] {
        return Repeater.random(() => AlertMother.random(overwrites), nItems);
    }

    static pendingAlert(overwrites?: { escalationPolicy?: AlertEscalationPolicy }): Alert {
        return AlertMother.random({ ...overwrites, status: AlertStatus.Pending, resolvedAt: null });
    }

    static resolvedAlert(): Alert {
        return AlertMother.random({ status: AlertStatus.Resolved, resolvedAt: DatetimeMother.random() });
    }

    static maxEscalationNotReached(overwrites?: { status?: AlertStatus }): Alert {
        return AlertMother.random({ ...overwrites, escalationPolicy: AlertEscalationPolicyMother.maxEscalationNotReached() });
    }

    static maxEscalationReached(): Alert {
        return AlertMother.random({ escalationPolicy: AlertEscalationPolicyMother.maxEscalationReached() });
    }

    static clone(alert: Alert, overwrites?: { escalationPolicy?: AlertEscalationPolicy; resolvedAt?: Datetime }): Alert {
        const { id } = alert,
            { serviceId } = alert,
            { message } = alert,
            { status } = alert,
            // FIXME: Replace this ugly way to clone EscalationPolicy whenever we need escalationPolicy to be public
            escalationPolicy = overwrites?.escalationPolicy
                ? overwrites.escalationPolicy
                : AlertEscalationPolicy.fromPrimitives(alert.toPrimitives().escalationPolicy),
            { createdAt } = alert,
            resolvedAt = overwrites?.resolvedAt ? overwrites.resolvedAt : alert.resolvedAt;

        return AlertMother.create(id, serviceId, message, status, escalationPolicy, createdAt, resolvedAt);
    }

    static resolve(alert: Alert, resolvedAt: Datetime): Alert {
        return AlertMother.clone(alert, { resolvedAt });
    }

    static escalate(alert: Alert): Alert {
        // FIXME: Replace this ugly way to clone EscalationPolicy whenever we need escalationPolicy to be public
        const { escalationPolicy } = alert.toPrimitives();

        escalationPolicy.currentLevel += 1;

        return AlertMother.clone(alert, { escalationPolicy: AlertEscalationPolicy.fromPrimitives(escalationPolicy) });
    }
}
