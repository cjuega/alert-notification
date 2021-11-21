import MotherCreator from '@ans/ctx-shared/domain/motherCreator.mother';
import Repeater from '@ans/ctx-shared/domain/repeater.mother';
import Email from '@src/shared/domain/email';

export default class EmailMother {
    static create(value: string): Email {
        return new Email(value);
    }

    static random(): Email {
        return EmailMother.create(MotherCreator.email());
    }

    static randomList(nItems?: number): Email[] {
        return Repeater.random(EmailMother.random, nItems);
    }
}
