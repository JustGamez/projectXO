CAPIChat = function () {

    /**
     * Отправить клиенту новое сообщение.
     * @param toUserId {Number} кому отправляем.
     * @param userId {Number} внутрений id пользователя, создавшего сообщение.
     * @param message {String} текст сообщение.
     * @param timestamp {Number} UNIX-timestamp, когда было создано сообщение.
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