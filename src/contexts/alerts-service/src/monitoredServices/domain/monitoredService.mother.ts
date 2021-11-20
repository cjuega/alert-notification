import MonitoredService from '@src/monitoredServices/domain/monitoredService';
import MonitoredServiceIdMother from '@src/monitoredServices/domain/monitoredServiceId.mother';
import MonitoredServiceNameMother from '@src/monitoredServices/domain/monitoredServiceName.mother';
import MonitoredServiceStatus from '@src/monitoredServices/domain/monitoredServiceStatus';
import MonitoredServiceStatusMother from '@src/monitoredServices/domain/monitoredServiceStatus.mother';

export default class MonitoredServiceMother {
    static create(id: string, name: string, status: MonitoredServiceStatus): MonitoredService {
        return new MonitoredService(id, name, status);
    }

    static random(overwrites?: { status?: MonitoredServiceStatus }): MonitoredService {
        const id = MonitoredServiceIdMother.random().value,
            name = MonitoredServiceNameMother.random().value,
            status = overwrites?.status ? overwrites.status : MonitoredServiceStatusMother.random();

        return MonitoredServiceMother.create(id, name, status);
    }

    static invalid(): { id: string; name: string } {
        return { id: 'invalid value', name: "there aren't validations for name" };
    }
}
