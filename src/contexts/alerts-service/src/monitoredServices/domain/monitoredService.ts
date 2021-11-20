import AggregateRoot from '@ans/ctx-shared/domain/aggregateRoot';
import MonitoredServiceId from '@src/monitoredServices/domain/monitoredServiceId';
import MonitoredServiceName from '@src/monitoredServices/domain/monitoredServiceName';
import MonitoredServiceStatus from '@src/monitoredServices/domain/monitoredServiceStatus';

type MonitoredServicePrimitives = {
    id: string;
    name: string;
    status: MonitoredServiceStatus;
};

export default class MonitoredService extends AggregateRoot {
    readonly id: MonitoredServiceId;

    readonly name: MonitoredServiceName;

    readonly status: MonitoredServiceStatus;

    constructor(id: string, name: string, status: MonitoredServiceStatus) {
        super();

        this.id = new MonitoredServiceId(id);
        this.name = new MonitoredServiceName(name);
        this.status = status;
    }

    static create(id: string, name: string): MonitoredService {
        const service = new MonitoredService(id, name, MonitoredServiceStatus.Healthy);

        return service;
    }

    toPrimitives(): MonitoredServicePrimitives {
        return { id: this.id.value, name: this.name.value, status: this.status };
    }
}
