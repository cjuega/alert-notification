import MonitoredService from '@src/monitoredServices/domain/monitoredService';
import MonitoredServiceIdMother from '@src/shared/domain/monitoredServiceId.mother';
import MonitoredServiceNameMother from '@src/monitoredServices/domain/monitoredServiceName.mother';
import MonitoredServiceStatus from '@src/monitoredServices/domain/monitoredServiceStatus';
import MonitoredServiceStatusMother from '@src/monitoredServices/domain/monitoredServiceStatus.mother';
import EscalationPolicy from '@src/shared/domain/escalationPolicies/escalationPolicy';
import EscalationPolicyMother from '@src/shared/domain/escalationPolicies/escalationPolicy.mother';
import Repeater from '@ans/ctx-shared/domain/repeater.mother';
import MonitoredServiceName from '@src/monitoredServices/domain/monitoredServiceName';
import MonitoredServiceId from '@src/shared/domain/monitoredServiceId';

export default class MonitoredServiceMother {
    static create(
        id: MonitoredServiceId,
        name: MonitoredServiceName,
        status: MonitoredServiceStatus,
        escalationPolicy: EscalationPolicy
    ): MonitoredService {
        return new MonitoredService(id, name, status, escalationPolicy);
    }

    static random(overwrites?: { status?: MonitoredServiceStatus }): MonitoredService {
        const id = MonitoredServiceIdMother.random(),
            name = MonitoredServiceNameMother.random(),
            status = overwrites?.status ? overwrites.status : MonitoredServiceStatusMother.random(),
            escalationPolicy = EscalationPolicyMother.random();

        return MonitoredServiceMother.create(id, name, status, escalationPolicy);
    }

    static randomList(nItems?: number, overwrites?: { status?: MonitoredServiceStatus }): MonitoredService[] {
        return Repeater.random(() => MonitoredServiceMother.random(overwrites), nItems);
    }

    static clone(
        service: MonitoredService,
        overwrites?: { name?: MonitoredServiceName; status?: MonitoredServiceStatus; escalationPolicy?: EscalationPolicy }
    ): MonitoredService {
        const id = MonitoredServiceIdMother.create(service.id.value),
            name = overwrites?.name ? overwrites.name : MonitoredServiceNameMother.create(service.name.value),
            status = overwrites?.status ? overwrites.status : service.status,
            escalationPolicy = overwrites?.escalationPolicy
                ? overwrites.escalationPolicy
                : EscalationPolicyMother.clone(service.escalationPolicy);

        return MonitoredServiceMother.create(id, name, status, escalationPolicy);
    }
}
