import MotherCreator from '@ans/ctx-shared/domain/motherCreator.mother';
import Repeater from '@ans/ctx-shared/domain/repeater.mother';
import EmailAddress from '@src/shared/domain/emailAddress';

export default class EmailAddressMother {
    static create(value: string): EmailAddress {
        return new EmailAddress(value);
    }

    static random(): EmailAddress {
        return EmailAddressMother.create(MotherCreator.email());
    }

    static randomList(nItems?: number): EmailAddress[] {
        return Repeater.random(EmailAddressMother.random, nItems);
    }
}
