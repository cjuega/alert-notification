import Command from '@ans/ctx-shared/domain/bus/command/command';

export type CommandParams = {
    id: string;
    serviceId: string;
    message: string;
};

export default class CreateAlertCommand extends Command {
    readonly id: string;

    readonly serviceId: string;

    readonly message: string;

    constructor({ id, serviceId, message }: CommandParams) {
        super();

        this.id = id;
        this.serviceId = serviceId;
        this.message = message;
    }
}
