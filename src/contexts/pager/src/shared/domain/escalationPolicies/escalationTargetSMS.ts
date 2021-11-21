import EscalationTarget from '@src/shared/domain/escalationPolicies/escalationTarget';
import EscalationTargetType from '@src/shared/domain/escalationPolicies/escalationTargetType';
import PhoneNumber from '@src/shared/domain/phoneNumber';

export type EscalationTargetSMSPrimitives = {
    type: EscalationTargetType;
    phoneNumber: string;
};

export default class EscalationTargetSMS extends EscalationTarget {
    readonly phoneNumber: PhoneNumber;

    constructor(phoneNumber: string) {
        super();

        this.phoneNumber = new PhoneNumber(phoneNumber);
    }

    clone(): EscalationTargetSMS {
        return new EscalationTargetSMS(this.phoneNumber.value);
    }

    equalsTo(other: EscalationTargetSMS): boolean {
        if (!(other instanceof EscalationTargetSMS)) {
            return false;
        }

        return this.phoneNumber.equalsTo(other.phoneNumber);
    }

    static type(): EscalationTargetType {
        return EscalationTargetType.SMS;
    }

    static fromPrimitives(primitives: EscalationTargetSMSPrimitives): EscalationTargetSMS {
        return new EscalationTargetSMS(primitives.phoneNumber);
    }

    toPrimitives(): EscalationTargetSMSPrimitives {
        return {
            type: EscalationTargetSMS.type(),
            phoneNumber: this.phoneNumber.value
        };
    }
}
