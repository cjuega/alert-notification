import { EventBus } from '@ans/ctx-shared/domain/bus/event/eventBus';
import { Clock } from '@ans/ctx-shared/domain/clock';
import Alert from '@src/alerts/domain/alert';
import AlertId from '@src/alerts/domain/alertId';
import AlertNotFound from '@src/alerts/domain/alertNotFound';
import { AlertRepository } from '@src/alerts/domain/alertRepository';

export default class AlertResolver {
    private repository: AlertRepository;

    private clock: Clock;

    private eventBus: EventBus;

    constructor(repository: AlertRepository, clock: Clock, eventBus: EventBus) {
        this.repository = repository;
        this.clock = clock;
        this.eventBus = eventBus;
    }

    async run(id: AlertId): Promise<void> {
        const alert = await this.findAlert(id);

        if (!alert.isResolved()) {
            alert.resolve(this.clock.now());

            await this.repository.save(alert);
            await this.eventBus.publish(alert.pullDomainEvents());
        }
    }

    private async findAlert(id: AlertId): Promise<Alert> {
        const alert = await this.repository.search(id);

        if (!alert) {
            throw new AlertNotFound(id.value);
        }

        return alert;
    }
}
