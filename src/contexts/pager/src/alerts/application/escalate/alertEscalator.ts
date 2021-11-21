import { EventBus } from '@ans/ctx-shared/domain/bus/event/eventBus';
import AlertFinder from '@src/alerts/domain/alertFinder';
import AlertId from '@src/alerts/domain/alertId';
import { AlertRepository } from '@src/alerts/domain/alertRepository';

export default class AlertEscalator {
    private finder: AlertFinder;

    private repository: AlertRepository;

    private eventBus: EventBus;

    constructor(repository: AlertRepository, eventBus: EventBus) {
        this.finder = new AlertFinder(repository);
        this.repository = repository;
        this.eventBus = eventBus;
    }

    async run(id: AlertId): Promise<void> {
        const alert = await this.finder.find(id);

        if (!alert.isAcknowledged() && !alert.isMaxEscalationLevelReached()) {
            alert.escalate();

            await this.repository.save(alert);
            await this.eventBus.publish(alert.pullDomainEvents());
        }
    }
}
