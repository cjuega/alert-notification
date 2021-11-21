import EscalationTargetType from '@src/shared/domain/escalationPolicies/escalationTargetType';
import EscalationTarget from '@src/shared/domain/escalationPolicies/escalationTarget';
import EscalationTargetTypeMother from '@src/shared/domain/escalationPolicies/escalationTargetType.mother';
import EscalationTargetEmailMother from '@src/shared/domain/escalationPolicies/escalationTargetEmail.mother';
import EscalationTargetSMSMother from '@src/shared/domain/escalationPolicies/escalationTargetSMS.mother';
import EscalationTargetFactory from '@src/shared/domain/escalationPolicies/escalationTargetTypeFactory';

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

    static fromPrimitives(primitives: any): EscalationTarget {
        const { type, ...others } = primitives;

        return EscalationTargetFactory.fromPrimitives(type, { ...others });
    }
}
