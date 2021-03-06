import { Response } from '@ans/ctx-shared/domain/bus/query/response';
import Alert from '@src/alerts/domain/alert';
import { AlertPrimitives } from '@src/alerts/domain/alertPrimitives';

type SimplifiedAlertPrimitives = Omit<AlertPrimitives, 'escalationPolicy'>;

export default class SearchAllAlertsResponse implements Response {
    readonly items: SimplifiedAlertPrimitives[];

    constructor(alerts: Alert[]) {
        this.items = alerts.map((alert) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { escalationPolicy, ...others } = alert.toPrimitives();

            return { ...others };
        });
    }
}
