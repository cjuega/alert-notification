import Query from '@ans/ctx-shared/domain/bus/query/query';
import { QueryHandler } from '@ans/ctx-shared/domain/bus/query/queryHandler';
import MonitoredServiceFinder from '@src/monitoredServices/application/find/monitoredServiceFinder';
import MonitoredServiceId from '@src/shared/domain/monitoredServiceId';
import FindMonitoredServiceQuery from '@src/monitoredServices/application/find/findMonitoredServiceQuery';
import FindMonitoredServiceResponse from '@src/monitoredServices/application/find/findMonitoredServiceResponse';

export default class FindMonitoredServiceQueryHandler implements QueryHandler<FindMonitoredServiceQuery, FindMonitoredServiceResponse> {
    private finder: MonitoredServiceFinder;

    constructor(finder: MonitoredServiceFinder) {
        this.finder = finder;
    }

    // eslint-disable-next-line class-methods-use-this
    subscribedTo(): Query {
        return FindMonitoredServiceQuery;
    }

    handle(query: FindMonitoredServiceQuery): Promise<FindMonitoredServiceResponse> {
        const id = new MonitoredServiceId(query.id);

        return this.finder.run(id);
    }
}
