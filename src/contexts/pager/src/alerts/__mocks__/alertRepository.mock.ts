import { Nullable } from '@ans/ctx-shared/domain/nullable';
import { AlertRepository } from '@src/alerts/domain/alertRepository';
import Alert from '@src/alerts/domain/alert';
import AlertId from '@src/alerts/domain/alertId';
import MonitoredServiceId from '@src/shared/domain/monitoredServiceId';

export default class AlertRepositoryMock implements AlertRepository {
    private mockSave = jest.fn();

    private mockSearch = jest.fn();

    private mockSearchPendingByService = jest.fn();

    async save(alert: Alert): Promise<void> {
        this.mockSave(alert);
    }

    assertSaveHasBeenCalledWith(alert: Alert): void {
        const { mock } = this.mockSave,
            lastSavedAlert = mock.calls[mock.calls.length - 1][0] as Alert,
            expectedBody = alert.toPrimitives(),
            lastSavedAlertBody = lastSavedAlert.toPrimitives();

        expect(lastSavedAlert).toBeInstanceOf(Alert);
        expect(lastSavedAlertBody).toStrictEqual(expectedBody);
    }

    assertNothingSaved(): void {
        expect(this.mockSave).not.toHaveBeenCalled();
    }

    async search(id: AlertId): Promise<Nullable<Alert>> {
        return this.mockSearch(id);
    }

    whenSearchThenReturn(alert: Nullable<Alert>): void {
        this.mockSearch.mockReturnValue(alert);
    }

    assertSearchHasBeenCalledWith(id: AlertId): void {
        expect(this.mockSearch).toHaveBeenLastCalledWith(id);
    }

    async searchPendingByService(serviceId: MonitoredServiceId): Promise<Nullable<Alert>> {
        return this.mockSearchPendingByService(serviceId);
    }

    whenSearchPendingByServiceThenReturn(alert: Nullable<Alert>): void {
        this.mockSearchPendingByService.mockReturnValue(alert);
    }

    assertSearchPendingByServiceHasBeenCalledWith(id: AlertId): void {
        expect(this.mockSearchPendingByService).toHaveBeenLastCalledWith(id);
    }
}
