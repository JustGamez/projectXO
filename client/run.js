window.onload = function () {
    Logs.log('OnLoad raized', Logs.LEVEL_NOTIFY);
    /* Эмуляция совместимости клиентского и серверного кода. */
    global = window;
    process = {};
    process.exit = function () {
        console.log("Внезапное завершение работы!");
        document.body.innerHTML = 'Всё поламалось!';
        throw new Error("Всё поламалось!");
    };
    Logs.init(function () {
    });

    /** init some components */
    SocNet.init();

    GUI.init();

    /* WebSocket Client */
    webSocketClient = new WebSocketClient();
    webSocketClient.init(function () {
    });

    /* ApiRouter */
    apiRouter = new ApiRouter({
        CAPIUser: CAPIUser,
        CAPIGame: CAPIGame,
        CAPIChat: CAPIChat,
        CAPIInvites: CAPIInvites,
        CAPIUserState: CAPIUserState,
        CAPIRating: CAPIRating
    });

    /* Link ApiRouter and WebSocketClient */
    apiRouter.sendData = webSocketClient.sendData;
    webSocketClient.onData = apiRouter.onData;
    webSocketClient.onConnect = function (connectionId) {
        apiRouter.onConnect(connectionId);
        LogicUser.authorize();
    };
    webSocketClient.onDisconnect = apiRouter.onDisconnect;

    /* @todo do it automaticaly*/
    {
        PageController.addBlocks([PageBlockBackground, PageBlockChat, PageBlockHelp, PageBlockHelpMainMenu, PageBlockHelpRating, PageBlockHelpRules, PageBlockMain, PageBlockOnlineAndRating, PageBlockRating, PageBlockXOGame]);
        PageMain.init();
        PageXOGame.init();
    }
    PageController.showPage(PageMain);


    /* running */
    webSocketClient.run();
};
