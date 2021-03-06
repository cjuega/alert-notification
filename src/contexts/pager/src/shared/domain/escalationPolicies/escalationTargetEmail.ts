import EscalationTarget from '@src/shared/domain/escalationPolicies/escalationTarget';
import EscalationTargetType from '@src/shared/domain/escalationPolicies/escalationTargetType';
import EmailAddress from '@src/shared/domain/emailAddress';

export type EscalationTargetEmailPrimitives = {
    type: EscalationTargetType;
    email: string;
};

export default class EscalationTargetEmail extends EscalationTarget {
    readonly email: EmailAddress;

    constructor(email: string) {
        super();

        this.email = new EmailAddress(email);
    }

    clone(): EscalationTargetEmail {
        return new EscalationTargetEmail(this.email.value);
    }

    equalsTo(other: EscalationTargetEmail): boolean {
        if (!(other instanceof EscalationTargetEmail)) {
            return false;
        }

        return this.email.equalsTo(other.email);
    }

    static type(): EscalationTargetType {
        return EscalationTargetType.Email;
    }

    static fromPrimitives(primitives: EscalationTargetEmailPrimitives): EscalationTargetEmail {
        return new EscalationTargetEmail(primitives.email);
    }

    toPrimitives(): EscalationTargetEmailPrimitives {
        return { type: EscalationTargetEmail.type(), email: this.email.value };
    }
}
