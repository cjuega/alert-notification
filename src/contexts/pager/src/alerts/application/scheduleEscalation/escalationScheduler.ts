import { DeferredCommandDispatcher } from '@src/alerts/domain/deferredCommandDispatcher';
import EscalateAlertCommand from '@src/alerts/application/escalate/escalateAlertCommand';
import { Clock } from '@ans/ctx-shared/domain/clock';
import AlertId from '@src/alerts/domain/alertId';

export default class EscalationScheduler {
    private static TIMEOUT_DURATION_IN_SECONDS = 900;

    private deferredDispatcher: DeferredCommandDispatcher;

    private clock: Clock;

    constructor(deferredDispatcher: DeferredCommandDispatcher, clock: Clock) {
        this.deferredDispatcher = deferredDispatcher;
        this.clock = clock;
    }

    async run(id: AlertId): Promise<void> {
        const command = new EscalateAlertCommand({ id: id.value }),
            triggerAt = this.clock.now().add(EscalationScheduler.TIMEOUT_DURATION_IN_SECONDS);

        await this.deferredDispatcher.deferDispatch(command, triggerAt);
    }
}
