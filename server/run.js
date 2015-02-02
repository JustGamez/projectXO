/* Подключаем загрузчик */

require('./system/loader.js');

/**
 * Настройка лога.
 */
Logs.setup({
    level: Logs.LEVEL_WARNING
});

/**
 * Id-ишники профайлера.
 * и таймер профайлера.
 */
Profiler.ID_AUTHORIZATION_BY_VK = Profiler.getNewId("ID_AUTHORIZATION_BY_VK");
Profiler.ID_SEND_USER_INFO = Profiler.getNewId("ID_SEND_USER_INFO");
Profiler.ID_UPDATE_USER_SOCNET_INFO = Profiler.getNewId("ID_UPDATE_USER_SOCNET_INFO");
Profiler.ID_SEND_FRIENDS = Profiler.getNewId("ID_SEND_FRIENDS");
Profiler.ID_SENDME_ONLINE_COUNT = Profiler.getNewId("ID_SENDME_ONLINE_COUNT");

/*  WebSocketServer */
webSocketServer = new WebSocketServer();
webSocketServer.setup({
    port: 80,
    reloadClientCodeEveryRequest: true,
    clientCodePath: '../client/',
    imagesPath: '../images/'
});

ApiRouterMetrics.setup({
    SAPIUser: true,
    SAPIGame: true,
    SAPIChat: true,
    SAPIRobotGame: true,
    SAPIInvites: true,
    SAPIUserState: true,
    SAPIRating: true,

    CAPIChat: true,
    CAPIGame: true,
    CAPIInvites: true,
    CAPIRating: true,
    CAPIUser: true,
    CAPIUserState: true
});

ApiRouterMetrics.printMetrics();
Profiler.printReport();
setInterval(function () {
        ApiRouterMetrics.printMetrics();
        Profiler.printReport();
    }, 3000
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
    SAPIRating: SAPIRating
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

