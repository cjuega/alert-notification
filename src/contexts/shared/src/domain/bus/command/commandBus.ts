import Command from '@src/domain/bus/command/command';

export interface CommandBus {
    dispatch(command: Command): Promise<void>;
}
