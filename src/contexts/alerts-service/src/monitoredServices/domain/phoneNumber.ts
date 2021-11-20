import parsePhoneNumber, { CountryCode, isValidPhoneNumber } from 'libphonenumber-js';
import InvalidArgumentError from '@ans/ctx-shared/domain/invalidArgumentError';
import StringValueObject from '@ans/ctx-shared/domain/stringValueObject';

export default class PhoneNumber extends StringValueObject {
    // FIXME: remove hardcoded values. Let PhoneNumber to allow both number and country.
    private static SPAIN: CountryCode = 'ES';

    constructor(value: string) {
        const trimmed = value.trim();

        PhoneNumber.isValid(trimmed);

        super(parsePhoneNumber(trimmed, PhoneNumber.SPAIN)!.formatNational());
    }

    private static isValid(value: string): void {
        if (!isValidPhoneNumber(value, PhoneNumber.SPAIN)) {
            throw new InvalidArgumentError(`<${value}> is not a valid phone number`);
        }
    }
}
