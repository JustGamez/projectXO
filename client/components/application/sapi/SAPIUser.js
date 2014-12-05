SAPIUser = function () {

    /**
     *
     * @param socNetUserId id в социальной сети.
     * @param authParams параметры аутентификации.
     */
    this.authorizeByVK = function (socNetUserId, authParams) {
        apiRouter.executeRequest('SAPIUser', 'authorizeByVK', arguments, [{connectionId: null}]);
    };
};

/**
 * Статичный класс.
 * @type {SAPIUser}
 */
SAPIUser = new SAPIUser();