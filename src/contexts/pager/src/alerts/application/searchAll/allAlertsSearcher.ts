import { AlertRepository } from '@src/alerts/domain/alertRepository';
import SearchAllAlertsResponse from '@src/alerts/application/searchAll/searchAllAlertsResponse';
import AlertStatus from '@src/alerts/domain/alertStatus';

export default class AllAlertsSearcher {
    private repository: AlertRepository;

    constructor(repository: AlertRepository) {
        this.repository = repository;
    }

    async run(statusFilter?: AlertStatus): Promise<SearchAllAlertsResponse> {
        const alerts = await this.repository.searchAll(statusFilter);

        return new SearchAllAlertsResponse(alerts);
    }
}
