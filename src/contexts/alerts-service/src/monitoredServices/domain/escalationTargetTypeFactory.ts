import EscalationTarget from '@src/monitoredServices/domain/escalationTarget';
import EscalationTargetType from '@src/monitoredServices/domain/escalationTargetType';
import EscalationTargetEmail, { EscalationTargetEmailPrimitives } from '@src/monitoredServices/domain/escalationTargetEmail';
import EscalationTargetSMS, { EscalationTargetSMSPrimitives } from '@src/monitoredServices/domain/escalationTargetSMS';

export default class EscalationTargetFactory {
    static fromPrimitives(type: EscalationTargetType, targetData: unknown): EscalationTarget {
        switch (type) {
        case EscalationTargetType.Email:
            return EscalationTargetEmail.fromPrimitives(targetData as EscalationTargetEmailPrimitives);
        case EscalationTargetType.SMS:
            return EscalationTargetSMS.fromPrimitives(targetData as EscalationTargetSMSPrimitives);
        default:
            // eslint-disable-next-line no-case-declarations
            const exhaustiveTyping: never = type;
            return exhaustiveTyping;
        }
    }
}
