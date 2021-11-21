import CreateAlertCommand, { CommandParams } from '@src/alerts/application/create/createAlertCommand';
import Alert from '@src/alerts/domain/alert';
import AlertMother from '@src/alerts/domain/alert.mother';
import AlertStatus from '@src/alerts/domain/alertStatus';
import AlertIdMother from '@src/alerts/domain/alertId.mother';
import AlertEscalationPolicy from '@src/alerts/domain/alertEscalationPolicy';
import AlertMessageMother from '@src/alerts/domain/alertMessage.mother';
import MonitoredServiceIdMother from '@src/shared/domain/monitoredServiceId.mother';
import DatetimeMother from '@ans/ctx-shared/domain/datetime.mother';

export default class CreateAlertCommandMother {
    static create(params: CommandParams): CreateAlertCommand {
        return new CreateAlertCommand(params);
    }

    static random(overwrites?: { id?: string; serviceId?: string }): CreateAlertCommand {
        const id = overwrites?.id ? overwrites.id : AlertIdMother.random().value,
            serviceId = overwrites?.serviceId ? overwrites.serviceId : MonitoredServiceIdMother.random().value,
            message = AlertMessageMother.random().value;

        return CreateAlertCommandMother.create({ id, serviceId, message });
    }

    static applyCommand(command: CreateAlertCommand, context: { escalationPolicy: AlertEscalationPolicy }): Alert {
        const id = AlertIdMother.create(command.id),
            serviceId = MonitoredServiceIdMother.create(command.serviceId),
            message = AlertMessageMother.create(command.message);

        return AlertMother.create(id, serviceId, message, AlertStatus.Pending, context.escalationPolicy, DatetimeMother.random(), null);
    }
}
