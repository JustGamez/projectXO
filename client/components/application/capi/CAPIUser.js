CAPIUser = function () {

    this.authorizeSuccess = function (cntx, userId) {
        LogicUser.authorizeSuccess(userId);
    };
};

/**
 * Константный класс.
 * @type {CAPIUser}
 */
CAPIUser = new CAPIUser();