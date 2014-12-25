/* Подключаем загрузчик */

require('./system/loader.js');

/*  WebSocketServer */
webSocketServer = new WebSocketServer();
webSocketServer.setup({
    port: 80,
    reloadClientCodeEveryRequest: true,
    clientCodePath: '../client/',
    imagesPath: '../images/'
});

/* ApiRouter */
apiRouter = new ApiRouter();
apiRouter.setMap({
    SAPIUser: SAPIUser,
    SAPIGame: SAPIGame
});

/* links apiRouter and webSocketServer */
apiRouter.sendData = webSocketServer.sendData;
webSocketServer.onConnect = apiRouter.onConnect;
webSocketServer.onDisconnect = apiRouter.onDisconnect;
webSocketServer.onData = apiRouter.onData;

/* init all components */
sequencedInit(DB.init);
sequencedInit(LogicUser.init);
/* run all components */
sequencedInit(webSocketServer.init);

sequencedInit(function (afterInitCallback) {
    Logs.log("Server is running full.", Logs.LEVEL_NOTIFY);
    afterInitCallback();
});

