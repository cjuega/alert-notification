import { Clock } from '@ans/ctx-shared/domain/clock';
import { EventBus } from '@ans/ctx-shared/domain/bus/event/eventBus';
import { QueryBus } from '@ans/ctx-shared/domain/bus/query/queryBus';
import Alert from '@src/alerts/domain/alert';
import AlertAlreadyExists from '@src/alerts/domain/alertAlreadyExists';
import AlertId from '@src/alerts/domain/alertId';
import AlertMessage from '@src/alerts/domain/alertMessage';
import { AlertRepository } from '@src/alerts/domain/alertRepository';
import AnotherAlertPending from '@src/alerts/domain/anotherAlertPending';
import MonitoredServiceId from '@src/shared/domain/monitoredServiceId';
import FindMonitoredServiceQuery from '@src/monitoredServices/application/find/findMonitoredServiceQuery';

export default class AlertCreator {
    private queryBus: QueryBus;

    private repository: AlertRepository;

    private clock: Clock;

    private eventBus: EventBus;

    constructor(queryBus: QueryBus, repository: AlertRepository, clock: Clock, eventBus: EventBus) {
        this.queryBus = queryBus;
        this.repository = repository;
        this.clock = clock;
        this.eventBus = eventBus;
    }

    async run(id: AlertId, serviceId: MonitoredServiceId, message: AlertMessage): Promise<void> {
        await this.ensureAlertDoesntExist(id);
        await this.ensureThereIsntAPendingAlertFor(serviceId);
        await this.ensureMonitoredServiceExists(serviceId);

        const alert = Alert.create(id, serviceId, message, this.clock.now());

        await this.repository.save(alert);
        await this.eventBus.publish(alert.pullDomainEvents());
    }

    private async ensureAlertDoesntExist(id: AlertId): Promise<void> {
        const alert = await this.repository.search(id);

        if (alert) {
            throw new AlertAlreadyExists(id.value);
        }
    }

    private async ensureThereIsntAPendingAlertFor(serviceId: MonitoredServiceId): Promise<void> {
        const alert = await this.repository.searchPendingByService(serviceId);

        if (alert) {
            throw new AnotherAlertPending(alert.id.value, serviceId.value);
        }
    }

    private async ensureMonitoredServiceExists(serviceId: MonitoredServiceId): Promise<void> {
        const query = new FindMonitoredServiceQuery({ id: serviceId.value }),
            { monitoredService } = await this.queryBus.ask(query);

        console.log(monitoredService);
    }
}
