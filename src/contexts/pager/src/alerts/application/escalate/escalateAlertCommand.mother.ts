import EscalateAlertCommand, { CommandParams } from '@src/alerts/application/escalate/escalateAlertCommand';
import AlertIdMother from '@src/alerts/domain/alertId.mother';

export default class EscalateAlertCommandMother {
    static create(params: CommandParams): EscalateAlertCommand {
        return new EscalateAlertCommand(params);
    }

    static random(): EscalateAlertCommand {
        const id = AlertIdMother.random().value;

        return EscalateAlertCommandMother.create({ id });
    }
}
