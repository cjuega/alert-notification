import EscalationPolicy, { EscalationPolicyPrimitives } from '@src/shared/domain/escalationPolicies/escalationPolicy';
import EscalationPolicyLevel from '@src/shared/domain/escalationPolicies/escalationPolicyLevel';
import AlertEscalationPolicyCurrentLevel from '@src/alerts/domain/alertEscalationPolicyCurrentLevel';

export type AlertEscalationPolicyPrimitives = EscalationPolicyPrimitives & {
    currentLevel: number;
};

export default class AlertEscalationPolicy {
    private policy: EscalationPolicy;

    private currentLevel: AlertEscalationPolicyCurrentLevel;

    constructor(policy: EscalationPolicy, currentLevel: AlertEscalationPolicyCurrentLevel) {
        this.policy = policy;
        this.currentLevel = currentLevel;
    }

    static init(primitives: EscalationPolicyPrimitives): AlertEscalationPolicy {
        return new AlertEscalationPolicy(EscalationPolicy.fromPrimitives(primitives), AlertEscalationPolicyCurrentLevel.init());
    }

    isMaxEscalationLevelReached(): boolean {
        return this.currentLevel.value === this.policy.levels.length - 1;
    }

    escalate(): AlertEscalationPolicy {
        if (this.isMaxEscalationLevelReached()) {
            return this;
        }

        return new AlertEscalationPolicy(this.policy, this.currentLevel.next());
    }

    getCurrentLevel(): EscalationPolicyLevel {
        return this.policy.levels[this.currentLevel.value];
    }

    static fromPrimitives(primitives: AlertEscalationPolicyPrimitives): AlertEscalationPolicy {
        return new AlertEscalationPolicy(
            EscalationPolicy.fromPrimitives(primitives),
            new AlertEscalationPolicyCurrentLevel(primitives.currentLevel)
        );
    }

    toPrimitives(): AlertEscalationPolicyPrimitives {
        return { ...this.policy.toPrimitives(), currentLevel: this.currentLevel.value };
    }
}
