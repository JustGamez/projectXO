/* Подключаем загрузчик */

require('./system/loader.js');

/* User statistics. */
/* 1 */
Statistic.ID_AUTHORIZE = Statistic.getNewId("авторизация через ВКонтакте ");
/* 2 */
Statistic.ID_LOGOUT = Statistic.getNewId("покинул игру.");
/* 3 */
Statistic.ID_DO_MOVE = Statistic.getNewId("сделал ход");
/* 4  removed. */
Statistic.ID_REQUEST_RANDOM_GAME = Statistic.getNewId("запрос случайной игры");
/* 5 */
Statistic.ID_CLOSE_GAME = Statistic.getNewId("закрыл игру");
/* 6 */
Statistic.ID_REPEAT_GAME = Statistic.getNewId("повтор игры");
/* 7 */
Statistic.ID_GAME_ROBOT_CREATE = Statistic.getNewId("создал игру с роботом");
/* 8  removed */
Statistic.ID_GAME_ROBOT_CLOSE = Statistic.getNewId("закрыл игру с роботом");
/* 9 */
Statistic.ID_CLICK_RATING = Statistic.getNewId("нажал кнопку рейтинга");
/* 10 */
Statistic.ID_CLICK_INVITE_DIALOG = Statistic.getNewId("открыл диалог приглашения друзей");
/* 11 */
Statistic.ID_WIN_ROBOT = Statistic.getNewId("выиграл у робота");
/* 12 */
Statistic.ID_CLICK_HELP = Statistic.getNewId("нажал кнопку помощь");
/* 13 */
Statistic.ID_CHAT_SEND_MESSAGE = Statistic.getNewId("оптравил сообщеие");
/* 14 */
Statistic.ID_WIN_INVITATION = Statistic.getNewId("выиграл в игре по приглашению");
/* 15 */
Statistic.ID_INVITATION_SEND = Statistic.getNewId("оптравил приглашение");
/* 16 */
Statistic.ID_CREATE_GAME_INVATION = Statistic.getNewId("создал игру по приглашению");
/* 17 */
Statistic.ID_LOOK_GAME_START = Statistic.getNewId("начал просмотривать игру");
/* 18 */
Statistic.ID_LOOK_GAME_STOP = Statistic.getNewId("закрыл просмотр игры");
/* 19 */
Statistic.ID_CLICK_RATING_TOP = Statistic.getNewId("клик: рейтинг топ");
/* 20 */
Statistic.ID_CLICK_RATING_MY = Statistic.getNewId("клик: рейтинг мой");
/* 21 */
Statistic.ID_CLICK_RATING_UP = Statistic.getNewId("клик: рейтинг вверх");
/* 22 */
Statistic.ID_CLICK_RATING_DOWN = Statistic.getNewId("клик: рейтинг вниз");
/* 23 */
Statistic.ID_NOTIFIER_SUCCESS = Statistic.getNewId("отправка нотификации: успешно");
/* 24*/
Statistic.ID_NOTIFIER_FAILED = Statistic.getNewId("отправка нотификации: не успешно");

/*  WebSocketServer */
webSocketServer = new WebSocketServer({
    '/xo/clientCode': LogicClientCodeLoader.getClientCode,
    '/xo/reloadClientCode': LogicClientCodeLoader.reloadClientCode,
    '/xo/commentsWidget': LogicClientCodeLoader.getCommentsWidget,
    '/xo/status': LogicSystemRequests.getStatus,
    '/xo/statistic': LogicSystemRequests.getStatistic,
    '/xo/shutdown___': LogicSystemRequests.shutdown,
    '/xo/runNotifier': LogicSystemRequests.runNotifier,
    '/xo/logsSetDetail': LogicSystemRequests.logsSetDetail,
    '/xo/logsSetNotify': LogicSystemRequests.logsSetNotify
});

/* ApiRouter */
apiRouter = new ApiRouter({
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
addDeInitCallback(Statistic.flushCache);
addDeInitCallback(DataGame.flushCache);

/* init all components */
sequencedInit(Logs.init);
sequencedInit(Profiler.init);
sequencedInit(DB.init);
sequencedInit(DataGame.init);
sequencedInit(DataUser.init);
sequencedInit(Statistic.init);
sequencedInit(SocNet.init);
sequencedInit(LogicUser.init);
sequencedInit(LogicRobot.init);
sequencedInit(DataRating.init);
sequencedInit(webSocketServer.init);
sequencedInit(LogicClientCodeLoader.init);

sequencedInit(function (afterInitCallback) {
    Logs.log("Server is running full.", Logs.LEVEL_NOTIFY);
    afterInitCallback();
});
