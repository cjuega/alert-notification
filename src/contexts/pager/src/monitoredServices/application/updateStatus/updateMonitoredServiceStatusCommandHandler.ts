import Command from '@ans/ctx-shared/domain/bus/command/command';
import { CommandHandler } from '@ans/ctx-shared/domain/bus/command/commandHandler';
import MonitoredServiceId from '@src/shared/domain/monitoredServiceId';
import MonitoredServiceStatusUpdater from '@src/monitoredServices/application/updateStatus/monitoredServiceStatusUpdater';
import UpdateMonitoredServiceStatusCommand from '@src/monitoredServices/application/updateStatus/updateMonitoredServiceStatusCommand';

export default class UpdateMonitoredServiceStatusCommandHandler implements CommandHandler<UpdateMonitoredServiceStatusCommand> {
    private updater: MonitoredServiceStatusUpdater;

    constructor(updater: MonitoredServiceStatusUpdater) {
        this.updater = updater;
    }

    // eslint-disable-next-line class-methods-use-this
    subscribedTo(): Command {
        return UpdateMonitoredServiceStatusCommand;
    }

    async handle(command: UpdateMonitoredServiceStatusCommand): Promise<void> {
        const id = new MonitoredServiceId(command.id);

        await this.updater.run(id, command.status);
    }
}
