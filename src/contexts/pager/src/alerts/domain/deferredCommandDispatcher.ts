import Command from '@ans/ctx-shared/domain/bus/command/command';
import Datetime from '@ans/ctx-shared/domain/datetime';

export interface DeferredCommandDispatcher {
    deferDispatch(command: Command, timeout: Datetime): Promise<void>;
}
