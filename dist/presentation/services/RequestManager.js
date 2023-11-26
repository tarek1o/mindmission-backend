"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestManager = void 0;
class RequestManager {
}
exports.RequestManager = RequestManager;
_a = RequestManager;
RequestManager.skipItems = 0;
RequestManager.takeItems = 2;
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
RequestManager.distinct = (request) => {
    const { distinct } = request.body;
    return distinct;
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
//# sourceMappingURL=RequestManager.js.map