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

export default class AlertMother {
    static create(
        id: AlertId,
        serviceId: AlertId,
        message: AlertMessage,
        status: AlertStatus,
        createdAt: Datetime,
        resolvedAt: Nullable<Datetime>
    ): Alert {
        return new Alert(id, serviceId, message, status, createdAt, resolvedAt);
    }

    static random(overwrites?: { status?: AlertStatus; resolvedAt?: Nullable<Datetime> }): Alert {
        const id = AlertIdMother.random(),
            serviceId = AlertIdMother.random(),
            message = AlertMessageMother.random(),
            status = overwrites?.status ? overwrites.status : AlertStatusMother.random(),
            createdAt = DatetimeMother.random(),
            randomResolvedAt = MotherCreator.boolean() ? DatetimeMother.random() : null,
            resolvedAt = overwrites?.resolvedAt !== undefined ? overwrites.resolvedAt : randomResolvedAt;

        return AlertMother.create(id, serviceId, message, status, createdAt, resolvedAt);
    }

    static randomList(nItems?: number, overwrites?: { status?: AlertStatus }): Alert[] {
        return Repeater.random(() => AlertMother.random(overwrites), nItems);
    }

    static pendingAlert(): Alert {
        return AlertMother.random({ status: AlertStatus.Pending, resolvedAt: null });
    }

    static resolvedAlert(): Alert {
        return AlertMother.random({ status: AlertStatus.Resolved, resolvedAt: DatetimeMother.random() });
    }

    static clone(alert: Alert, overwrites?: { resolvedAt?: Datetime }): Alert {
        const { id } = alert,
            { serviceId } = alert,
            { message } = alert,
            { status } = alert,
            { createdAt } = alert,
            resolvedAt = overwrites?.resolvedAt ? overwrites.resolvedAt : alert.resolvedAt;

        return AlertMother.create(id, serviceId, message, status, createdAt, resolvedAt);
    }

    static resolve(alert: Alert, resolvedAt: Datetime): Alert {
        return AlertMother.clone(alert, { resolvedAt });
    }
}
