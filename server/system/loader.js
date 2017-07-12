/**
 * Загрузчик:
 * - подключение всех компонент в папке /components/;
 * - подключение создателя;
 * - подключение схемы
 */

/* Подключаем nodeJS модули. */
var FS = require('fs');
var PATH = require('path');
var OS = require('os');
ROOT_DIR = FS.realpathSync('./..') + '/';
SERVER_DIR = ROOT_DIR + '/server/';
require('./functions.js');
loadAllComponents(process.cwd() + '/components/');
/* Include Config file. */
var hostname = OS.hostname();
var parentFolderName = (function () {
    var cwd;
    cwd = process.cwd().split(PATH.sep);
    cwd.pop();
    return cwd.pop();
})();
var configPath = './../Config.' + hostname + '.' + parentFolderName + '.js';
Logs.log("Config file: " + configPath, Logs.LEVEL_NOTIFY);
require(configPath);

/**
 * Подключение всех компонент.
 */
function loadAllComponents(path) {

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
        log("include component:" + getComponentNameFromPath(path));
        require(path);
        validateComponent(path);
        global[getComponentNameFromPath(path)].__path = path;
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
     * @param path {string} путь к файлу компонента.
     */
    var validateComponent = function (path) {
        var name;
        name = getComponentNameFromPath(path);
        if (!global[name]) {
            error("Файл компонента должен содержать определение компонента." +
                "\r\nфайл: " + path + "" +
                "\r\nкомпонент: " + name);
        }
        if (!(typeof global[name] == 'function' || typeof global[name] == 'object')) {
            error("Определение компонента должно иметь тип function." +
                "\r\nфайл: " + path + "" +
                "\r\nкомпонент: " + name);
        }
    };
    log("Include components");
    includeRecursive(path);
};

global.ENGINE_IS_SERVER = true;