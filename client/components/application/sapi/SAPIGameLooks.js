SAPIGameLooks = function () {

    /**
     * ������ ������ ��������� ����.
     * @param gameId {String}
     */
    this.start = function (gameId) {
        apiRouter.executeRequest('SAPIGameLooks', 'start', arguments, [{connectionId: null}]);
    };

    /**
     * ������ ��������� ��������� ����.
     */
    this.stop = function (gameId) {
        apiRouter.executeRequest('SAPIGameLooks', 'stop', arguments, [{connectionId: null}]);
    }
};

/**
 * ��������� �����.
 * @type {SAPIGameLooks}
 */
SAPIGameLooks = new SAPIGameLooks();