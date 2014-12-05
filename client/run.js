window.onload = function () {

    // совместимость клиентского и серверного кода.
    GLOBAL = window;
    process = {};
    process.exit = function () {
        console.log("Внезапное завершение работы!")
        document.body.innerHTML = 'Всё поламалось!';
        throw new Error("Всё поламалось!");
    };

    /* WebSocket Client */
    webSocketClient = new WebSocketClient();
    webSocketClient.setup({
        host: 'localhost',
        port: 80
    });

    /* ApiRouter */
    apiRouter = new ApiRouter();
    apiRouter.setup({
        map: {
            CAPIUser: CAPIUser
        }
    });

    apiRouter.sendData = webSocketClient.sendData;
    webSocketClient.onData = apiRouter.onData;
    webSocketClient.onConnect = apiRouter.onConnect;
    webSocketClient.onDisconnect = apiRouter.onDisconnect;

    SocNet.parseSocNetURL();

    // running
    webSocketClient.run();

    // code
    LogicUser.authorize();
};
