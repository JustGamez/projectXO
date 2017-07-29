/**
 * Loader:
 * - declare core constants
 * - declare core functions
 * - include config file
 * - execute code-generators
 * - include components
 * - - call .preInit()
 * - - call .init()
 * - cal main();
 */

require('constants.js');

/* Include nodeJS modules. */
var FS = require('fs');
var PATH = require('path');
var OS = require('os');

loaderDelareSystemFunctions();

generateAutoCode();

loaderIncludeComponents(DIR_COMPONENTS);

loaderIncludConfig();

loaderCallMainFunction();

function loaderIncludConfig() {
    /* Include Config file. */
    var hostname = OS.hostname();

    var configPath = './../Config.' + hostname + '.' + PROJECT_FOLDER_NAME + '.js';
    Logs.log("Config file: " + configPath, Logs.LEVEL_NOTIFY);
    require(configPath);
}

function loaderCallMainFunction() {

    /* Передаем управление вхдоной точки. */
    logicMain = new LogicMain();
    logicMain.main();
}

function loaderDelareSystemFunctions() {
    /**
     * В этом файле содержаться системные функции.
     */

    /**
     * Логи на этапах создания.
     * @param message
     */
    log = console.log;

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
        if (!sequencedInitStack.length) {
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

    /**
     * Динициализация\остановка системы.
     */
    var deInitCallbacks = [];
    addDeInitCallback = function (callback) {
        deInitCallbacks.push(callback);
    };

    deInitBeforeShutdown = function (callback) {
        var count;
        count = 0;
        log("Deinit callbacks is raised.");
        for (var i in deInitCallbacks) {
            deInitCallbacks[i].call(null, function () {
                count++;
            });
        }
        log("de inits completed.");
        setTimeout(callback, 1235);
    };

    /**
     * При вызове process.exit(), выполниться каллбэки деинициализации.
     */
    process.on('exit', function () {
        if (typeof Logs !== 'undefined') Logs.showCache();
        log("on Exit raized!");
    });

    /**
     * Перехыватываем ошибки!
     */
    process.on('uncaughtException', function (err) {
        log('ERROR HAPPENDZ');
        console.log(err.stack);
        if (typeof Logs !== 'undefined') Logs.showCache();
        process.exit();
    });

    /**
     *
     *  Javascript string pad
     *  http://www.webtoolkit.info/
     *
     **/
    var STR_PAD_LEFT = 1;
    var STR_PAD_RIGHT = 2;
    var STR_PAD_BOTH = 3;

    str_pad = function (str, len, pad, dir) {
        if (typeof(len) == "undefined") {
            var len = 0;
        }
        if (typeof(pad) == "undefined") {
            var pad = ' ';
        }
        if (typeof(dir) == "undefined") {
            var dir = STR_PAD_RIGHT;
        }
        if (len + 1 >= str.length) {

            switch (dir) {
                case STR_PAD_LEFT:
                    str = Array(len + 1 - str.length).join(pad) + str;
                    break;

                case STR_PAD_BOTH:
                    var right = Math.ceil((padlen = len - str.length) / 2);
                    var left = padlen - right;
                    str = Array(left + 1).join(pad) + str + Array(right + 1).join(pad);
                    break;

                default:
                    str = str + Array(len + 1 - str.length).join(pad);
                    break;

            } // switch
        }
        return str;
    };

    /**
     * Возвращает время в секундах.
     */
    time = function () {
        return Math.floor((new Date()).getTime() / 1000);
    };

    /**
     * Возвращает время в миллисекундах секундах.
     */
    mtime = function () {
        return new Date().getTime();
    };

}

function generateAutoCode() {
    var list, path, groupName, methodName;

    path = DIR_CLIENT + 'components/application/capi/';
    list = FS.readdirSync(path);
    var capiList = [];
    for (var i in list) {
        groupName = getComponentNameFromPath(path + list[i]);
        require(path + list[i]);
        capiList[groupName] = [];
        for (methodName in global[groupName]) {
            if (typeof global[groupName][methodName] === 'function') {
                capiList[groupName][methodName] = true;
            }
        }
    }
    var capiCode = '';
    for (groupName in capiList) {
        capiCode = '';
        capiCode += groupName + ' = function(){\r\n\r\n';
        for (methodName in capiList[groupName]) {
            capiCode += '\tthis.' + methodName + ' = function(){\r\n\r\n';
            capiCode += '\t\tvar args, toUserId;\r\n';
            capiCode += '\t\targs = Array.prototype.slice.call(arguments);\r\n';
            capiCode += '\t\ttoUserId = args.shift();\r\n';
            capiCode += '\t\tLogicUser.sendToUser(toUserId, "' + groupName + '", "' + methodName + '", args);\r\n';
            capiCode += '\t};\r\n\r\n';
        }
        capiCode += '};\r\n';
        capiCode += groupName + ' = new ' + groupName + '();\r\n';
        FS.writeFileSync(DIR_COMPONENTS + 'generated/' + groupName + '.js', capiCode);
    }
    // формирование карты для ApiRouter. { SAPI*: SAPI*, ... }
    var code2 = '';
    code2 += 'apiRouter.map = {\r\n';
    for (groupName in capiList) {
        code2 += '\t' + groupName + ' : ' + groupName + ',\r\n';
    }
    // remove last symbol
    code2 = code2.substr(0, code2.length - 1);
    code2 += '};\r\n';
    capiCode = 'document.addEventListener("DOMContentLoaded", function() {' + code2 + '})';
    console.log(capiCode);
}

/**
 * Определить имя компонента по пути к нему.
 * @param path путь к файлу компоненат.
 * @returns string имя компонента.
 */
function getComponentNameFromPath(path) {
    return PATH.basename(path).replace('.js', '');
}

/**
 * Подключение всех компонент.
 */
function loaderIncludeComponents(path) {

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
}

