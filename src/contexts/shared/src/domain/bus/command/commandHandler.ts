import Command from '@src/domain/bus/command/command';

export interface CommandHandler<T extends Command> {
    subscribedTo(): Command;
    handle(command: T): Promise<void>;
}
