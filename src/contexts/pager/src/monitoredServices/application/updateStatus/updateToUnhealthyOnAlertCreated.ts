import { DomainEventSubscriber } from '@ans/ctx-shared/domain/bus/event/domainEventSubscriber';
import { CommandBus } from '@ans/ctx-shared/domain/bus/command/commandBus';
import { DomainEventClass } from '@ans/ctx-shared/domain/bus/event/domainEvent';
import AlertCreatedDomainEvent from '@src/alerts/domain/alertCreatedDomainEvent';
import MonitoredServiceStatus from '@src/monitoredServices/domain/monitoredServiceStatus';
import UpdateMonitoredServiceStatusCommand from '@src/monitoredServices/application/updateStatus/updateMonitoredServiceStatusCommand';

export default class UpdateToUnhealthyOnAlertCreated implements DomainEventSubscriber<AlertCreatedDomainEvent> {
    private commandBus: CommandBus;

    constructor(commandBus: CommandBus) {
        this.commandBus = commandBus;
    }

    // eslint-disable-next-line class-methods-use-this
    subscribedTo(): DomainEventClass[] {
        return [AlertCreatedDomainEvent];
    }

    async on(domainEvent: AlertCreatedDomainEvent): Promise<void> {
        const command = new UpdateMonitoredServiceStatusCommand({ id: domainEvent.serviceId, status: MonitoredServiceStatus.Unhealthy });

        await this.commandBus.dispatch(command);
    }
}
