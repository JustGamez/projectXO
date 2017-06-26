LogicMain = function () {

    this.main = function () {
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
        webSocketClient.onConnect = this.onConnect;
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

    /**
     * After connect
     * @param connectionId
     */
    this.onConnect = function (connectionId) {
        apiRouter.onConnect(connectionId);
        LogicUser.authorize();
    }
};
