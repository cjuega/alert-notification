import EscalationTargetType from '@src/monitoredServices/domain/escalationTargetType';
import EscalationTarget from '@src/monitoredServices/domain/escalationTarget';
import EscalationTargetTypeMother from '@src/monitoredServices/domain/escalationTargetType.mother';
import EscalationTargetEmailMother from '@src/monitoredServices/domain/escalationTargetEmail.mother';
import EscalationTargetSMSMother from '@src/monitoredServices/domain/escalationTargetSMS.mother';

export default class EscalationTargetMother {
    private static getConcreteMother(type: EscalationTargetType): any {
        switch (type) {
        case EscalationTargetType.Email:
            return EscalationTargetEmailMother;
        case EscalationTargetType.SMS:
            return EscalationTargetSMSMother;
        default:
            // eslint-disable-next-line no-case-declarations
            const exhaustiveTyping: never = type;
            return exhaustiveTyping;
        }
    }

    static random(): EscalationTarget {
        const mother = EscalationTargetMother.getConcreteMother(EscalationTargetTypeMother.random());

        return mother.random();
    }
}
