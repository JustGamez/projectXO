SAPILogs = function () {

    /**
     * Log some - on the server
     * @param cntx {Object} connection context
     * @param message {String} сообщение.
     * @param level {int}
     * @param details
     */
    this.log = function (cntx, message, level, details) {
        Logs.log("CLIENT_LOG:" + message, level, details);
    };

};
/**
 * Статичный класс.
 * @type {SAPILogs}
 */
SAPILogs = new SAPILogs();