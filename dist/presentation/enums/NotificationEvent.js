"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscribeOn = exports.NotifyFor = void 0;
var NotifyFor;
(function (NotifyFor) {
    NotifyFor["NewMessage"] = "NewMessage";
    NotifyFor["NewComment"] = "NewComment";
    NotifyFor["OnlineUserCount"] = "OnlineUserCount";
})(NotifyFor || (exports.NotifyFor = NotifyFor = {}));
var SubscribeOn;
(function (SubscribeOn) {
    SubscribeOn["Connection"] = "connection";
    SubscribeOn["Disconnect"] = "disconnect";
    SubscribeOn["Login"] = "Login";
    SubscribeOn["NewMessage"] = "NewMessage";
    SubscribeOn["NewComment"] = "NewComment";
})(SubscribeOn || (exports.SubscribeOn = SubscribeOn = {}));
//# sourceMappingURL=NotificationEvent.js.map