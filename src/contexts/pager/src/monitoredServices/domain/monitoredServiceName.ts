import StringValueObject from '@ans/ctx-shared/domain/stringValueObject';

export default class MonitoredServiceName extends StringValueObject {
    constructor(value: string) {
        super(value.trim());
    }

    static clone(name: MonitoredServiceName): MonitoredServiceName {
        return new MonitoredServiceName(name.value);
    }
}
