import StringValueObject from '@ans/ctx-shared/domain/stringValueObject';

export default class AlertMessage extends StringValueObject {
    constructor(value: string) {
        super(value.trim());
    }
}
