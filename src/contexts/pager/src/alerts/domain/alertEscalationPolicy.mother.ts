import EscalationPolicy from '@src/shared/domain/escalationPolicies/escalationPolicy';
import AlertEscalationPolicy from '@src/alerts/domain/alertEscalationPolicy';
import AlertEscalationPolicyCurrentLevel from '@src/alerts/domain/alertEscalationPolicyCurrentLevel';
import EscalationPolicyMother from '@src/shared/domain/escalationPolicies/escalationPolicy.mother';
import AlertEscalationPolicyCurrentLevelMother from '@src/alerts/domain/alertEscalationPolicyCurrentLevel.mother';
import MotherCreator from '@ans/ctx-shared/domain/motherCreator.mother';
import FindMonitoredServiceResponse from '@src/monitoredServices/application/find/findMonitoredServiceResponse';

export default class AlertEscalationPolicyMother {
    static create(policy: EscalationPolicy, currentLevel: AlertEscalationPolicyCurrentLevel): AlertEscalationPolicy {
        return new AlertEscalationPolicy(policy, currentLevel);
    }

    static random(overwrites?: { policy?: EscalationPolicy }): AlertEscalationPolicy {
        const policy = overwrites?.policy ? overwrites.policy : EscalationPolicyMother.random(),
            currentLevel = AlertEscalationPolicyCurrentLevelMother.random(policy);

        return AlertEscalationPolicyMother.create(policy, currentLevel);
    }

    static maxEscalationNotReached(): AlertEscalationPolicy {
        const policy = EscalationPolicyMother.random(Math.max(2, MotherCreator.positiveNumber(5))),
            notLastLevel = MotherCreator.zeroOrPositiveNumber(policy.levels.length - 2),
            currentLevel = AlertEscalationPolicyCurrentLevelMother.create(notLastLevel);

        return AlertEscalationPolicyMother.create(policy, currentLevel);
    }

    static maxEscalationReached(): AlertEscalationPolicy {
        const policy = EscalationPolicyMother.random(),
            currentLevel = AlertEscalationPolicyCurrentLevelMother.create(policy.levels.length - 1);

        return AlertEscalationPolicyMother.create(policy, currentLevel);
    }

    static initFromFindMonitoredServiceResponse({ monitoredService }: FindMonitoredServiceResponse): AlertEscalationPolicy {
        const policy = EscalationPolicyMother.fromPrimitives(monitoredService.escalationPolicy),
            currentLevel = AlertEscalationPolicyCurrentLevelMother.init();

        return AlertEscalationPolicyMother.create(policy, currentLevel);
    }
}
