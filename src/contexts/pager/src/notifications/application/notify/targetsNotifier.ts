import { NotifiedTargetsFilter } from '@src/notifications/domain/notifiedTargetsFilter';
import { TargetNotifier } from '@src/notifications/domain/targetNotifier';
import EscalationTarget from '@src/shared/domain/escalationPolicies/escalationTarget';

export default class TargetsNotifier {
    private filter: NotifiedTargetsFilter;

    private notifier: TargetNotifier;

    constructor(filter: NotifiedTargetsFilter, notifier: TargetNotifier) {
        this.filter = filter;
        this.notifier = notifier;
    }

    async run(targets: EscalationTarget[]): Promise<void> {
        const filtered = await this.filter.filter(targets);

        await Promise.all(filtered.map((t) => this.notifyTarget(t)));
    }

    private async notifyTarget(target: EscalationTarget): Promise<void> {
        await this.notifier.notify(target);
    }
}
