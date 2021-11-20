import Query from '@src/domain/bus/query/query';
import { Response } from '@src/domain/bus/query/response';

export interface QueryBus {
    ask<R extends Response>(query: Query): Promise<R>;
}
