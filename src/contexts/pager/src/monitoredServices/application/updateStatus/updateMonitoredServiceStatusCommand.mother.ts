import UpdateMonitoredServiceStatusCommand, {
    CommandParams
} from '@src/monitoredServices/application/updateStatus/updateMonitoredServiceStatusCommand';
import MonitoredService from '@src/monitoredServices/domain/monitoredService';
import MonitoredServiceMother from '@src/monitoredServices/domain/monitoredService.mother';
import MonitoredServiceStatus from '@src/monitoredServices/domain/monitoredServiceStatus';
import MonitoredServiceStatusMother from '@src/monitoredServices/domain/monitoredServiceStatus.mother';
import MonitoredServiceIdMother from '@src/shared/domain/monitoredServiceId.mother';

export default class UpdateMonitoredServiceStatusCommandMother {
    static create(params: CommandParams) {
        return new UpdateMonitoredServiceStatusCommand(params);
    }

    static random(): UpdateMonitoredServiceStatusCommand {
        const id = MonitoredServiceIdMother.random().value,
            status = MonitoredServiceStatusMother.random();

        return UpdateMonitoredServiceStatusCommandMother.create({ id, status });
    }

    static fromMonitoredService(service: MonitoredService): UpdateMonitoredServiceStatusCommand {
        return UpdateMonitoredServiceStatusCommandMother.create({ id: service.id.value, status: service.status });
    }

    static toggle(service: MonitoredService): UpdateMonitoredServiceStatusCommand {
        return UpdateMonitoredServiceStatusCommandMother.create({
            id: service.id.value,
            status: MonitoredServiceStatusMother.toggle(service.status)
        });
    }

    static applyCommand(command: UpdateMonitoredServiceStatusCommand, service: MonitoredService): MonitoredService {
        return MonitoredServiceMother.clone(service, { status: command.status });
    }

    static unhealthy(serviceId: string): UpdateMonitoredServiceStatusCommand {
        return UpdateMonitoredServiceStatusCommandMother.create({ id: serviceId, status: MonitoredServiceStatus.Unhealthy });
    }
}
