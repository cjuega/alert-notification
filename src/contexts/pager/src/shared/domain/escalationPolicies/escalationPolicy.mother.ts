import MotherCreator from '@ans/ctx-shared/domain/motherCreator.mother';
import Repeater from '@ans/ctx-shared/domain/repeater.mother';
import EscalationPolicy, { EscalationPolicyPrimitives } from '@src/shared/domain/escalationPolicies/escalationPolicy';
import EscalationPolicyLevel from '@src/shared/domain/escalationPolicies/escalationPolicyLevel';
import EscalationPolicyLevelMother from '@src/shared/domain/escalationPolicies/escalationPolicyLevel.mother';

export default class EscalationPolicyMother {
    static create(levels: EscalationPolicyLevel[]): EscalationPolicy {
        return new EscalationPolicy(levels);
    }

    static random(nLevels?: number): EscalationPolicy {
        const nItems = nLevels !== undefined ? nLevels : MotherCreator.positiveNumber(3),
            levels = Repeater.random(EscalationPolicyLevelMother.random, nItems);

        return EscalationPolicyMother.create(levels);
    }

    static clone(policy: EscalationPolicy): EscalationPolicy {
        return EscalationPolicyMother.create(policy.levels);
    }

    static fromPrimitives(primitives: EscalationPolicyPrimitives): EscalationPolicy {
        return EscalationPolicy.fromPrimitives(primitives);
    }
}
