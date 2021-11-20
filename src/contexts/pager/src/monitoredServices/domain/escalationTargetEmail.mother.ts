import EmailMother from '@src/monitoredServices/domain/email.mother';
import EscalationTargetEmail from '@src/monitoredServices/domain/escalationTargetEmail';

export default class EscalationTargetEmailMother {
    static create(email: string): EscalationTargetEmail {
        return new EscalationTargetEmail(email);
    }

    static random(): EscalationTargetEmail {
        const email = EmailMother.random().value;

        return EscalationTargetEmailMother.create(email);
    }
}
