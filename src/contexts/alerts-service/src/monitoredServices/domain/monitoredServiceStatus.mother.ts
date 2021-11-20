import MonitoredServiceStatus from '@src/monitoredServices/domain/monitoredServiceStatus';
import MotherCreator from '@ans/ctx-shared/domain/motherCreator.mother';

export default class MonitoredServiceStatusMother {
    static random(): MonitoredServiceStatus {
        const index = MotherCreator.indexNumber(Object.values(MonitoredServiceStatus).length - 1);

        return Object.values(MonitoredServiceStatus)[index];
    }
}
