import EscalationTarget from '@src/shared/domain/escalationPolicies/escalationTarget';
import EscalationTargetType from '@src/shared/domain/escalationPolicies/escalationTargetType';
import EscalationTargetEmail, { EscalationTargetEmailPrimitives } from '@src/shared/domain/escalationPolicies/escalationTargetEmail';
import EscalationTargetSMS, { EscalationTargetSMSPrimitives } from '@src/shared/domain/escalationPolicies/escalationTargetSMS';

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
