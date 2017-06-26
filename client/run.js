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


    /* Передаем управление вхдоной точки. */
    logicMain = new LogicMain();
    logicMain.main();

};
