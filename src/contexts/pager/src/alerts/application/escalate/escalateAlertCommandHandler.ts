import { CommandHandler } from '@ans/ctx-shared/domain/bus/command/commandHandler';
import Command from '@ans/ctx-shared/domain/bus/command/command';
import AlertId from '@src/alerts/domain/alertId';
import AlertEscalator from '@src/alerts/application/escalate/alertEscalator';
import EscalateAlertCommand from '@src/alerts/application/escalate/escalateAlertCommand';

export default class EscalateAlertCommandHandler implements CommandHandler<EscalateAlertCommand> {
    private escalator: AlertEscalator;

    constructor(escalator: AlertEscalator) {
        this.escalator = escalator;
    }

    // eslint-disable-next-line class-methods-use-this
    subscribedTo(): Command {
        return EscalateAlertCommand;
    }

    async handle(command: EscalateAlertCommand): Promise<void> {
        const id = new AlertId(command.id);

        await this.escalator.run(id);
    }
}
