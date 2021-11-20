import InvalidArgumentError from '@ans/ctx-shared/domain/invalidArgumentError';
import EscalationTarget from '@src/monitoredServices/domain/escalationTarget';
import { EscalationTargetEmailPrimitives } from '@src/monitoredServices/domain/escalationTargetEmail';
import { EscalationTargetSMSPrimitives } from '@src/monitoredServices/domain/escalationTargetSMS';

export type EscalationPolicyLevelPrimitives = {
    targets: Array<EscalationTargetEmailPrimitives | EscalationTargetSMSPrimitives>;
};

export default class EscalationPolicyLevel {
    private readonly targets: EscalationTarget[];

    constructor(targets: EscalationTarget[]) {
        EscalationPolicyLevel.isValidLevel(targets);

        this.targets = targets;
    }

    static clone(level: EscalationPolicyLevel): EscalationPolicyLevel {
        const targets = level.targets.map((t) => t.clone());

        return new EscalationPolicyLevel(targets);
    }

    private static isValidLevel(targets: EscalationTarget[]): void {
        const isValid = targets.length > 0;

        if (!isValid) {
            throw new InvalidArgumentError('EscalationPolicyLevel must have at least one target');
        }
    }

    toPrimitives(): EscalationPolicyLevelPrimitives {
        return {
            targets: this.targets.map((t) => t.toPrimitives()) as Array<EscalationTargetEmailPrimitives | EscalationTargetSMSPrimitives>
        };
    }
}
