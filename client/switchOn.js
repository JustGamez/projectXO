window.onload = function () {

    // совместимость клиентского и серверного кода.
    GLOBAL = window;
    process = {};
    process.exit = function () {
        console.log("Внезапное завершение работы!")
        document.body.innerHTML = 'Всё поламалось!';
        throw new Error("Всё поламалось!");
    };

    /* Инициируем включение системы */
    creator = new SystemCreator;
    creator.run();
};