import UuidMother from '@ans/ctx-shared/domain/uuid.mother';
import MonitoredServiceId from '@src/monitoredServices/domain/monitoredServiceId';

export default class MonitoredServiceIdMother {
    static create(id: string): MonitoredServiceId {
        return new MonitoredServiceId(id);
    }

    static random(): MonitoredServiceId {
        return MonitoredServiceIdMother.create(UuidMother.random());
    }
}
