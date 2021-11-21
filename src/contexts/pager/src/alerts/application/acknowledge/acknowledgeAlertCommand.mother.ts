import AcknowledgeAlertCommand, { CommandParams } from '@src/alerts/application/acknowledge/acknowledgeAlertCommand';
import AlertIdMother from '@src/alerts/domain/alertId.mother';

export default class AcknowledgeAlertCommandMother {
    static create(params: CommandParams): AcknowledgeAlertCommand {
        return new AcknowledgeAlertCommand(params);
    }

    static random(): AcknowledgeAlertCommand {
        const id = AlertIdMother.random().value;

        return AcknowledgeAlertCommandMother.create({ id });
    }
}
