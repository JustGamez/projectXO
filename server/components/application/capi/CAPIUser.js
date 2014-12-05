CAPIUser = function () {

    this.authorizeSuccess = function (toUserId, userId) {
        LogicUser.sendToUser(toUserId, 'CAPIUser', 'authorizeSuccess', [userId]);
    };
};

/**
 * Констатный класс.
 * @type {CAPIUser}
 */
CAPIUser = new CAPIUser();