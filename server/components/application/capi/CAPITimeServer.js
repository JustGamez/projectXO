CAPITimeServer = function () {

    this.gotServerTime = function (toUserId, time) {
        LogicUser.sendToUser(toUserId, 'CAPITimeServer', 'gotServerTime', [time]);
    };
};

/**
 * Constant class
 * @type {CAPITimeServer}
 */
CAPITimeServer = new CAPITimeServer();