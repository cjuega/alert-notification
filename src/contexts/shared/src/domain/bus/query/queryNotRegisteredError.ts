import Query from '@src/domain/bus/query/query';

export default class QueryNotRegisteredError extends Error {
    constructor(query: Query) {
        super(
            `The query <${query.constructor.name}> hasn't a query handler associated`
        );
    }
}
