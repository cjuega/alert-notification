import Query from '@ans/ctx-shared/domain/bus/query/query';
import AlertStatus from '@src/alerts/domain/alertStatus';

export type QueryParams = {
    statusFilter?: AlertStatus;
};

export default class SearchAllAlertsQuery implements Query {
    readonly statusFilter?: AlertStatus;

    constructor({ statusFilter }: QueryParams) {
        this.statusFilter = statusFilter;
    }
}
