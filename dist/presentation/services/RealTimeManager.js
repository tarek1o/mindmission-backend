"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealTimeManager = void 0;
const client_1 = require("@prisma/client");
const inversify_1 = require("inversify");
const Notifier_1 = require("./Notifier");
const NotificationEvent_1 = require("../enums/NotificationEvent");
let RealTimeManager = class RealTimeManager {
    constructor(onlineUserService, commentService) {
        this.onlineUserService = onlineUserService;
        this.commentService = commentService;
        Notifier_1.notifier.on(NotificationEvent_1.SubscribeOn.Connection, (socket) => {
            socket.on(NotificationEvent_1.SubscribeOn.Login, async (userId) => {
                try {
                    await this.addCurrentLoggedInUserIntoOnlineUserTable(userId, socket);
                    // await this.sendNotificationWithOnlineUsersCount(socket);
                    socket.on(NotificationEvent_1.SubscribeOn.NewComment, async (comment) => {
                        await this.notifyForNewComment(comment, socket);
                    });
                    socket.on(NotificationEvent_1.SubscribeOn.Disconnect, async () => {
                        try {
                            await this.removeCurrentLoggedInUserIFromOnlineUserTable(socket.id);
                            // await this.sendNotificationWithOnlineUsersCount(socket);
                        }
                        catch (error) {
                            console.log(error);
                        }
                    });
                }
                catch (error) {
                    console.log(error);
                }
            });
            socket.on(NotificationEvent_1.SubscribeOn.NewMessage, (message) => {
                socket.emit(NotificationEvent_1.NotifyFor.NewMessage, message);
            });
        });
    }
    ;
    async getOnlineUserCount() {
        const onlineUsers = await this.onlineUserService.findMany({
            select: {
                userId: true,
            },
            distinct: client_1.Prisma.OnlineUserScalarFieldEnum.userId,
        });
        return onlineUsers.length;
    }
    ;
    async addCurrentLoggedInUserIntoOnlineUserTable(userId, socket) {
        await this.onlineUserService.create({
            data: {
                socketId: socket.id,
                userId
            },
            select: {
                id: true,
            }
        });
    }
    ;
    async removeCurrentLoggedInUserIFromOnlineUserTable(socketId) {
        await this.onlineUserService.delete(socketId);
    }
    ;
    async sendNotificationWithOnlineUsersCount(socket) {
        const onlineUserCount = await this.getOnlineUserCount();
        socket.emit(NotificationEvent_1.NotifyFor.OnlineUserCount, onlineUserCount);
    }
    async getSocketIdsForParentUserComment(parentCommentId) {
        const comment = await this.commentService.findUnique({
            where: {
                id: parentCommentId
            },
            select: {
                user: {
                    select: {
                        onlineUser: {
                            select: {
                                socketId: true,
                            }
                        }
                    }
                }
            }
        });
        return comment === null || comment === void 0 ? void 0 : comment.user.onlineUser.map((user) => user.socketId);
    }
    ;
    async getSocketIdsForInstructor(commentId) {
        const comment = await this.commentService.findUnique({
            where: {
                id: commentId
            },
            select: {
                lesson: {
                    select: {
                        chapter: {
                            select: {
                                course: {
                                    select: {
                                        instructor: {
                                            select: {
                                                user: {
                                                    select: {
                                                        onlineUser: {
                                                            select: {
                                                                socketId: true
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        return comment === null || comment === void 0 ? void 0 : comment.lesson.chapter.course.instructor.user.onlineUser.map((user) => user.socketId);
    }
    ;
    async notifyForNewComment(comment, socket) {
        const notifiedSocketIds = comment.parentId ? await this.getSocketIdsForParentUserComment(comment.parentId) : await this.getSocketIdsForInstructor(comment.id);
        socket.to(notifiedSocketIds).emit(NotificationEvent_1.NotifyFor.NewComment, comment);
    }
    ;
};
exports.RealTimeManager = RealTimeManager;
exports.RealTimeManager = RealTimeManager = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('IOnlineUserService')),
    __param(1, (0, inversify_1.inject)('ICommentService'))
], RealTimeManager);
//# sourceMappingURL=RealTimeManager.js.map