LogicWaitersStack = function () {

    var stack = [];

    /**
     * Создадим ожидающего игру.
     * @param userId
     * @param requestFieldTypeId
     * @param requestedSignId
     * @param isRandom
     */
    this.createWaiter = function (userId, requestFieldTypeId, requestedSignId, isRandom) {
        stack.push({
            userId: userId,
            fieldTypeId: requestFieldTypeId,
            signId: requestedSignId,
            isRandom: isRandom
        });
        Logs.log("LogicWaitersStack.createWaiter", Logs.LEVEL_DETAIL, stack);
    };

    /**
     * Найдем ожидающего игру, по параметрам.
     * @param excludingUserId
     * @param withFieldTypeId
     * @param forSignId
     * @param isRandom
     * @returns {*}
     */
    this.getWaiter = function (excludingUserId, withFieldTypeId, forSignId, isRandom) {
        var waiter;
        for (var i in stack) {
            waiter = stack[i];
            if (waiter.userId == excludingUserId) continue;
            if (waiter.fieldTypeId != withFieldTypeId) continue;
            /* Пропустим, если запрашиветс знак и ожидащий требует такой же знак*/
            if (forSignId != LogicXO.SIGN_ID_Empty && waiter.signId == forSignId) continue;
            /* Пропустим, если запршивается случайная игра, а ожидающий требует не случайную */
            if (isRandom != waiter.isRandom) continue;
            /* Удалим его из очереди, он больше не нужен */
            delete stack[i];
            Logs.log("LogicWaitersStack.getWaiter", Logs.LEVEL_DETAIL, waiter);
            return waiter;
        }
        Logs.log("LogicWaitersStack.getWaiter return null", Logs.LEVEL_DETAIL, arguments);
        return null;
    }
};

/**
 * Статичный класс.
 * @type {LogicWaitersStack}
 */
LogicWaitersStack = new LogicWaitersStack();