import EscalationTargetType from '@src/monitoredServices/domain/escalationTargetType';

export default abstract class EscalationTarget {
    static type: () => EscalationTargetType;

    abstract clone(): EscalationTarget;

    abstract toPrimitives(): unknown;

    abstract equalsTo(other: EscalationTarget): boolean;
}
