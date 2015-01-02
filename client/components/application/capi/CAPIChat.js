CAPIChat = function () {

    /**
     * Обновить данные о пользователи
     * @param cntx {Object} контекст соединения.
     * @param userId {Number} сообщение
     * @param text {String} сообщение
     * @param timestamp {Number} сообщение
     */
    this.getNewMessage = function (cntx, userId, text, timestamp) {
        LogicChatCache.add(userId, text, timestamp);
        pageController.redraw();
    };
};

/**
 * Константный класс.
 * @type {CAPIChat}
 */
CAPIChat = new CAPIChat();