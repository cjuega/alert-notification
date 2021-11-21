import MotherCreator from '@ans/ctx-shared/domain/motherCreator.mother';
import UpdateMonitoredServiceCommand, { CommandParams } from '@src/monitoredServices/application/update/updateMonitoredServiceCommand';
import MonitoredService from '@src/monitoredServices/domain/monitoredService';
import MonitoredServiceMother from '@src/monitoredServices/domain/monitoredService.mother';
import MonitoredServiceNameMother from '@src/monitoredServices/domain/monitoredServiceName.mother';
import EmailMother from '@src/shared/domain/email.mother';
import EscalationPolicy from '@src/shared/domain/escalationPolicies/escalationPolicy';
import EscalationPolicyLevel from '@src/shared/domain/escalationPolicies/escalationPolicyLevel';
import EscalationTarget from '@src/shared/domain/escalationPolicies/escalationTarget';
import EscalationTargetEmail from '@src/shared/domain/escalationPolicies/escalationTargetEmail';
import EscalationTargetSMS from '@src/shared/domain/escalationPolicies/escalationTargetSMS';
import MonitoredServiceIdMother from '@src/shared/domain/monitoredServiceId.mother';
import PhoneNumberMother from '@src/shared/domain/phoneNumber.mother';

export default class UpdateMonitoredServiceCommandMother {
    static create(params: CommandParams): UpdateMonitoredServiceCommand {
        return new UpdateMonitoredServiceCommand(params);
    }

    static random(overwrites?: { id?: string }): UpdateMonitoredServiceCommand {
        const id = overwrites?.id ? overwrites.id : MonitoredServiceIdMother.random().value,
            name = MotherCreator.boolean() ? MonitoredServiceNameMother.random().value : undefined,
            escalationPolicy = MotherCreator.boolean() ? UpdateMonitoredServiceCommandMother.randomEscalationPolicy() : undefined;

        return UpdateMonitoredServiceCommandMother.create({ id, name, escalationPolicy });
    }

    private static randomEscalationPolicy(): Array<{ emails: string[]; phoneNumbers: string[] }> {
        const levels = MotherCreator.positiveNumber(3),
            policy: Array<{ emails: string[]; phoneNumbers: string[] }> = [];

        for (let i = 0; i < levels; i += 1) {
            const nEmails = MotherCreator.zeroOrPositiveNumber(2),
                hasEmails = nEmails > 0,
                emails = EmailMother.randomList(nEmails).map((e) => e.value),
                nPhones = hasEmails ? MotherCreator.zeroOrPositiveNumber(2) : MotherCreator.positiveNumber(2),
                phoneNumbers = PhoneNumberMother.randomList(nPhones).map((p) => p.value);

            policy.push({ emails, phoneNumbers });
        }

        return policy;
    }

    static invalid(): UpdateMonitoredServiceCommand {
        const isIdInvalid = MotherCreator.boolean(),
            id = isIdInvalid ? 'invalid id' : MonitoredServiceIdMother.random().value,
            name = MonitoredServiceNameMother.random().value,
            isInvalidEscalationPolicy = !isIdInvalid || MotherCreator.boolean(),
            escalationPolicy = isInvalidEscalationPolicy
                ? UpdateMonitoredServiceCommandMother.invalidEscalationPolicy()
                : UpdateMonitoredServiceCommandMother.randomEscalationPolicy();

        return UpdateMonitoredServiceCommandMother.create({ id, name, escalationPolicy });
    }

    private static invalidEscalationPolicy(): Array<{ emails: string[]; phoneNumbers: string[] }> {
        if (MotherCreator.boolean()) {
            return [];
        }

        return [{ emails: [], phoneNumbers: [] }];
    }

    static applyCommand(command: UpdateMonitoredServiceCommand, service: MonitoredService): MonitoredService {
        const name = command.name ? MonitoredServiceNameMother.create(command.name) : undefined,
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

        return MonitoredServiceMother.clone(service, { name, escalationPolicy });
    }
}
