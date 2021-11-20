import MotherCreator from '@ans/ctx-shared/domain/motherCreator.mother';
import Repeater from '@ans/ctx-shared/domain/repeater.mother';
import EscalationPolicyLevel from '@src/monitoredServices/domain/escalationPolicyLevel';
import EscalationTarget from '@src/monitoredServices/domain/escalationTarget';
import EscalationTargetMother from '@src/monitoredServices/domain/escalationTarget.mother';

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
