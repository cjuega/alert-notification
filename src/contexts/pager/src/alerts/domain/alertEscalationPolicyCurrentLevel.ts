import InvalidArgumentError from '@ans/ctx-shared/domain/invalidArgumentError';
import NumberValueObject from '@ans/ctx-shared/domain/numberValueObject';

export default class AlertEscalationPolicyCurrentLevel extends NumberValueObject {
    constructor(value: number) {
        AlertEscalationPolicyCurrentLevel.isValid(value);

        super(value);
    }

    private static isValid(value: number): void {
        if (value < 0) {
            throw new InvalidArgumentError(`Current level of an EscalationPolicy can't be less than 0 <${value}>`);
        }
    }

    static init(): AlertEscalationPolicyCurrentLevel {
        return new AlertEscalationPolicyCurrentLevel(0);
    }

    next(): AlertEscalationPolicyCurrentLevel {
        return new AlertEscalationPolicyCurrentLevel(this.value + 1);
    }
}
