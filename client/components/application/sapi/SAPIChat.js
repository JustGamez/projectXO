SAPIChat = function () {

    /**
     * Отправка сообщения на сервер.
     * @param text {String}
     * @param withUserId {int}
     */
    this.sendMessage = function (text, withUserId) {
        apiRouter.executeRequest('SAPIChat', 'sendMessage', arguments, [{connectionId: null}]);
    };

    /**
     * Запрос последних сообщений.
     */
    this.sendMeLastMessages = function () {
        apiRouter.executeRequest('SAPIChat', 'sendMeLastMessages', arguments, [{connectionId: null}]);
    };

    this.blockThisMessage = function (id) {
        apiRouter.executeRequest('SAPIChat', 'blockThisMessage', arguments, [{connectionId: null}]);
    };

    this.sendMeMessagesBeforeId = function (id, userId) {
        apiRouter.executeRequest('SAPIChat', 'sendMeMessagesBeforeId', arguments, [{connectionId: null}]);
    };
};

/**
 * Статичный класс.
 * @type {SAPIChat}
 */
SAPIChat = new SAPIChat();