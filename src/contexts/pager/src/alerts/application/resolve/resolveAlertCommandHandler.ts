import { CommandHandler } from '@ans/ctx-shared/domain/bus/command/commandHandler';
import Command from '@ans/ctx-shared/domain/bus/command/command';
import AlertId from '@src/alerts/domain/alertId';
import AlertResolver from '@src/alerts/application/resolve/alertResolver';
import ResolveAlertCommand from '@src/alerts/application/resolve/resolveAlertCommand';

export default class ResolveAlertCommandHandler implements CommandHandler<ResolveAlertCommand> {
    private resolver: AlertResolver;

    constructor(resolver: AlertResolver) {
        this.resolver = resolver;
    }

    // eslint-disable-next-line class-methods-use-this
    subscribedTo(): Command {
        return ResolveAlertCommand;
    }

    async handle(command: ResolveAlertCommand): Promise<void> {
        const id = new AlertId(command.id);

        await this.resolver.run(id);
    }
}
