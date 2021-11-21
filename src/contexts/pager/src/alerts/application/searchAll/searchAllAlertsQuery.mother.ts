import MotherCreator from '@ans/ctx-shared/domain/motherCreator.mother';
import SearchAllAlertsQuery, { QueryParams } from '@src/alerts/application/searchAll/searchAllAlertsQuery';
import AlertStatusMother from '@src/alerts/domain/alertStatus.mother';

export default class SearchAllAlertsQueryMother {
    static create(params: QueryParams): SearchAllAlertsQuery {
        return new SearchAllAlertsQuery(params);
    }

    static random(): SearchAllAlertsQuery {
        return SearchAllAlertsQueryMother.create({
            statusFilter: MotherCreator.boolean() ? AlertStatusMother.random() : undefined
        });
    }
}
