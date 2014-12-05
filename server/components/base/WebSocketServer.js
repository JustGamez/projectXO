/**
 * Компонент обслуживающий соединения на сервере.
 * А так же возвращающий клиентский код.
 * @constructor
 */

/**
 * Подключаем nodeJS модули.
 */
var WEBSOCKET = require('websocket');
var HTTP = require('http');
var FS = require('fs');
var PATH = require('path');

WebSocketServer = function () {
    var self = this;
    var lastConnectionId = null;
    /**
     * Перезагружать ли клиентский код, каждый раз. Когда его запрашивают.
     * @type {boolean}
     */
    var reloadClientCodeEveryRequest = null;
    /**
     * Порт для прослушки.
     * @type {int};
     */
    var port = null;
    /**
     * Путь откуда загружать клиентский код.
     * @type {string}
     */
    var clientCodePath = null;
    this.setup = function (setup) {
        reloadClientCodeEveryRequest = setup.reloadClientCodeEveryRequest;
        port = setup.port;
        clientCodePath = setup.clientCodePath;
    };
    /**
     * Включение компонента, тут мы просто выполним инит.
     */
    this.run = function () {
        checkBeforeInit();
        init();
    };

    var checkBeforeInit = function () {
        if (typeof  self.onConnect != 'function') {
            Logs.log("onConnect must be function", Logs.LEVEL_FATAL_ERROR, self.onConnect);
        }
        if (typeof  self.onDisconnect != 'function') {
            Logs.log("onConnect must be function", Logs.LEVEL_FATAL_ERROR, self.onDisconnect);
        }
        if (typeof  self.onData != 'function') {
            Logs.log("onConnect must be function", Logs.LEVEL_FATAL_ERROR, self.onData);
        }
    };

    this.onConnect = null;
    this.onDisconnect = null;
    this.onData = null;
    /**
     * Отправляет данные клиенту
     * @param data
     */
    this.sendData = function (data, id) {
        if (!connectionStack[id]) {
            Logs.log("undefined connection:" + id + " with data:" + data, Logs.LEVEL_WARNING);
            return false;
        }
        connectionStack[id].sendUTF(data);
        return true;
    };
    /**
     * Последний id соединения.
     */
    var lastId = 0;
    /**
     * Стэк соединений.
     */
    var connectionStack = {};
    /**
     * Клинтский код.
     */
    var clientCode = '';
    /**
     * Тут храниться HTTP сервер, nodeJS-модуль
     */
    var http;
    /**
     * Тут храниться WebSocket.server, nodeJS-модуль
     */
    var server;
    /**
     * Загружается клиентский код.
     * Создается севрер.
     * Инициируется прослушивание.
     */
    var init = function () {
        // загрузка клиентского кода.
        loadClientCode();
        // создадим сервер
        http = HTTP.createServer(onHTTPRequest);
        // запустим прослушивание
        http.listen(port);
        // создадим websocket
        server = new WEBSOCKET.server({
            httpServer: http
        });
        server.on('request', onWebSocketRequest);
        Logs.log("WebSocketServer running. port:" + port, Logs.LEVEL_NOTIFY);
    };
    /**
     * Загрузит весь клиентсий код и сохранит его в переменной clientCode.
     */
    var loadClientCode = function () {
        var files;
        Logs.log("Load client code.");
        // загрузим список файлов клиентского кода.
        files = getFileListRecursive(clientCodePath);
        // сформирем клинтский код для списка файлов.
        clientCode = clientCodePrepareCode(files);
    };
    /**
     * Составляет список всех файлов, рекурсивно.
     */
    var getFileListRecursive = function (basePath) {
        var dirList, path, files;
        files = [];
        dirList = FS.readdirSync(basePath);
        for (var i in dirList) {
            path = basePath + dirList[i];
            if (FS.statSync(path).isDirectory()) {
                files = files.concat(getFileListRecursive(path + '/'));
            } else {
                files.push(path);
            }
        }
        return files;
    };
    /**
     * Загрузим код всех файлов, конкатинируем и составим из них одну строку кода.
     * @param files[]
     */
    var clientCodePrepareCode = function (files) {
        var clientCode, path, file_content, name;
        clientCode = "<HTML><HEAD><meta charset='utf-8' />";
        for (var i in files) {
            path = files[i];
            file_content = FS.readFileSync(path);
            if (file_content == 'ClientServerCompliant') {
                path = path.replace(clientCodePath, '');
                file_content = FS.readFileSync(path);
            }
            clientCode += '\r\n<script type="text/javascript">' + "\r\n/* " + path + "*/\r\n" + file_content + '\r\n</script>';
            name = PATH.basename(path, '.js')
            clientCode += '<script>' +
            'if(window["' + name + '"] != undefined){' +
            'window["' + name + '"].__path="' + path + '"' +
            '};</script>';
        }
        clientCode += "</HEAD><BODY></BODY></HTML>";
        return clientCode;
    };
    /**
     * Обработчки запросов от HTTP сервера.
     * при запросе ^/clientCode?*, вернёт клинтский код.
     * при любом другом запросе вернёт 404 ошибку.
     * @param request
     * @param response
     * @returns {boolean}
     */
    var onHTTPRequest = function (request, response) {
        Logs.log("WebSocketServer", Logs.LEVEL_DETAIL, {
            url: request.url,
            method: request.method
        });
        if (request.url.indexOf('/clientCode?') == 0) {
            if (reloadClientCodeEveryRequest) {
                loadClientCode();
            }
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(clientCode);
            return true;
        }
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.end('File not found.');
        return true;
    };
    /**
     * Обработчик запросов от WebSocket-а
     * Собственно это запросы на соединение.
     */
    var onWebSocketRequest = function (request) {
        var connection, id;
        connection = request.accept(null, request.origin);
        id = ++lastId;
        connectionStack[id] = connection;
        Logs.log("WebSocketServer.onConnected: id=" + id, Logs.LEVEL_DETAIL);
        self.onConnect(id);
        connection.on('message', function (message) {
            if (message.type == 'utf8') {
                Logs.log("Получены данные.", Logs.LEVEL_DETAIL, message.utf8Data);
                lastConnectionId = id;
                self.onData(message.utf8Data, id);
            }
        });
        connection.on('close', function () {
            Logs.log("WebSocketServer.onDisconnected: id=" + id);
            delete connectionStack[id];
            self.onDisconnect(id);
        });
    };
};
