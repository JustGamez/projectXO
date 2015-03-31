/**
 * Подключаем nodeJS модули.
 */
var WEBSOCKET = require('websocket');
var HTTP = require('http');
var FS = require('fs');
var PATH = require('path');
var UGLIFYJS = require('uglify-js');
var OS = require('os');
var IMAGE_SIZE = require('image-size');

/**
 * Компонент обслуживающий соединения на сервере.
 * А так же возвращающий клиентский код.
 * @constructor
 */
WebSocketServer = function () {
    var self = this;

    /**
     * Префикс запрашиваемых картинок, все запросы к картинкам должны начинаться с этого префикса.
     * Далее префикс будет удаляться, и оставшаяся часть пути будет считаться путем к картинке
     * в папке imagesPath.
     * @type {string}
     */
    var imagesPrefix = '/images/';
    var lastConnectionId = null;

    /**
     * Перезагружать ли клиентский код, каждый раз, когда его запрашивают.
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

    /**
     * Проверка перед запуском:
     * - проверим установлены ли каллбэки пользовательским кодом;
     * - проверим настройки: port, clientCodePath, reloadClientCodeEveryRequest
     */
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
        if (typeof port != 'number') {
            Logs.log("port given by .setup, must be number", Logs.LEVEL_FATAL_ERROR, port);
        }
        if (typeof reloadClientCodeEveryRequest != 'boolean') {
            Logs.log("reloadClientCodeEveryRequest given by .setup, must be boolean", Logs.LEVEL_FATAL_ERROR, reloadClientCodeEveryRequest);
        }
        if (typeof clientCodePath != 'string') {
            Logs.log("clientCodePath given by .setup, must be string", Logs.LEVEL_FATAL_ERROR, clientCodePath);
        }
        if (typeof imagesPath != 'string') {
            Logs.log("imagesPath given by .setup, must be string", Logs.LEVEL_FATAL_ERROR, imagesPath);
        }
    };

    /**
     * Путь откуда загружать картинки.
     * @type {string}
     */
    var imagesPath = null;

    /**
     * Каллбэек будет вызываться при коннекте.
     * @type function
     */
    this.onConnect = null;

    /**
     * Каллбэек будет вызываться при диконнекте.
     * @type function
     */
    this.onDisconnect = null;

    /**
     * Каллбэек будет вызываться при получении данных.
     */
    this.onData = null;

    /**
     * Отправляет данные клиенту.
     * @param data {String} данные для отправки, строка данных.
     * @param id {Number} id соединения
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
     * Клиентский код.
     * @type {string}
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
    this.init = function (afterInitCallback) {
        reloadClientCodeEveryRequest = Config.WebSocketServer.reloadClientCodeEveryRequest;
        port = Config.WebSocketServer.port;
        clientCodePath = Config.WebSocketServer.clientCodePath;
        imagesPath = Config.WebSocketServer.imagesPath;

        checkBeforeInit();
        /* загрузка клиентского кода. */
        loadClientCode();

        /* создадим сервер */
        http = HTTP.createServer(onHTTPRequest);
        /* запустим прослушивание */
        http.listen(port);
        /* создадим websocket */

        server = new WEBSOCKET.server({
            httpServer: http
        });
        server.on('request', onWebSocketRequest);

        Logs.log("WebSocketServer running. port:" + port, Logs.LEVEL_NOTIFY);
        Logs.log("WebSocketServer inited.", Logs.LEVEL_NOTIFY);
        afterInitCallback();
    };

    /**
     * Загрузит весь клиентсий код и сохранит его в переменной clientCode.
     */
    var loadClientCode = function () {
        var clientJSCode;
        Logs.log("Load client code.");
        clientJSCode = getClientJSCode();
        /* Сформируем клинтский код. */
        clientCode = "";
        clientCode += "<HTML>\r\n";
        clientCode += "<HEAD>\r\n";
        clientCode += "<meta charset='utf-8' />\r\n";
        clientCode += "<script src='//vk.com/js/api/xd_connection.js?2' type='text/javascript'></script>\r\n";
        clientCode += "<script type='text/javascript' src='/js/VKClientCode.js?t=" + (new Date().getTime()).toString() + "'></script>\r\n";
        clientCode += "</HEAD><BODY style='margin:0px;'>\r\n";
        clientCode += getClientImageCode();
        clientCode += "<div style='height:686px;'></div>\r\n";
        clientCode += "<iframe src='/VK/commentsWidget' style='border:none; height: 686px; width:788px;'></iframe>\r\n";
        clientCode += "</BODY></HTML>";

        FS.writeFile('/var/xo/js/VKClientCodeSource.js', clientJSCode);

        if (Config.WebSocketServer.compressJSClientCode) {
            var result = UGLIFYJS.minify(clientJSCode, {fromString: true});
            clientJSCode = result.code;
        }
        FS.writeFile('/var/xo/js/VKClientCode.js', clientJSCode);
    };

    /**
     * Вернем клиентские js-скрипты.
     */
    var getClientJSCode = function () {
        var jsFiles;
        /* Загрузим список файлов клиентского кода. */
        jsFiles = [];
        jsFiles = jsFiles.concat(getFileListRecursive(clientCodePath + 'system/'));
        jsFiles = jsFiles.concat(getFileListRecursive(clientCodePath + 'components/'));
        /* Include Config file. */
        var hostname = OS.hostname();
        var clientConfigPath = clientCodePath + 'Config.' + hostname + '.js';
        Logs.log("Client config file: " + clientConfigPath, Logs.LEVEL_NOTIFY);
        jsFiles.push(clientConfigPath);
        jsFiles.push(clientCodePath + '/run.js');
        return clientCodePrepareCode(jsFiles);
    };

    /**
     * Вернем клинетские картинки.
     */
    var getClientImageCode = function () {
        var imageFiles, imageCode, path, timePostfix, demension;
        imageFiles = getFileListRecursive(imagesPath);
        imageCode = "<script>";
        imageCode += "imagesData = {};";
        timePostfix = "?t=" + new Date().getTime();
        for (var i in imageFiles) {
            path = imagesPrefix + imageFiles[i].substr(imagesPath.length);
            demension = IMAGE_SIZE(imageFiles[i]);
            imageCode += "\r\nimagesData['" + path + "']={path:'" + path + timePostfix + "',w:" + demension.width + ",h:" + demension.height + "};";
        }
        imageCode += "</script>";
        /* добавим img тэги для предзагрузки. */
        imageCode += "<div style='display:none;'>";
        for (var i in imageFiles) {
            path = imagesPrefix + imageFiles[i].substr(imagesPath.length);
            imageCode += "\r\n<img src='" + path + timePostfix + "'>";
        }
        imageCode += "</div>";
        return imageCode;
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
        clientCode = '';
        for (var i in files) {
            path = files[i];
            file_content = FS.readFileSync(path);
            if (file_content == 'ClientServerCompliant') {
                path = path.replace(clientCodePath, '');
                file_content = FS.readFileSync(path);
            }
            // clientCode += "\r\n<script type='text/javascript'>" +
            clientCode += "\r\n/* " + path + " */\r\n";
            clientCode += file_content;
            name = PATH.basename(path, '.js');
            /* Добавим пути к файлам компонент, это нужно для отладки */
            clientCode += 'if(window["' + name + '"] != undefined){' + 'window["' + name + '"].__path="' + path + '"};\r\n';
        }
        return clientCode;
    };

    /**
     * Обработчки запросов от HTTP сервера.
     * при запросе ^/VK/clientCode*, вернёт клинтский код.
     * при запросе ^{imagesPrefix}*, вернёт соответствующую картинку из папки imagePath
     * при любом другом запросе вернёт 404 ошибку.
     * @param request
     * @param response
     * @returns {boolean}
     */
    var onHTTPRequest = function (request, response) {
        var path;
        /* Запрашивается клинетский код? */
        if (request.url.indexOf('/VK/clientCode') == 0) {
            if (reloadClientCodeEveryRequest) {
                loadClientCode();
            }
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(clientCode);
            return true;
        }
        if (request.url.indexOf('/VK/commentsWidget') == 0) {
            var VKCommentsWidgetCode = "" +
                "<html>" +
                "<head>" +
                "<script type='text/javascript' src='//vk.com/js/api/openapi.js?116'></script>" +
                "<script>VK.init({apiId: " + Config.SocNet.appId + ", onlyWidgets: true});</script>" +
                "</head>" +
                "<body style='margin:0px;'>" +
                "<div id='vk_comments'></div>\
            <script type='text/javascript'>\
                VK.Widgets.Comments('vk_comments', {limit: 5, width: 788, height: 585, attach: '*'});\
            </script>" +
                "</body>" +
                "</html>";
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(VKCommentsWidgetCode);
            return true;
        }
        if (request.url.indexOf('/status') == 0) {
            var status = Profiler.getTextReport();
            var status2 = ApiRouterMetrics.getMetrics();
            var reloadJSScript = "" +
                "<script>setTimeout(function(){window.location.href = window.location.href;},1000);</script>";
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end('<pre>' + status + '</pre>' + '<pre>' + status2 + '</pre>' + reloadJSScript);
            return true;
        }
        if (request.url.indexOf('/shutdown') == 0) {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end('<pre>' + "Shutdown executed!" + new Date().getTime() + '</pre>');
            deInitBeforeShutdown(function () {
                process.exit();
            });
            return true;
        }
        if (request.url.indexOf('/reloadClientCode') == 0) {
            loadClientCode();
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end('<pre>' + "Reload Client Code executed!" + new Date().getTime() + '</pre>');
            return true;
        }
        if (request.url.indexOf('/statistic') == 0) {
            Statistic.flushCache();
            Statistic.getStatus(function (text) {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end('' + text + '');
            });
            return true;
        }
        if (request.url.indexOf('/Logs/setDetail') == 0) {
            Logs.setLevel(Logs.LEVEL_DETAIL);
            setTimeout(function () {
                Logs.setLevel(Logs.LEVEL_NOTIFY);
            }, 1000 * 60 * 10);
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end("set detail log level " + new Date().getTime());
            return true;
        }
        if (request.url.indexOf('/Logs/setNotify') == 0) {
            Logs.setLevel(Logs.LEVEL_NOTIFY);
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end("set notify log level " + new Date().getTime());
            return true;
        }
        /* Во всех других случаях ошибка 404(Not found) */
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.end('File `' + request.url + '`not found.');
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
                /* Logs.log("Получены данные.", Logs.LEVEL_DETAIL, message.utf8Data); */
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
