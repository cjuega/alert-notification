import Command from '@ans/ctx-shared/domain/bus/command/command';
import Datetime from '@ans/ctx-shared/domain/datetime';
import { DeferredCommandDispatcher } from '@src/alerts/domain/deferredCommandDispatcher';

export default class DeferredCommandDispatcherMock implements DeferredCommandDispatcher {
    private mockDeferDispatch = jest.fn();

    async deferDispatch(command: Command, timeout: Datetime): Promise<void> {
        this.mockDeferDispatch(command, timeout);
    }

    assertDeferDispatchHasBeenCalledWith(command: Command, timeout: Datetime): void {
        expect(this.mockDeferDispatch).toHaveBeenLastCalledWith(command, timeout);
    }
}
