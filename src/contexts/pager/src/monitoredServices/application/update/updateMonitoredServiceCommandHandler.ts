import { CommandHandler } from '@ans/ctx-shared/domain/bus/command/commandHandler';
import Command from '@ans/ctx-shared/domain/bus/command/command';
import MonitoredServiceId from '@src/shared/domain/monitoredServiceId';
import MonitoredServiceUpdater from '@src/monitoredServices/application/update/monitoredServiceUpdater';
import UpdateMonitoredServiceCommand from '@src/monitoredServices/application/update/updateMonitoredServiceCommand';
import MonitoredServiceName from '@src/monitoredServices/domain/monitoredServiceName';
import EscalationPolicy from '@src/shared/domain/escalationPolicies/escalationPolicy';
import EscalationPolicyLevel from '@src/shared/domain/escalationPolicies/escalationPolicyLevel';
import EscalationTargetEmail from '@src/shared/domain/escalationPolicies/escalationTargetEmail';
import EscalationTargetSMS from '@src/shared/domain/escalationPolicies/escalationTargetSMS';
import EscalationTarget from '@src/shared/domain/escalationPolicies/escalationTarget';

export default class UpdateMonitoredServiceCommandHandler implements CommandHandler<UpdateMonitoredServiceCommand> {
    private updater: MonitoredServiceUpdater;

    constructor(updater: MonitoredServiceUpdater) {
        this.updater = updater;
    }

    // eslint-disable-next-line class-methods-use-this
    subscribedTo(): Command {
        return UpdateMonitoredServiceCommand;
    }

    async handle(command: UpdateMonitoredServiceCommand): Promise<void> {
        const id = new MonitoredServiceId(command.id),
            name = command.name ? new MonitoredServiceName(command.name) : undefined,
            escalationPolicy = command.escalationPolicy
                ? new EscalationPolicy(
                    command.escalationPolicy.map(
                        ({ emails, phoneNumbers }) => new EscalationPolicyLevel([
                            ...(emails.map((e) => new EscalationTargetEmail(e)) as EscalationTarget[]),
                            ...(phoneNumbers.map((p) => new EscalationTargetSMS(p)) as EscalationTarget[])
                        ])
                    )
                )
                : undefined;

        await this.updater.run(id, { name, escalationPolicy });
    }
}
