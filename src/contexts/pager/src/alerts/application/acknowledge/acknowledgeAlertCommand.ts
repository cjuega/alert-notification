import Command from '@ans/ctx-shared/domain/bus/command/command';

export type CommandParams = {
    id: string;
};

export default class AcknowledgeAlertCommand extends Command {
    readonly id: string;

    constructor({ id }: CommandParams) {
        super();

        this.id = id;
    }
}
