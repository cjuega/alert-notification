import AggregateRoot from '@ans/ctx-shared/domain/aggregateRoot';
import MonitoredServiceId from '@src/monitoredServices/domain/monitoredServiceId';

type MonitoredServicePrimitives = {
    id: string;
};

export default class MonitoredService extends AggregateRoot {
    readonly id: MonitoredServiceId;

    constructor(id: string) {
        super();

        this.id = new MonitoredServiceId(id);
    }

    static create(id: string): MonitoredService {
        const service = new MonitoredService(id);

        return service;
    }

    toPrimitives(): MonitoredServicePrimitives {
        return { id: this.id.value };
    }
}
