import { Clock } from '@ans/ctx-shared/domain/clock';
import { EventBus } from '@ans/ctx-shared/domain/bus/event/eventBus';
import { QueryBus } from '@ans/ctx-shared/domain/bus/query/queryBus';
import Alert from '@src/alerts/domain/alert';
import AlertAlreadyExists from '@src/alerts/domain/alertAlreadyExists';
import AlertId from '@src/alerts/domain/alertId';
import AlertMessage from '@src/alerts/domain/alertMessage';
import { AlertRepository } from '@src/alerts/domain/alertRepository';
import MonitoredServiceId from '@src/shared/domain/monitoredServiceId';
import FindMonitoredServiceQuery from '@src/monitoredServices/application/find/findMonitoredServiceQuery';
import AlertEscalationPolicy from '@src/alerts/domain/alertEscalationPolicy';
import FindMonitoredServiceResponse from '@src/monitoredServices/application/find/findMonitoredServiceResponse';

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

        const escalationPolicy = await this.queryEscalationPolicy(serviceId),
            alert = Alert.create(id, serviceId, message, escalationPolicy, this.clock.now());

        await this.repository.save(alert);
        await this.eventBus.publish(alert.pullDomainEvents());
    }

    private async ensureAlertDoesntExist(id: AlertId): Promise<void> {
        const alert = await this.repository.search(id);

        if (alert) {
            throw new AlertAlreadyExists(id.value);
        }
    }

    private async queryEscalationPolicy(serviceId: MonitoredServiceId): Promise<AlertEscalationPolicy> {
        const query = new FindMonitoredServiceQuery({ id: serviceId.value }),
            { monitoredService }: FindMonitoredServiceResponse = await this.queryBus.ask(query);

        return AlertEscalationPolicy.init(monitoredService.escalationPolicy);
    }
}
