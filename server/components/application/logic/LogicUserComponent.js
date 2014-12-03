/**
 * Логика работы с пользователями.
 * @constructor
 */
LogicUserComponent = function () {
    var self = this;

    this.outLog = null;
    this.outUserAuthorizationSuccess = null;
    this.outCheckAuthVK = null;

    this.inUserAuthorizationByVK = function (socNetUserId, authParams) {
        if (self.outCheckAuthVK(socNetUserId, authParams)) {

            // get
            self.outGetUserWhere({
                socNetTypeId: SocNetComponent.TYPE_VK,
                socNetUserId: socNetUserId
            });
            // if not exists
            // then create
            // bind to this connectionId
            // or just send success

        } else {
            this.outLog("Authorization by VK failed", LogsComponent.LEVEL_WARNING, {
                socNetUserId: socNetUserId,
                authParams: authParams
            });
        }
    };
};