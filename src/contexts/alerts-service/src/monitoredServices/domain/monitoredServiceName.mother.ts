import MonitoredServiceName from '@src/monitoredServices/domain/monitoredServiceName';
import MotherCreator from '@ans/ctx-shared/domain/motherCreator.mother';

export default class MonitoredServiceNameMother {
    static create(name: string): MonitoredServiceName {
        return new MonitoredServiceName(name);
    }

    static random(): MonitoredServiceName {
        const name = MotherCreator.words();

        return MonitoredServiceNameMother.create(name);
    }
}
