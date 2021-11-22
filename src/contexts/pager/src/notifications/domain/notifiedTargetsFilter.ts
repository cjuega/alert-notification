import EscalationTarget from '@src/shared/domain/escalationPolicies/escalationTarget';

export interface NotifiedTargetsFilter {
    filter(targets: EscalationTarget[]): Promise<EscalationTarget[]>;
}
