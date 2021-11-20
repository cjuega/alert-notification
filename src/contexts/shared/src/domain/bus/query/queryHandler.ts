import Query from '@src/domain/bus/query/query';
import { Response } from '@src/domain/bus/query/response';

export interface QueryHandler<Q extends Query, R extends Response> {
    subscribedTo(): Query;
    handle(query: Q): Promise<R>;
}
