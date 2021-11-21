import { CommandHandler } from '@ans/ctx-shared/domain/bus/command/commandHandler';
import Command from '@ans/ctx-shared/domain/bus/command/command';
import AlertId from '@src/alerts/domain/alertId';
import AlertAcknowledger from '@src/alerts/application/acknowledge/alertAcknowledger';
import AcknowledgeAlertCommand from '@src/alerts/application/acknowledge/acknowledgeAlertCommand';

export default class AcknowledgeAlertCommandHandler implements CommandHandler<AcknowledgeAlertCommand> {
    private acknowledger: AlertAcknowledger;

    constructor(acknowledger: AlertAcknowledger) {
        this.acknowledger = acknowledger;
    }

    // eslint-disable-next-line class-methods-use-this
    subscribedTo(): Command {
        return AcknowledgeAlertCommand;
    }

    async handle(command: AcknowledgeAlertCommand): Promise<void> {
        const id = new AlertId(command.id);

        await this.acknowledger.run(id);
    }
}
