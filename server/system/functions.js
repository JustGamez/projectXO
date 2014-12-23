/**
 * В этом файле содержаться системные функции.
 */

/**
 * Логи на этапах создания.
 * @param message
 */
log = function (message) {
    console.log(message);
};

/**
 * Ошибка создания, выводит сообщение и завершает работу.
 * @param message
 */
error = function (message) {
    console.log("Ошибка: " + message);
    process.exit();
};

/* Функционал для последовательной инициализации компонент. */
var sequencedInitStack = [];
var sequencedInitBlocked = false;

/**
 * Выполнить очередной инит по завершению всех предыдущих.
 * @param initFunction {function}
 */
sequencedInit = function (initFunction) {
    sequencedInitStack.push(initFunction);
    tryInitNext();
};

var tryInitNext = function () {
    if (!sequencedInitStack.length){
        log("Init stack empty now.");
        return;
    }
    if (sequencedInitBlocked) return;
    sequencedInitBlocked = true;
    initFunction = sequencedInitStack.shift();
    initFunction(function () {
        sequencedInitBlocked = false;
        tryInitNext();
    });
};