import EscalationTargetSMS from '@src/shared/domain/escalationPolicies/escalationTargetSMS';
import PhoneNumberMother from '@src/shared/domain/phoneNumber.mother';

export default class EscalationTargetSMSMother {
    static create(phoneNumber: string): EscalationTargetSMS {
        return new EscalationTargetSMS(phoneNumber);
    }

    static random(): EscalationTargetSMS {
        const phoneNumber = PhoneNumberMother.random().value;

        return EscalationTargetSMSMother.create(phoneNumber);
    }
}
