LogicMain = function () {

    this.main = function () {
        Logs.init(function () {
        });

        /** init some components */
        SocNet.init();

        /* WebSocket Client */
        webSocketClient = new WebSocketClient();
        webSocketClient.init(function () {
        });

        //@todo need be automate...
        /* ApiRouter */
        apiRouter = new ApiRouter({
            CAPIUser: CAPIUser,
            CAPIGame: CAPIGame,
            CAPIChat: CAPIChat,
            CAPIInvites: CAPIInvites,
            CAPIUserState: CAPIUserState,
            CAPIRating: CAPIRating,
            CAPITimeServer: CAPITimeServer
        });

        /* Link ApiRouter and WebSocketClient */
        apiRouter.sendData = webSocketClient.sendData;
        webSocketClient.onData = apiRouter.onData;
        webSocketClient.onConnect = this.onConnect;
        webSocketClient.onDisconnect = apiRouter.onDisconnect;

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
