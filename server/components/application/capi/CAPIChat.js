CAPIChat = function () {

    /**
     * Отправить клиенту новое сообщение.
     * @param toUserId {Number} кому отправляем.
     * @param userId {Number} данные об игре.
     * @param message {String} данные об игре.
     * @param timestamp {Number} данные об игре.
     */
    this.getNewMessage = function (toUserId, userId, message, timestamp) {
        LogicUser.sendToUser(toUserId, 'CAPIChat', 'getNewMessage', [userId, message, timestamp]);
    };
};

/**
 * Констатный класс.
 * @type {CAPIChat}
 */
CAPIChat = new CAPIChat();