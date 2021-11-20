import MotherCreator from '@ans/ctx-shared/domain/motherCreator.mother';
import Repeater from '@ans/ctx-shared/domain/repeater.mother';
import EscalationPolicy from '@src/monitoredServices/domain/escalationPolicy';
import EscalationPolicyLevel from '@src/monitoredServices/domain/escalationPolicyLevel';
import EscalationPolicyLevelMother from '@src/monitoredServices/domain/escalationPolicyLevel.mother';

export default class EscalationPolicyMother {
    static create(levels: EscalationPolicyLevel[]): EscalationPolicy {
        return new EscalationPolicy(levels);
    }

    static random(nLevels?: number): EscalationPolicy {
        const nItems = nLevels !== undefined ? nLevels : MotherCreator.positiveNumber(3),
            levels = Repeater.random(EscalationPolicyLevelMother.random, nItems);

        return EscalationPolicyMother.create(levels);
    }
}
