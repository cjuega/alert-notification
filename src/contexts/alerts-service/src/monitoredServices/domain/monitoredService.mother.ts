import MonitoredService from '@src/monitoredServices/domain/monitoredService';
import MonitoredServiceIdMother from '@src/monitoredServices/domain/monitoredServiceId.mother';

export default class MonitoredServiceMother {
    static create(id: string): MonitoredService {
        return new MonitoredService(id);
    }

    static random(): MonitoredService {
        const id = MonitoredServiceIdMother.random().value;

        return MonitoredServiceMother.create(id);
    }
}
