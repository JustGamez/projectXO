/* Подключаем загрузчик */

require('./system/loader.js');

/* User statistics. */
/* 1 */
Statistic.ID_USER_AUTHORIZATION_BY_VK = Statistic.getNewId("авторизация через ВКонтакте ");
/* 2 */
Statistic.ID_USER_LOGOUT = Statistic.getNewId("покинул игру.");
/* 3 */
Statistic.ID_GAME_DO_MOVE = Statistic.getNewId("сделал ход");
/* 4 */
Statistic.ID_GAME_REQUEST_RANDOM_GAME = Statistic.getNewId("запрос случайной игры");
/* 5 */
Statistic.ID_GAME_CLOSE_RANDOM_GAME = Statistic.getNewId("закрыл случайную игру");
/* 6 */
Statistic.ID_GAME_REPEAT_GAME = Statistic.getNewId("повтор игры");
/* 7 */
Statistic.ID_GAME_ROBOT_CREATE = Statistic.getNewId("создал игру с роботом");
/* 8 */
Statistic.ID_GAME_ROBOT_CLOSE = Statistic.getNewId("закрыл игру с роботом");
/* 9 */
Statistic.ID_ON_RATING_BUTTON_CLICK = Statistic.getNewId("нажал кнопку рейтинга");
/* 10 */
Statistic.ID_CLIENT_OPEN_INVITE_FRIEND_DIALOG = Statistic.getNewId("открыл диалог приглашения друзей");
/* 11 */
Statistic.ID_USER_WIN_VS_ROBOT = Statistic.getNewId("выиграл у робота");
/* 12 */
Statistic.ID_CLICK_HELP = Statistic.getNewId("нажал кнопку помощь");
/* 13 */
Statistic.ID_CHAT_SEND_MESSAGE = Statistic.getNewId("оптравил сообщеие в чате");
/* 14 */
Statistic.ID_USER_WIN_BY_INVITATION = Statistic.getNewId("выиграл в игре по приглашению");
/* 15 */
Statistic.ID_INVITATION_SEND = Statistic.getNewId("оптравил приглашение");


/*  WebSocketServer */
webSocketServer = new WebSocketServer();

ApiRouterMetrics.setup({
    SAPIUser: true,
    SAPIGame: true,
    SAPIChat: true,
    SAPIRobotGame: true,
    SAPIInvites: true,
    SAPIUserState: true,
    SAPIRating: true,
    SAPIRepeatGame: true,
    SAPIStatistic: true,
    SAPIGameLooks: true,

    CAPIChat: true,
    CAPIGame: true,
    CAPIInvites: true,
    CAPIRating: true,
    CAPIUser: true,
    CAPIUserState: true
});
setInterval(function () {
        ApiRouterMetrics.printMetrics();
    }, Config.ApiRouterMetric.reportTimeout
);
setInterval(function () {
        Profiler.printReport();
    }, Config.Profiler.reportTimeout
);
setInterval(function () {
        Profiler.saveToDB();
    }, Config.Profiler.saveToDBTimeout
);

/* ApiRouter */
apiRouter = new ApiRouter();
apiRouter.setMap({
    SAPIUser: SAPIUser,
    SAPIGame: SAPIGame,
    SAPIChat: SAPIChat,
    SAPIRobotGame: SAPIRobotGame,
    SAPIInvites: SAPIInvites,
    SAPIUserState: SAPIUserState,
    SAPIRating: SAPIRating,
    SAPIRepeatGame: SAPIRepeatGame,
    SAPIStatistic: SAPIStatistic,
    SAPIGameLooks: SAPIGameLooks
});

/* links apiRouter and webSocketServer */
apiRouter.sendData = webSocketServer.sendData;
webSocketServer.onConnect = apiRouter.onConnect;
webSocketServer.onDisconnect = apiRouter.onDisconnect;
webSocketServer.onData = apiRouter.onData;

/* set deinit callbacks */
addDeInitCallback(ActionsChat.deInit);
addDeInitCallback(Statistic.flushCache);
addDeInitCallback(DataGame.flushCache);

/* init all components */
sequencedInit(Logs.init);
sequencedInit(Profiler.init);
sequencedInit(CommandLineController.init);
sequencedInit(DB.init);
sequencedInit(Statistic.init);
sequencedInit(LogicUser.init);
sequencedInit(LogicRobot.init);
sequencedInit(ActionsChat.init);
sequencedInit(DataRating.init);
/* run all components */
sequencedInit(webSocketServer.init);

sequencedInit(function (afterInitCallback) {
    Logs.log("Server is running full.", Logs.LEVEL_NOTIFY);
    afterInitCallback();
});
