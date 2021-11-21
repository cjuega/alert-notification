import Alert from '@src/alerts/domain/alert';
import AlertId from '@src/alerts/domain/alertId';
import AlertNotFound from '@src/alerts/domain/alertNotFound';
import { AlertRepository } from '@src/alerts/domain/alertRepository';

export default class AlertFinder {
    private repository: AlertRepository;

    constructor(repository: AlertRepository) {
        this.repository = repository;
    }

    async find(id: AlertId): Promise<Alert> {
        const alert = await this.repository.search(id);

        if (!alert) {
            throw new AlertNotFound(id.value);
        }

        return alert;
    }
}
