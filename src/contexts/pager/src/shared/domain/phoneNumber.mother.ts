import MotherCreator from '@ans/ctx-shared/domain/motherCreator.mother';
import Repeater from '@ans/ctx-shared/domain/repeater.mother';
import PhoneNumber from '@src/shared/domain/phoneNumber';

export default class PhoneNumberMother {
    static create(value: string): PhoneNumber {
        return new PhoneNumber(value);
    }

    static random(): PhoneNumber {
        return PhoneNumberMother.create(MotherCreator.spanishPhoneNumber());
    }

    static randomList(nItems?: number): PhoneNumber[] {
        return Repeater.random(PhoneNumberMother.random, nItems);
    }
}
