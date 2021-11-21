import EscalationTarget from '@src/shared/domain/escalationPolicies/escalationTarget';

export interface TargetNotifier {
    notify(target: EscalationTarget): Promise<void>;
}
