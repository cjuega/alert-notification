import MotherCreator from '@ans/ctx-shared/domain/motherCreator.mother';
import EscalationTargetType from '@src/monitoredServices/domain/escalationTargetType';

export default class EscalationTargetTypeMother {
    static random(): EscalationTargetType {
        const index = MotherCreator.indexNumber(Object.values(EscalationTargetType).length - 1);

        return Object.values(EscalationTargetType)[index];
    }
}
