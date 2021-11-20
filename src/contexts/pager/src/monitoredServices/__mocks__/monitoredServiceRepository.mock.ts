import { Nullable } from '@ans/ctx-shared/domain/nullable';
import { MonitoredServiceRepository } from '@src/monitoredServices/domain/monitoredServiceRepository';
import MonitoredService from '@src/monitoredServices/domain/monitoredService';
import MonitoredServiceId from '@src/monitoredServices/domain/monitoredServiceId';

export default class MonitoredServiceRepositoryMock implements MonitoredServiceRepository {
    private mockSave = jest.fn();

    private mockSearch = jest.fn();

    save(service: MonitoredService): Promise<void> {
        return this.mockSave(service);
    }

    assertSaveHasBeenCalledWith(service: MonitoredService): void {
        const { mock } = this.mockSave,
            lastSavedMonitoredService = mock.calls[mock.calls.length - 1][0] as MonitoredService,
            expectedBody = service.toPrimitives(),
            lastSavedMonitoredServiveBody = lastSavedMonitoredService.toPrimitives();

        expect(lastSavedMonitoredService).toBeInstanceOf(MonitoredService);
        expect(lastSavedMonitoredServiveBody).toStrictEqual(expectedBody);
    }

    async search(id: MonitoredServiceId): Promise<Nullable<MonitoredService>> {
        return this.mockSearch(id);
    }

    whenSearchThenReturn(service: Nullable<MonitoredService>): void {
        this.mockSearch.mockReturnValue(service);
    }
}
