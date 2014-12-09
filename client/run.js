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

    /* Link ApiRouter and WebSocketClient */
    apiRouter.sendData = webSocketClient.sendData;
    webSocketClient.onData = apiRouter.onData;
    webSocketClient.onConnect = apiRouter.onConnect;
    webSocketClient.onDisconnect = apiRouter.onDisconnect;

    /* PageController */
    pageController = new PageController;
    PageController.PAGE_ID_MAIN = 0x01;
    pageController.addPage(PageController.PAGE_ID_MAIN, new PageMain());
    pageController.showPage(PageController.PAGE_ID_MAIN);

    // client specific code
    SocNet.parseSocNetURL();

    // running
    webSocketClient.run();

    // executing some code
    LogicUser.authorize();
};
