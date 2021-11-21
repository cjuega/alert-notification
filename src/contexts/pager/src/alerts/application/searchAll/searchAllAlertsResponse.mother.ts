import SearchAllAlertsResponse from '@src/alerts/application/searchAll/searchAllAlertsResponse';
import Alert from '@src/alerts/domain/alert';

export default class SearchAllAlertsResponseMother {
    static fromAlerts(alerts: Alert[]): SearchAllAlertsResponse {
        return new SearchAllAlertsResponse(alerts);
    }
}
