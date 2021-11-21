import ResolveAlertCommand, { CommandParams } from '@src/alerts/application/resolve/resolveAlertCommand';
import AlertIdMother from '@src/alerts/domain/alertId.mother';

export default class ResolveAlertCommandMother {
    static create(params: CommandParams): ResolveAlertCommand {
        return new ResolveAlertCommand(params);
    }

    static random(): ResolveAlertCommand {
        const id = AlertIdMother.random().value;

        return ResolveAlertCommandMother.create({ id });
    }
}
