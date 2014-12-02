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
    this.setup = function () {

    };
    /**
     * Включение компонента, тут мы просто выполним инит.
     */
    this.switchOn = function () {
        init();
    };
    this.switchOff = function () {
    };
    /**
     * Сюда будут отправляться логи.
     */
    this.outLog = function (message, level, details) {
    };
    /**
     * Сюда отправляются данные от клиентов. id коннекта и данные.
     * @param data данные
     * @param id id коннекта
     */
    this.outData = function (data, id) {
    };
    /**
     * Когда кто-то коннектися, сюда будут отправляться данные с id соедениения.
     */
    this.outOnConnect = function (id) {
    };
    /**
     * Когда кто-то дисконнектися, сюда будут отправляться данные с id соедениения.
     */
    this.outOnDisconnect = function (id) {
    };
    /**
     * Перезагружать ли клиентский код, каждый раз. Когда его запрашивают.
     * @type {boolean}
     */
    this.reloadClientCodeEveryRequest = null;
    /**
     * Порт для прослушки.
     * @type {int};
     */
    this.port = null;
    /**
     * Путь откуда загружать клиентский код.
     * @type {string}
     */
    this.clientCodePath = null;
    /**
     * Отправляет данные клиенту
     * @param data
     */
    this.inData = function (data, id) {
        if (id == undefined)id = lastConnectionId;
        if (!connectionStack[id]) {
            self.outLog("undefined connection:" + id + " with data:" + data, LogsComponent.LEVEL_WARNING);
            return;
        }
        connectionStack[id].sendUTF(data);
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
        http.listen(self.port);
        // создадим websocket
        server = new WEBSOCKET.server({
            httpServer: http
        });
        server.on('request', onWebSocketRequest);
        self.outLog("WebSocketServer running. port:" + self.port, LogsComponent.LEVEL_NOTIFY);
    };
    /**
     * Загрузит весь клиентсий код и сохранит его в переменной clientCode.
     */
    var loadClientCode = function () {
        var files;
        self.outLog("Load client code.");
        // загрузим список файлов клиентского кода.
        files = getFileListRecursive(self.clientCodePath);
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
     * при запросе /clientCode, вернёт клинтский код.
     * при любом другом запросе вернёт 404 ошибку.
     * @param request
     * @param response
     * @returns {boolean}
     */
    var onHTTPRequest = function (request, response) {
        self.outLog("WebSocketServer", LogsComponent.LEVEL_DETAIL, {
            url: request.url,
            method: request.method
        });
        if (request.url == '/clientCode') {
            if (self.reloadClientCodeEveryRequest) {
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
        self.outLog("WebSocketServer.onConnected: id=" + id, LogsComponent.LEVEL_DETAIL);
        self.outOnConnect(id);
        connection.on('message', function (message) {
            if (message.type == 'utf8') {
                self.outLog("Получены данные.", LogsComponent.LEVEL_DETAIL, message.utf8Data);
                lastConnectionId = id;
                self.outData(message.utf8Data, id);
            }
        });
        connection.on('close', function () {
            self.outLog("WebSocketServer.onDisconnected: id=" + id);
            delete connectionStack[id];
            self.outOnDisconnect(id);
        });
    };
};

/* Тестовый компонент */
WebSocketServer.TestComponent = function () {

};

WebSocketServer.TestBoardScheme = [];