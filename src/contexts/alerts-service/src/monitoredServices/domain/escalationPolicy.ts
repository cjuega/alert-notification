import InvalidArgumentError from '@ans/ctx-shared/domain/invalidArgumentError';
import EscalationPolicyLevel, { EscalationPolicyLevelPrimitives } from '@src/monitoredServices/domain/escalationPolicyLevel';

export type EscalationPolicyPrimitives = {
    levels: EscalationPolicyLevelPrimitives[];
};

export default class EscalationPolicy {
    private readonly levels: EscalationPolicyLevel[];

    constructor(levels: EscalationPolicyLevel[]) {
        EscalationPolicy.isValidPolicy(levels);

        this.levels = levels;
    }

    private static isValidPolicy(levels: EscalationPolicyLevel[]): void {
        const isValid = levels.length > 0;

        if (!isValid) {
            throw new InvalidArgumentError('EscalationPolicy must have at least one level');
        }
    }

    toPrimitives(): EscalationPolicyPrimitives {
        return { levels: this.levels.map((l) => l.toPrimitives()) };
    }
}
