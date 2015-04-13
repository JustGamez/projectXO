LogicInvites = function () {
    var self = this;

    /**
     * Тут будем хранить все инвайты.
     * @type {Array}
     */
    var invites = [];

    /**
     * Сохраняет приглашение.
     * @param whoId {Number} внутрений id пользователя который пригласил.
     * @param whomId {Number} внутрений id пользователя которого пригласили.
     */
    this.save = function (whoId, whomId, fielTypeId, signId) {
        invites.push({whoId: whoId, whomId: whomId, fieldTypeId: fielTypeId, signId: signId});
        PageController.redraw();
    };

    /**
     * Есть приглашение, для этого пользователя, где он либо приглашающий, либо приглашенный.
     * Т.е. есть ли он вообще в приглашениях.
     * @param userId {Number} внутрений id пользователя.
     * @return {Boolean}
     */
    this.haveInvite = function (userId) {
        for (var i in invites) {
            if (invites[i].whoId == userId || invites[i].whomId == userId) {
                return invites[i];
            }
        }
        return false;
    };

    /**
     * Есть ли приглашение удовлетворящие условиям указанного приглашающего и приглашенного.
     * @param whoId {Number} внутрений id пользователя который пригласил.
     * @param whomId {Number} внутрений id пользователя которого пригласили.
     * @returns {boolean}
     */
    this.get = function (whoId, whomId) {
        for (var i in invites) {
            if ((invites[i].whoId == whoId || !whoId ) && (!whomId || invites[i].whomId == whomId)) {
                return invites[i];
            }
        }
        return false;
    };

    /**
     * Удалить приглашения с удовлетворящие условями указанных приглашающего и приглашенного.
     * @param whoId {Number} внутрений id пользователя который пригласил.
     * @param whomId {Number} внутрений id пользователя которого пригласили.
     */
    this.clearInviteByPare = function (whoId, whomId) {
        for (var i in invites) {
            if (invites[i].whoId == whoId && invites[i].whomId == whomId) {
                delete invites[i];
                break;
            }
        }
        PageController.redraw();
    };

    /**
     * Удалить приглашения для указанно пользователя.
     * @param userId {Number} внутрений id пользователя.
     */
    this.clearInvitesByUserId = function (userId) {
        for (var i in invites) {
            if (invites[i].whoId == userId || invites[i].whomId == userId) {
                delete invites[i];
                break;
            }
        }
        PageController.redraw();
    };
};

/**
 * Статичный класс.
 * @type {LogicInvites}
 */
LogicInvites = new LogicInvites();
