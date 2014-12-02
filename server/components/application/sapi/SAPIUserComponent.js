/**
 *
 * @constructor
 */
SAPIUserComponent = function () {
    var self = this;
    this.setup = function () {
    };
    this.switchOn = function () {
    };
    this.switchOff = function () {
    };
    /**
     * Сюда будут отправляться логи.
     */
    this.outLog = function (message, level, details) {
    };
    /* Собственно входы */
    /**
     * Авторизация через вКонтакте.
     * @param param
     */
    this.inAuthorizationByVK = function (login, password) {
        self.outLog("TODO - SAPIUserComponent.inAuthorizationByVK", LogsComponent.LEVEL_FATAL_ERROR);
    };

    this.inPing = function (data) {
        self.outPong(data);
    };

    this.outPong = null;
};

SAPIUserComponent.TestSkipped = true;
