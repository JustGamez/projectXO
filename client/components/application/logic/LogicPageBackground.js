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
        if (message.length > 0) {
            SAPIChat.sendMessage(message);
        }
    };

    this.onChatDelete = function (id) {
        alert(id);
    };

    /**
     * Покажем диалог что на пригласили!
     * - надо учесть, что бы диалоги не накладывались друг на друга. этож бесит! :)
     */
    this.showInviteDialog = function () {
        //@todo
    };
};

/**
 * Констатный класс.
 * @type {LogicPageBackground}
 */
LogicPageBackground = new LogicPageBackground();