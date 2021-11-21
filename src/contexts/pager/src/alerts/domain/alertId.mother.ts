import UuidMother from '@ans/ctx-shared/domain/uuid.mother';
import AlertId from '@src/alerts/domain/alertId';

export default class AlertIdMother {
    static create(id: string): AlertId {
        return new AlertId(id);
    }

    static random(): AlertId {
        return AlertIdMother.create(UuidMother.random());
    }
}
