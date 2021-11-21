import { TargetNotifier } from '@src/notifications/domain/targetNotifier';
import EscalationTarget from '@src/shared/domain/escalationPolicies/escalationTarget';

export default class TargetsNotifier {
    private notifier: TargetNotifier;

    constructor(notifier: TargetNotifier) {
        this.notifier = notifier;
    }

    async run(targets: EscalationTarget[]): Promise<void> {
        await Promise.all(targets.map((t) => this.notifyTarget(t)));
    }

    private async notifyTarget(target: EscalationTarget): Promise<void> {
        await this.notifier.notify(target);
    }
}
