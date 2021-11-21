import { CommandHandler } from '@ans/ctx-shared/domain/bus/command/commandHandler';
import Command from '@ans/ctx-shared/domain/bus/command/command';
import MonitoredServiceId from '@src/shared/domain/monitoredServiceId';
import MonitoredServiceRegistor from '@src/monitoredServices/application/register/monitoredServiceRegistor';
import RegisterMonitoredServiceCommand from '@src/monitoredServices/application/register/registerMonitoredServiceCommand';
import MonitoredServiceName from '@src/monitoredServices/domain/monitoredServiceName';
import EscalationPolicy from '@src/shared/domain/escalationPolicies/escalationPolicy';
import EscalationPolicyLevel from '@src/shared/domain/escalationPolicies/escalationPolicyLevel';
import EscalationTargetEmail from '@src/shared/domain/escalationPolicies/escalationTargetEmail';
import EscalationTargetSMS from '@src/shared/domain/escalationPolicies/escalationTargetSMS';
import EscalationTarget from '@src/shared/domain/escalationPolicies/escalationTarget';

export default class RegisterMonitoredServiceCommandHandler implements CommandHandler<RegisterMonitoredServiceCommand> {
    private registor: MonitoredServiceRegistor;

    constructor(registor: MonitoredServiceRegistor) {
        this.registor = registor;
    }

    // eslint-disable-next-line class-methods-use-this
    subscribedTo(): Command {
        return RegisterMonitoredServiceCommand;
    }

    async handle(command: RegisterMonitoredServiceCommand): Promise<void> {
        const id = new MonitoredServiceId(command.id),
            name = new MonitoredServiceName(command.name),
            escalationPolicy = new EscalationPolicy(
                command.escalationPolicy.map(
                    ({ emails, phoneNumbers }) => new EscalationPolicyLevel([
                        ...(emails.map((e) => new EscalationTargetEmail(e)) as EscalationTarget[]),
                        ...(phoneNumbers.map((p) => new EscalationTargetSMS(p)) as EscalationTarget[])
                    ])
                )
            );

        await this.registor.run(id, name, escalationPolicy);
    }
}
