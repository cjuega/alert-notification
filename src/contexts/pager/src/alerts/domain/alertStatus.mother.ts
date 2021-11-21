import AlertStatus from '@src/alerts/domain/alertStatus';
import MotherCreator from '@ans/ctx-shared/domain/motherCreator.mother';

export default class AlertStatusMother {
    static random(): AlertStatus {
        const index = MotherCreator.indexNumber(Object.values(AlertStatus).length - 1);

        return Object.values(AlertStatus)[index];
    }
}
