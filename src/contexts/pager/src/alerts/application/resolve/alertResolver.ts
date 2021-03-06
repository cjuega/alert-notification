import { EventBus } from '@ans/ctx-shared/domain/bus/event/eventBus';
import { Clock } from '@ans/ctx-shared/domain/clock';
import AlertFinder from '@src/alerts/domain/alertFinder';
import AlertId from '@src/alerts/domain/alertId';
import { AlertRepository } from '@src/alerts/domain/alertRepository';

export default class AlertResolver {
    private finder: AlertFinder;

    private repository: AlertRepository;

    private clock: Clock;

    private eventBus: EventBus;

    constructor(repository: AlertRepository, clock: Clock, eventBus: EventBus) {
        this.finder = new AlertFinder(repository);
        this.repository = repository;
        this.clock = clock;
        this.eventBus = eventBus;
    }

    async run(id: AlertId): Promise<void> {
        const alert = await this.finder.find(id);

        if (!alert.isResolved()) {
            alert.resolve(this.clock.now());

            await this.repository.save(alert);
            await this.eventBus.publish(alert.pullDomainEvents());
        }
    }
}
