import EscalationTarget from '@src/monitoredServices/domain/escalationTarget';
import EscalationTargetType from '@src/monitoredServices/domain/escalationTargetType';
import Email from '@src/monitoredServices/domain/email';

export type EscalationTargetEmailPrimitives = {
    email: string;
};

export default class EscalationTargetEmail extends EscalationTarget {
    readonly email: Email;

    constructor(email: string) {
        super();

        this.email = new Email(email);
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
        return { email: this.email.value };
    }
}
