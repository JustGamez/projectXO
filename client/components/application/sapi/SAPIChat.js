SAPIChat = function () {

    /**
     * Отправка сообщения на сервер.
     * @param message {String}
     */
    this.sendMessage = function (message) {
        apiRouter.executeRequest('SAPIChat', 'sendMessage', arguments, [{connectionId: null}]);
    };

    /**
     * Запрос последних сообщений.
     */
    this.sendMeLastMessages = function () {
        apiRouter.executeRequest('SAPIChat', 'sendMeLastMessages', arguments, [{connectionId: null}]);
    }
};

/**
 * Статичный класс.
 * @type {SAPIChat}
 */
SAPIChat = new SAPIChat();