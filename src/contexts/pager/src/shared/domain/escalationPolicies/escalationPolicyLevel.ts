/* eslint-disable no-underscore-dangle */
import InvalidArgumentError from '@ans/ctx-shared/domain/invalidArgumentError';
import EscalationTarget from '@src/shared/domain/escalationPolicies/escalationTarget';
import { EscalationTargetEmailPrimitives } from '@src/shared/domain/escalationPolicies/escalationTargetEmail';
import { EscalationTargetSMSPrimitives } from '@src/shared/domain/escalationPolicies/escalationTargetSMS';
import EscalationTargetFactory from '@src/shared/domain/escalationPolicies/escalationTargetTypeFactory';

export type EscalationPolicyLevelPrimitives = {
    targets: Array<EscalationTargetEmailPrimitives | EscalationTargetSMSPrimitives>;
};

export default class EscalationPolicyLevel {
    private readonly _targets: EscalationTarget[];

    get targets(): EscalationTarget[] {
        return this._targets.map((t) => t.clone());
    }

    constructor(targets: EscalationTarget[]) {
        EscalationPolicyLevel.isValidLevel(targets);

        this._targets = targets;
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

    static fromPrimitives(primitives: EscalationPolicyLevelPrimitives): EscalationPolicyLevel {
        return new EscalationPolicyLevel(
            primitives.targets.map(({ type, ...others }) => EscalationTargetFactory.fromPrimitives(type, { ...others }))
        );
    }

    toPrimitives(): EscalationPolicyLevelPrimitives {
        return {
            targets: this._targets.map((t) => t.toPrimitives()) as Array<EscalationTargetEmailPrimitives | EscalationTargetSMSPrimitives>
        };
    }
}
