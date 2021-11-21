import MotherCreator from '@ans/ctx-shared/domain/motherCreator.mother';
import SearchAllMonitoredServicesQuery, { QueryParams } from '@src/monitoredServices/application/searchAll/searchAllMonitoredServicesQuery';
import MonitoredServiceStatusMother from '@src/monitoredServices/domain/monitoredServiceStatus.mother';

export default class SearchAllMonitoredServicesQueryMother {
    static create(params: QueryParams): SearchAllMonitoredServicesQuery {
        return new SearchAllMonitoredServicesQuery(params);
    }

    static random(): SearchAllMonitoredServicesQuery {
        return SearchAllMonitoredServicesQueryMother.create({
            statusFilter: MotherCreator.boolean() ? MonitoredServiceStatusMother.random() : undefined
        });
    }
}
