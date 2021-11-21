import MotherCreator from '@ans/ctx-shared/domain/motherCreator.mother';
import Repeater from '@ans/ctx-shared/domain/repeater.mother';
import EscalationPolicyLevel from '@src/shared/domain/escalationPolicies/escalationPolicyLevel';
import EscalationTarget from '@src/shared/domain/escalationPolicies/escalationTarget';
import EscalationTargetMother from '@src/shared/domain/escalationPolicies/escalationTarget.mother';

export default class EscalationPolicyLevelMother {
    static create(targets: EscalationTarget[]): EscalationPolicyLevel {
        return new EscalationPolicyLevel(targets);
    }

    static random(nTargets?: number): EscalationPolicyLevel {
        const nItems = nTargets !== undefined ? nTargets : MotherCreator.positiveNumber(5),
            targets = Repeater.random(EscalationTargetMother.random, nItems);

        return EscalationPolicyLevelMother.create(targets);
    }
}
