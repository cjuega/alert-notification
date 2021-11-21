import InvalidArgumentError from '@ans/ctx-shared/domain/invalidArgumentError';
import StringValueObject from '@ans/ctx-shared/domain/stringValueObject';

export default class Email extends StringValueObject {
    // eslint-disable-next-line max-len,no-useless-escape
    private static VALID_EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    constructor(value: string) {
        const trimmed = value.trim();

        Email.isValid(trimmed);

        super(trimmed);
    }

    private static isValid(value: string): void {
        const isValid = Email.VALID_EMAIL_REGEX.test(value);

        if (!isValid) {
            throw new InvalidArgumentError(`<${value}> is not a valid email address`);
        }
    }
}
