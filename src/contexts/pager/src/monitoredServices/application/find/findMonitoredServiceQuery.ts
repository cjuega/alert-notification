import Query from '@ans/ctx-shared/domain/bus/query/query';

export type QueryParams = {
    id: string;
};

export default class FindMonitoredServiceQuery implements Query {
    readonly id: string;

    constructor({ id }: QueryParams) {
        this.id = id;
    }
}
