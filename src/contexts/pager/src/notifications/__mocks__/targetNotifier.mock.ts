import { TargetNotifier } from '@src/notifications/domain/targetNotifier';
import EscalationTarget from '@src/shared/domain/escalationPolicies/escalationTarget';

export default class TargetNotifierMock implements TargetNotifier {
    private mockNotify = jest.fn();

    async notify(target: EscalationTarget): Promise<void> {
        this.mockNotify(target);
    }

    assertNotifyHasBeenCalledWith(targets: EscalationTarget[]): void {
        const { mock } = this.mockNotify;

        expect(this.mockNotify).toHaveBeenCalledTimes(targets.length);

        targets.forEach((target: EscalationTarget, i: number) => {
            const commandCall = mock.calls[i][0];
            expect(commandCall).toStrictEqual(target);
        });
    }
}
