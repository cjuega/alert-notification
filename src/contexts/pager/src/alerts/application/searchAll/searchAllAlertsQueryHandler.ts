import Query from '@ans/ctx-shared/domain/bus/query/query';
import { QueryHandler } from '@ans/ctx-shared/domain/bus/query/queryHandler';
import AllAlertsSearcher from '@src/alerts/application/searchAll/allAlertsSearcher';
import SearchAllAlertsQuery from '@src/alerts/application/searchAll/searchAllAlertsQuery';
import SearchAllAlertsResponse from '@src/alerts/application/searchAll/searchAllAlertsResponse';

export default class SearchAllAlertsQueryHandler implements QueryHandler<SearchAllAlertsQuery, SearchAllAlertsResponse> {
    private searcher: AllAlertsSearcher;

    constructor(searcher: AllAlertsSearcher) {
        this.searcher = searcher;
    }

    // eslint-disable-next-line class-methods-use-this
    subscribedTo(): Query {
        return SearchAllAlertsQuery;
    }

    handle(query: SearchAllAlertsQuery): Promise<SearchAllAlertsResponse> {
        return this.searcher.run(query.statusFilter);
    }
}
