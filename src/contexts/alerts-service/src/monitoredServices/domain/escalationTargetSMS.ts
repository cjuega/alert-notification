import EscalationTarget from '@src/monitoredServices/domain/escalationTarget';
import EscalationTargetType from '@src/monitoredServices/domain/escalationTargetType';
import PhoneNumber from '@src/monitoredServices/domain/phoneNumber';

export type EscalationTargetSMSPrimitives = {
    phoneNumber: string;
};

export default class EscalationTargetSMS extends EscalationTarget {
    readonly phoneNumber: PhoneNumber;

    constructor(phoneNumber: string) {
        super();

        this.phoneNumber = new PhoneNumber(phoneNumber);
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
        return { phoneNumber: this.phoneNumber.value };
    }
}
