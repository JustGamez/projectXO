SAPIUserComponent = function () {
    var self = this;
    this.setup = function () {
    };
    this.switchOn = function () {
        this.outPing('pingdata');
    };
    this.switchOff = function () {
    };
    /**
     * Сюда будут отправляться логи.
     */
    this.outLog = function (message, level, details) {
    };

    this.inAuthorizationByVK = function (login, password) {
        self.outAuthorizationByVK(login, password);
    };

    this.outAuthorizationByVK = null;

    this.inPong = function (data) {
        self.outPing(new Date());
    };

    this.outPing = null;
};