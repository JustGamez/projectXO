/**
 * Загрузчик:
 * - подключение всех компонент в папке /components/;
 * - подключение создателя;
 * - подключение схемы
 */

/* Подключаем nodeJS модули. */
var FS = require('fs');
var PATH = require('path');

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

/**
 * Подключение всех компонент.
 */
(function (path) {
    /**
     * Рекурсивное подключение всех файлов.
     * @param path
     */
    var includeRecursive = function (path) {
        var list;
        list = FS.readdirSync(path);
        for (var i in list) {
            if (FS.statSync(path + list[i]).isDirectory()) {
                includeRecursive(path + list[i] + '/');
            } else {
                includeComponent(path + list[i]);
            }
        }
    };
    /**
     * Подключение компонента по пути.
     * @param path путь к файлу компонента.
     */
    var includeComponent = function (path) {
        path = PATH.resolve(path);
        require(path);
        validateComponent(path);
        GLOBAL[getComponentNameFromPath(path)].__path = path;
    };
    /**
     * Определить имя компонента по пути к нему.
     * @param path путь к файлу компоненат.
     * @returns string имя компонента.
     */
    var getComponentNameFromPath = function (path) {
        return PATH.basename(path).replace('.js', '');
    };
    /**
     * Проверка компонента.
     * @param path путь к файлу компонента.
     * @param name имя компонената.
     */
    var validateComponent = function (path) {
        var name;
        name = getComponentNameFromPath(path);
        if (!GLOBAL[name]) {
            error("Файл компонента должен содержать определение компонента." +
            "\r\nфайл: " + path + "" +
            "\r\nкомпонент: " + name);
        }
        if (typeof GLOBAL[name] != 'function') {
            error("Определение компонента должно иметь тип function." +
            "\r\nфайл: " + path + "" +
            "\r\nкомпонент: " + name);
        }
    };
    log("Подключение компонент.");
    includeRecursive(path);
})(process.cwd() + '/components/');

/**
 * Подключение создателя.
 */
require('./SystemCreator.js');
require('./../boardScheme.js');