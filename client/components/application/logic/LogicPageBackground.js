/**
 * Логика страницы заднего фона.
 * @constructor
 */
LogicPageBackground = function () {

    /**
     * Что делаем, если введенно сообщение и отправлено.
     * @param message {String}
     */
    this.onChatInputEnterMessage = function (message) {
        SAPIChat.sendMessage(message);
    };
};

/**
 * Констатный класс.
 * @type {LogicPageBackground}
 */
LogicPageBackground = new LogicPageBackground();