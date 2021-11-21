import Query from '@ans/ctx-shared/domain/bus/query/query';
import MonitoredServiceStatus from '@src/monitoredServices/domain/monitoredServiceStatus';

export type QueryParams = {
    statusFilter?: MonitoredServiceStatus;
};

export default class SearchAllMonitoredServicesQuery implements Query {
    readonly statusFilter?: MonitoredServiceStatus;

    constructor({ statusFilter }: QueryParams) {
        this.statusFilter = statusFilter;
    }
}
