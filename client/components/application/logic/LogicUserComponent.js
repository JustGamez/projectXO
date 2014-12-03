/**
 * Компонент работы с пользователями.
 * @constructor
 */
LogicUserComponent = function () {
    var self = this;

    this.outLog = null;
    this.outUserAuthorizationByVK = null;

    this.inUserAuthorizationSuccess = function () {
        console.log('authorizataion succsss');
    };
    this.inSocNetData = function (socNetData) {
        self.outUserAuthorizationByVK(socNetData.socNetUserId, socNetData.authParams);
    };
};