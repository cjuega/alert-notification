/* eslint-disable no-underscore-dangle */
import InvalidArgumentError from '@ans/ctx-shared/domain/invalidArgumentError';
import EscalationPolicyLevel, { EscalationPolicyLevelPrimitives } from '@src/monitoredServices/domain/escalationPolicyLevel';

export type EscalationPolicyPrimitives = {
    levels: EscalationPolicyLevelPrimitives[];
};

export default class EscalationPolicy {
    private readonly _levels: EscalationPolicyLevel[];

    get levels(): EscalationPolicyLevel[] {
        return this._levels.map((l) => EscalationPolicyLevel.clone(l));
    }

    constructor(levels: EscalationPolicyLevel[]) {
        EscalationPolicy.isValidPolicy(levels);

        this._levels = levels;
    }

    static clone(policy: EscalationPolicy): EscalationPolicy {
        return new EscalationPolicy(policy.levels);
    }

    private static isValidPolicy(levels: EscalationPolicyLevel[]): void {
        const isValid = levels.length > 0;

        if (!isValid) {
            throw new InvalidArgumentError('EscalationPolicy must have at least one level');
        }
    }

    toPrimitives(): EscalationPolicyPrimitives {
        return { levels: this._levels.map((l) => l.toPrimitives()) };
    }
}
