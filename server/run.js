/* Подключаем загрузчик */

require('./system/loader.js');

/**
 * Настройка лога.
 */
Logs.setup({
    level: Logs.LEVEL_NOTIFY
});

/**
 * Id-ишники профайлера.
 * и таймер профайлера.
 */
/* SAPIUser */
Profiler.ID_SAPIUSER_AUTHORIZATION_BY_VK = Profiler.getNewId("ID_SAPIUSER_AUTHORIZATION_BY_VK");
Profiler.ID_SAPIUSER_SEND_USER_INFO = Profiler.getNewId("ID_SAPIUSER_SEND_USER_INFO");
Profiler.ID_SAPIUSER_UPDATE_USER_SOCNET_INFO = Profiler.getNewId("ID_SAPIUSER_UPDATE_USER_SOCNET_INFO");
Profiler.ID_SAPIUSER_SEND_FRIENDS = Profiler.getNewId("ID_SAPIUSER_SEND_FRIENDS");
Profiler.ID_SAPIUSER_SENDME_ONLINE_COUNT = Profiler.getNewId("ID_SAPIUSER_SENDME_ONLINE_COUNT");
/* SAPIChat */
Profiler.ID_SAPICHAT_GET_LAST_MESSAGES = Profiler.getNewId("ID_SAPICHAT_GET_LAST_MESSAGES");
Profiler.ID_SAPICHAT_SEND_MESSAGE = Profiler.getNewId("ID_SAPICHAT_SEND_MESSAGE");
/* SAPIUserState */
Profiler.ID_SAPIUSERSTATE_IS_BUSY = Profiler.getNewId("ID_SAPIUSERSTATE_IS_BUSY");
Profiler.ID_SAPIUSERSTATE_IS_NO_BUSY = Profiler.getNewId("ID_SAPIUSERSTATE_IS_NO_BUSY");
Profiler.ID_SAPIUSERSTATE_ON_GAME = Profiler.getNewId("ID_SAPIUSERSTATE_ON_GAME");
/* SAPIInvites */
Profiler.ID_SAPIINVITES_SEND = Profiler.getNewId("ID_SAPIINVITES_SEND");
/* LogicUser */
Profiler.ID_LOGIC_USER_SEND_TO_ALL = Profiler.getNewId("ID_LOGIC_USER_SEND_TO_ALL");
/* WebSocketServer */
Profiler.ID_WEBSOCKETSERVER_SEND_IMAGE = Profiler.getNewId("ID_WEBSOCKETSERVER_SEND_IMAGE");
Profiler.ID_WEBSOCKETSERVER_SEND_CLIENT_CODE = Profiler.getNewId("ID_WEBSOCKETSERVER_SEND_CLIENT_CODE");
/* SAPIRating*/
Profiler.ID_SAPIRATING_SEND_ME_TOP_LIST = Profiler.getNewId("ID_SAPIRATING_SEND_ME_TOP_LIST");
/* SAPIGame */
Profiler.ID_SAPIGAME_REQUEST_RANDOM_GAME = Profiler.getNewId("ID_SAPIGAME_REQUEST_RANDOM_GAME");
Profiler.ID_SAPIGAME_CANCEL_RANDOM_GAME = Profiler.getNewId("ID_SAPIGAME_CANCEL_RANDOM_GAME");
Profiler.ID_SAPIGAME_DO_MOVE = Profiler.getNewId("ID_SAPIGAME_DO_MOVE");
/* ActionsRandomGame */
Profiler.ID_ACTIONSRANDOMGAME_CREATE_WAITER = Profiler.getNewId("ID_ACTIONSRANDOMGAME_CREATE_WAITER");
Profiler.ID_ACTIONSRANDOMGAME_CREATE_RANDOM_GAME = Profiler.getNewId("ID_ACTIONSRANDOMGAME_CREATE_RANDOM_GAME");
/* SAPIRobot */
Profiler.ID_SAPIROBOT_CREATE_GAME = Profiler.getNewId("ID_SAPIROBOT_CREATE_GAME");
Profiler.ID_SAPIROBOT_DO_MOVE = Profiler.getNewId("ID_SAPIROBOT_DO_MOVE");
Profiler.ID_SAPIROBOT_CHECKWINNER = Profiler.getNewId("ID_SAPIROBOT_CHECKWINNER");
Profiler.ID_SAPIROBOT_CLOSE_GAME = Profiler.getNewId("ID_SAPIROBOT_CLOSE_GAME");
/* LogicXO */
Profiler.LOGIC_XO_FIND_WIN_LINE = Profiler.getNewId("LOGIC_XO_FIND_WIN_LINE");


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
    SAPIRepeatGame: SAPIRepeatGame
});

/* links apiRouter and webSocketServer */
apiRouter.sendData = webSocketServer.sendData;
webSocketServer.onConnect = apiRouter.onConnect;
webSocketServer.onDisconnect = apiRouter.onDisconnect;
webSocketServer.onData = apiRouter.onData;

/* set deinit callbacks */
addDeInitCallback(ActionsChat.flushCache);

/* init all components */
sequencedInit(CommandLineController.init);
sequencedInit(DB.init);
sequencedInit(LogicUser.init);
sequencedInit(ActionsChat.init);
/* run all components */
sequencedInit(webSocketServer.init);

sequencedInit(function (afterInitCallback) {
    Logs.log("Server is running full.", Logs.LEVEL_NOTIFY);
    afterInitCallback();
});
