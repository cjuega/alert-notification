import AlertMessage from '@src/alerts/domain/alertMessage';
import MotherCreator from '@ans/ctx-shared/domain/motherCreator.mother';

export default class AlertMessageMother {
    static create(message: string): AlertMessage {
        return new AlertMessage(message);
    }

    static random(): AlertMessage {
        const message = MotherCreator.text();

        return AlertMessageMother.create(message);
    }
}
