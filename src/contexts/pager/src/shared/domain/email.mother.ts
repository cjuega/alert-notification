import MotherCreator from '@ans/ctx-shared/domain/motherCreator.mother';
import Email from '@src/shared/domain/email';

export default class EmailMother {
    static create(value: string): Email {
        return new Email(value);
    }

    static random(): Email {
        return EmailMother.create(MotherCreator.email());
    }
}
