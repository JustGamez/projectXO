/**
 * Компонент обеспечивающий соединение с сервером.
 * @constructor
 */
WebSocketClient = function () {
    var self = this;
    /**
     * Хост сервера.
     * @type {string}
     */
    var host = null;
    /**
     * Порт сервера.
     * @type {int}
     */
    var port = null;
    this.setup = function (setup) {
        if (setup.port)port = setup.port;
        if (setup.host)host = setup.host;
    };
    /**
     * Сюда мы будет отправлять логи.
     * @param message
     * @param level
     * @param details
     */
    this.outLog = function (message, level, details) {
    };
    /**
     * Вызываем при получении данных
     * @param data данные, текстовая строка.
     */
    this.outData = function (data) {
    };
    /**
     * Вызовем при коннекте к серверу.
     */
    this.outOnConnect = function () {
    };
    /**
     * Вызовем при дисконнекте с сервером.
     * Например потеря связи.
     */
    this.outOnDisconnect = function () {
    };
    /**
     * Сюда мы будем получать данные и отправлять их на сервер.
     * Примечание: Однако, если соединения с серверм нет, то мы будем просто добавлять их в буффер.
     * @param data string
     */
    this.inData = function (data) {
        packetBuffer.push(data);
        trySend();
    };
    /**
     * Просто выполним инициализацию.
     * Собсвтено подсоединимся к серверу.
     */
    this.switchOn = function () {
        init();
    };
    /**
     * Состояние соединения:
     * true - соединение активно
     * false - нет соединения.
     */
    var isConnected = false;
    /**
     * Буфер пакетов данных.
     * Впервую очередь все данные попадают сюда, а уже потом отправляются.
     * На случай, если нет соединения сейчас, но оно появиться потом.
     */
    var packetBuffer = [];
    /**
     * Собственно сокет.
     * @type {null}
     */
    var socket = null;
    /**
     * Инициалиизация.
     * Создадим объект клиента
     * Установим обработчики.
     */
    var init = function () {
        var uri;
        self.outLog("WebSocketClient запущен.");
        uri = "ws://" + host + ":" + port + "/ws";
        socket = new WebSocket(uri);
        // установим обработчики.
        socket.onopen = onOpen;
        socket.onclose = onClose;
        socket.onmessage = onMessage;
        socket.onerror = onError;
    };
    /**
     * Обработчик при открытии соединения.
     */
    var onOpen = function () {
        isConnected = true;
        // на случай, если буфер не пуст.
        trySend();
        self.outLog("WebSocketClient: Соединение установленно:" + self.host + ':' + self.port);
        self.outOnConnect();
    };
    /**
     * Обработчик при закрытие соединения.
     * @param event
     */
    var onClose = function (event) {
        isConnected = false;
        if (event.wasClean) {
            self.outLog("WebSocketClient: Соединение закрыто успешно.");
        } else {
            self.outLog("WebSocketClient: Соединение закрыто, отсутствует соединение.");
        }
        self.outLog('WebSocketClient: Код: ' + event.code + ' причина: ' + event.reason);
        self.outOnDisconnect();
    };
    /**
     * Обработчик при получении данных(сообщения) от сервера.
     * @param event
     */
    var onMessage = function (event) {
        self.outLog("WebSocketClient: Получены данные.", LogsComponent.LEVEL_DETAIL, event.data);
        self.outData(event.data);
    };
    /**
     * Обработчик ошибок вебсокета.
     * @param error
     */
    var onError = function (error) {
        self.outLog("WebSocketClient: Ошибка " + error.message);
    };
    /**
     * Отправка данных из буфера.
     * Если нет данных в буфере возвращаемся.
     * Если нет соединения, то пробуем отправить их позже.
     * Берем пакет из буфера, удаляе его из буфера.
     * Отправляем пакет на сервер.
     * Если в буфере еще есть данные, пробуем их отправить позже.
     */
    var trySend = function () {
        var data;
        // если буфер пуст - уходим.
        if (!packetBuffer.length) {
            return;
        }
        // если нет соединения пробуем позже.
        if (!isConnected) {
            setTimeout(trySend, this.trySendTimeout);
            return;
        }
        // берем элемент из буфера.
        data = packetBuffer.shift();
        socket.send(data);
        self.outLog("WebSocketClient.send data: length=" + data.length, LogsComponent.LEVEL_DETAIL);
        // остальные данные отправим позже.
        if (packetBuffer.length) {
            setTimeout(trySend, this.trySendTimeout);
        }
    };
};