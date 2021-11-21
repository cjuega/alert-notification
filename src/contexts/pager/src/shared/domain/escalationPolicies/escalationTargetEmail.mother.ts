import EmailMother from '@src/shared/domain/email.mother';
import EscalationTargetEmail from '@src/shared/domain/escalationPolicies/escalationTargetEmail';

export default class EscalationTargetEmailMother {
    static create(email: string): EscalationTargetEmail {
        return new EscalationTargetEmail(email);
    }

    static random(): EscalationTargetEmail {
        const email = EmailMother.random().value;

        return EscalationTargetEmailMother.create(email);
    }
}
