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
