import EscalationPolicy from '@src/shared/domain/escalationPolicies/escalationPolicy';
import AlertEscalationPolicyCurrentLevel from '@src/alerts/domain/alertEscalationPolicyCurrentLevel';
import MotherCreator from '@ans/ctx-shared/domain/motherCreator.mother';

export default class AlertEscalationPolicyCurrentLevelMother {
    static create(value: number): AlertEscalationPolicyCurrentLevel {
        return new AlertEscalationPolicyCurrentLevel(value);
    }

    static init(): AlertEscalationPolicyCurrentLevel {
        return AlertEscalationPolicyCurrentLevelMother.create(0);
    }

    static random(policy: EscalationPolicy): AlertEscalationPolicyCurrentLevel {
        const level = MotherCreator.zeroOrPositiveNumber(policy.levels.length - 1);

        return AlertEscalationPolicyCurrentLevelMother.create(level);
    }
}
