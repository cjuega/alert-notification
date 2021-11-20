import MonitoredService from '@src/monitoredServices/domain/monitoredService';
import MonitoredServiceIdMother from '@src/monitoredServices/domain/monitoredServiceId.mother';
import MonitoredServiceNameMother from '@src/monitoredServices/domain/monitoredServiceName.mother';
import MonitoredServiceStatus from '@src/monitoredServices/domain/monitoredServiceStatus';
import MonitoredServiceStatusMother from '@src/monitoredServices/domain/monitoredServiceStatus.mother';
import EscalationPolicy from '@src/monitoredServices/domain/escalationPolicy';
import EscalationPolicyMother from '@src/monitoredServices/domain/escalationPolicy.mother';
import Repeater from '@ans/ctx-shared/domain/repeater.mother';

export default class MonitoredServiceMother {
    static create(id: string, name: string, status: MonitoredServiceStatus, escalationPolicy: EscalationPolicy): MonitoredService {
        return new MonitoredService(id, name, status, escalationPolicy);
    }

    static random(overwrites?: { status?: MonitoredServiceStatus }): MonitoredService {
        const id = MonitoredServiceIdMother.random().value,
            name = MonitoredServiceNameMother.random().value,
            status = overwrites?.status ? overwrites.status : MonitoredServiceStatusMother.random(),
            escalationPolicy = EscalationPolicyMother.random();

        return MonitoredServiceMother.create(id, name, status, escalationPolicy);
    }

    static invalid(): { id: string; name: string } {
        return { id: 'invalid value', name: "there aren't validations for name" };
    }

    static randomList(nItems?: number, overwrites?: { status?: MonitoredServiceStatus }): MonitoredService[] {
        return Repeater.random(() => MonitoredServiceMother.random(overwrites), nItems);
    }

    static clone(service: MonitoredService, overwrites?: { status?: MonitoredServiceStatus }): MonitoredService {
        const id = MonitoredServiceIdMother.create(service.id.value),
            name = MonitoredServiceNameMother.create(service.name.value),
            status = overwrites?.status ? overwrites.status : service.status,
            escalationPolicy = EscalationPolicyMother.clone(service.escalationPolicy);

        return MonitoredServiceMother.create(id.value, name.value, status, escalationPolicy);
    }

    static toggleStatus(service: MonitoredService): MonitoredService {
        return MonitoredServiceMother.clone(service, { status: MonitoredServiceStatusMother.toggle(service.status) });
    }
}
