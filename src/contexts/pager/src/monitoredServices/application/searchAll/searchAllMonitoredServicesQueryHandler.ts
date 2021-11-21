import Query from '@ans/ctx-shared/domain/bus/query/query';
import { QueryHandler } from '@ans/ctx-shared/domain/bus/query/queryHandler';
import AllMonitoredServicesSearcher from '@src/monitoredServices/application/searchAll/allMonitoredServicesSearcher';
import SearchAllMonitoredServicesQuery from '@src/monitoredServices/application/searchAll/searchAllMonitoredServicesQuery';
import SearchAllMonitoredServicesResponse from '@src/monitoredServices/application/searchAll/searchAllMonitoredServicesResponse';

export default class SearchAllMonitoredServicesQueryHandler
implements QueryHandler<SearchAllMonitoredServicesQuery, SearchAllMonitoredServicesResponse> {
    private searcher: AllMonitoredServicesSearcher;

    constructor(searcher: AllMonitoredServicesSearcher) {
        this.searcher = searcher;
    }

    // eslint-disable-next-line class-methods-use-this
    subscribedTo(): Query {
        return SearchAllMonitoredServicesQuery;
    }

    handle(query: SearchAllMonitoredServicesQuery): Promise<SearchAllMonitoredServicesResponse> {
        return this.searcher.run(query.statusFilter);
    }
}
