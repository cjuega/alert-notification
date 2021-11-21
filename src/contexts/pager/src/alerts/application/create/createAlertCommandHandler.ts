import { CommandHandler } from '@ans/ctx-shared/domain/bus/command/commandHandler';
import Command from '@ans/ctx-shared/domain/bus/command/command';
import AlertId from '@src/alerts/domain/alertId';
import AlertCreator from '@src/alerts/application/create/alertCreator';
import CreateAlertCommand from '@src/alerts/application/create/createAlertCommand';
import AlertMessage from '@src/alerts/domain/alertMessage';
import MonitoredServiceId from '@src/shared/domain/monitoredServiceId';

export default class CreateAlertCommandHandler implements CommandHandler<CreateAlertCommand> {
    private creator: AlertCreator;

    constructor(creator: AlertCreator) {
        this.creator = creator;
    }

    // eslint-disable-next-line class-methods-use-this
    subscribedTo(): Command {
        return CreateAlertCommand;
    }

    async handle(command: CreateAlertCommand): Promise<void> {
        const id = new AlertId(command.id),
            serviceId = new MonitoredServiceId(command.serviceId),
            message = new AlertMessage(command.message);

        await this.creator.run(id, serviceId, message);
    }
}
