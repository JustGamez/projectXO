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
    this.save = function (whoId, whomId) {
        invites.push({whoId: whoId, whomId: whomId});
        pageController.redraw();
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
                return true;
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
    this.isInviteExists = function (whoId, whomId) {
        for (var i in invites) {
            if (invites[i].whoId == whoId && invites[i].whomId == whomId) {
                return true;
            }
        }
        return false;
    };

    /**
     * Удалить приглашения с удовлетворящие условями указанных приглашающего и приглашенного.
     * @param whoId {Number} внутрений id пользователя который пригласил.
     * @param whomId {Number} внутрений id пользователя которого пригласили.
     */
    this.clearInvite = function (whoId, whomId) {
        for (var i in invites) {
            if (invites[i].whoId == whoId && invites[i].whomId == whomId) {
                delete invites[i];
                break;
            }
        }
        pageController.redraw();
    };
};

/**
 * Статичный класс.
 * @type {LogicInvites}
 */
LogicInvites = new LogicInvites();