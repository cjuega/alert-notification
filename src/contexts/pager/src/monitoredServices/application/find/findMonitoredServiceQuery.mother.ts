import MonitoredServiceIdMother from '@src/shared/domain/monitoredServiceId.mother';
import FindMonitoredServiceQuery, { QueryParams } from '@src/monitoredServices/application/find/findMonitoredServiceQuery';

export default class FindMonitoredServiceQueryMother {
    static create(params: QueryParams): FindMonitoredServiceQuery {
        return new FindMonitoredServiceQuery(params);
    }

    static random(): FindMonitoredServiceQuery {
        const id = MonitoredServiceIdMother.random().value;

        return FindMonitoredServiceQueryMother.create({ id });
    }
}
