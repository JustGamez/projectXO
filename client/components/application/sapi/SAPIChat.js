SAPIChat = function () {

    /**
     * Отправка сообщения на сервер.
     * @param message {String}
     */
    this.sendMessage = function (message) {
        apiRouter.executeRequest('SAPIUser', 'sendMeUserInfo', arguments, [{connectionId: null}]);
    };
};

/**
 * Статичный класс.
 * @type {SAPIChat}
 */
SAPIChat = new SAPIChat();