/* Подключаем загрузчик */
require('./system/loader.js');

/**
 * Модули nodeJS.
 */
var FS = require('fs');
var PATH = require('path');
/* это unit.js, и мы можем использовать его в тестировании, круто! */
ASSERT = require('unit.js').assert;

/**
 * Составим список всех компонент.
 */
var componentList = (function (path) {

    var componentList = {};
    /**
     * Рекурсивный поиск всех файлов.
     * @param path
     */
    var searchRecursive = function (path) {
        var list;
        list = FS.readdirSync(path);
        for (var i in list) {
            if (FS.statSync(path + list[i]).isDirectory()) {
                searchRecursive(path + list[i] + '/');
            } else {
                addToList(path + list[i]);
            }
        }
    };
    /**
     * Добавим в список компонент.
     * @param path путь к файлу компонента.
     */
    var addToList = function (path) {
        path = PATH.resolve(path);
        componentList[getComponentNameFromPath(path)] = {
            name: getComponentNameFromPath(path),
            path: path
        };
    };
    /**
     * Определить имя компонента по пути к нему.
     * @param path путь к файлу компоненат.
     * @returns string имя компонента.
     */
    var getComponentNameFromPath = function (path) {
        return PATH.basename(path).replace('.js', '');
    };

    log("Поиск всех компонент.");
    searchRecursive(path);

    return componentList;
})(process.cwd() + '/components/');


/* Валидация тестового кода компонент */
for (var i in componentList) {
    name = componentList[i].name;
    path = componentList[i].path;

    if (!GLOBAL[name].TestBoardScheme) {
        error("Компонент должен иметь свойство ComponentName.TestBoardScheme." +
        "\r\nкомпонент: " + name +
        "\r\nфайл: " + path);
    }
    if (!Array.isArray(GLOBAL[name].TestBoardScheme)) {
        error("Компонент должен иметь свойство ComponentName.TestBoardScheme с типом Array." +
        "\r\nкомпонент: " + name +
        "\r\nфайл: " + path);
    }
    if (!GLOBAL[name].TestComponent) {
        error("Компонент должен иметь свойство ComponentName.TestComponent." +
        "\r\nкомпонент: " + name +
        "\r\nфайл: " + path);
    }
}

/* Проверка каждого компонента отдельно. */
for (var i in componentList) {
    var name, path;

    name = componentList[i].name;
    path = componentList[i].path;
    /* Имитируем подключение схемы */
    BoardScheme = GLOBAL[name].TestBoardScheme;
    /* Имитируем подключение тестового компонента */
    TestComponent = GLOBAL[name].TestComponent;
    TestComponent.__path = path;
    /* Инициируем включение системы */
    log("testing component:" + name);
    creator = new SystemCreator;
    creator.run();
}

log("testing complete.");