import MotherCreator from '@ans/ctx-shared/domain/motherCreator.mother';
import PhoneNumber from '@src/shared/domain/phoneNumber';

export default class PhoneNumberMother {
    static create(value: string): PhoneNumber {
        return new PhoneNumber(value);
    }

    static random(): PhoneNumber {
        return PhoneNumberMother.create(MotherCreator.spanishPhoneNumber());
    }
}
