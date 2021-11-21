import Command from '@ans/ctx-shared/domain/bus/command/command';
import MonitoredServiceStatus from '@src/monitoredServices/domain/monitoredServiceStatus';

export type CommandParams = {
    id: string;
    status: MonitoredServiceStatus;
};

export default class UpdateMonitoredServiceStatusCommand extends Command {
    readonly id: string;

    readonly status: MonitoredServiceStatus;

    constructor({ id, status }: CommandParams) {
        super();

        this.id = id;
        this.status = status;
    }
}
