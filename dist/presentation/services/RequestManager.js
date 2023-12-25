"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestManager = void 0;
class RequestManager {
}
exports.RequestManager = RequestManager;
_a = RequestManager;
RequestManager.skipItems = 0;
RequestManager.takeItems = 10;
RequestManager.select = (request) => {
    const { select } = request.body;
    return select;
};
RequestManager.include = (request) => {
    const { include } = request.body;
    return include;
};
RequestManager.where = (request) => {
    const { where } = request.body;
    return where;
};
RequestManager.orderBy = (request) => {
    const { order } = request.body;
    return order;
};
RequestManager.skip = (request) => {
    return request.body.skip || _a.skipItems;
};
RequestManager.take = (request) => {
    return request.body.take || _a.takeItems;
};
RequestManager._count = (request) => {
    return request.body._count;
};
RequestManager._sum = (request) => {
    return request.body._sum;
};
RequestManager._avg = (request) => {
    return request.body._avg;
};
RequestManager._min = (request) => {
    return request.body._min;
};
RequestManager._max = (request) => {
    return request.body._min;
};
RequestManager.findOptionsWrapper = (request) => {
    return {
        where: _a.where(request),
        select: _a.select(request),
        include: _a.include(request),
        orderBy: _a.orderBy(request),
        skip: _a.skip(request),
        take: _a.take(request),
    };
};
RequestManager.aggregateOptionsWrapper = (request) => {
    const aggregate = {
        _count: _a._count(request),
        _sum: _a._sum(request),
        _avg: _a._avg(request),
        _min: _a._min(request),
        _max: _a._max(request),
    };
    for (const option in aggregate) {
        if (!aggregate[option]) {
            delete aggregate[option];
        }
    }
    return aggregate;
};
//# sourceMappingURL=RequestManager.js.map