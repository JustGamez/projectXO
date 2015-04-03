LogicRating = function () {

    /**
     * Тут мы сохраним id юзеров для обработки, так мы создадим последовательную очередь обработки.
     * Это нужно, т.к. паралельная обработка может нарушить целостность данных, а так же для оптимизиации типа отложенное выполнение.
     * @type {int[]}
     */
    var updatePositionUserIds = [];

    /**
     * Блокировка обновления позиций рейтинга.
     * @type {boolean} true - означает, что в данный момент еще не завершено обновление какой то позиции.
     */
    var updatePositionBlocked = false;

    /**
     * Метод должен быть вызыван при создании пользователя.
     * Создаст для него запись в таблице рейтинга.
     * @param user {Object} инфо пользователя.
     */
    this.onUserCreated = function (user) {
        DataRating.addPosition(user.id, function (lastPosition) {
            LogicUser.sendToAll(CAPIRating.updateLastPosition, lastPosition);
        });
    };

    /**
     * Метод должен вызываться, когда пользователь получил одно очередное очко.
     * Метод должен обеспечить правильное позицию игрока в рейтинге.
     * @param userId {Number}
     * @param score15x15vsPerson {Number}
     * @param score3x3vsPerson {Number}
     * @param score15x15vsRobot {Number}
     * @param score3x3vsRobot {Number}
     */
    this.onPositionScoreUp = function (userId, score15x15vsPerson, score3x3vsPerson, score15x15vsRobot, score3x3vsRobot) {
        updatePositionUserIds.push({
            userId: userId,
            _15x15PVP: score15x15vsPerson,
            _3x3PVP: score3x3vsPerson,
            _15x15PVB: score15x15vsRobot,
            _3x3PVB: score3x3vsRobot
        });
        tryUpdateNextPosition();
    };

    /**
     * Попытка запуска апдейта позиции.
     * Если уже идёт обновление, мы ничего не делаем.
     * Иначе запускаем процесс обновления.
     */
    var tryUpdateNextPosition = function () {
        if (updatePositionBlocked) {
            return;
        }
        if (updatePositionUserIds.length == 0) {
            return;
        }
        updatePositionBlocked = true;
        executeUpdatePosition(function () {
            updatePositionBlocked = false;
            tryUpdateNextPosition();
        });
    };

    /**
     * Процесс обновления очередной позиции.
     * @param onFinishCallback {Function}
     */
    var executeUpdatePosition = function (onFinishCallback) {
        var userId, data;
        var prid_all = Profiler.start(Profiler.ID_RATING_UPDATE);
        // @todo userId, scoreTypeId
        data = updatePositionUserIds.shift();
        Logs.log("Execute update position. userId= " + data.userId, Logs.LEVEL_DETAIL);
        // @todo is position == 1 skip now.
        /* Get target user from database. Find target user with hist params.*/
        var step_1 = function () {
            var prid = Profiler.start(Profiler.ID_RATING_UPDATE_STEP_1);
            DB.query("SELECT position FROM rating WHERE userId = " + data.userId, function (rows) {
                if (!rows[0]) {
                    Logs.log("Position does not exists with userId = " + userId, Logs.LEVEL_ERROR);
                    Profiler.stop(Profiler.ID_RATING_UPDATE, prid);
                    onFinishCallback();
                    return;
                }
                Profiler.stop(Profiler.ID_RATING_UPDATE_STEP_1, prid);
                step_2(rows[0]);
            });
        };
        /* Get user with same score and lowest position. New position for user here. */
        var step_2 = function (before) {
            var query;
            var prid = Profiler.start(Profiler.ID_RATING_UPDATE_STEP_2);
            query = "SELECT * FROM rating" +
            " WHERE " +
            " position <= " + before.position +
            " AND ( " +
            " score15x15vsPerson < " + data._15x15PVP + " OR" +
            " (score15x15vsPerson = " + data._15x15PVP + " AND score3x3vsPerson < " + data._3x3PVP + ") OR" +
            " (score15x15vsPerson = " + data._15x15PVP + " AND score3x3vsPerson = " + data._3x3PVP + " AND score15x15vsRobot < " + data._15x15PVB + ") OR" +
            " (score15x15vsPerson = " + data._15x15PVP + " AND score3x3vsPerson = " + data._3x3PVP + " AND score15x15vsRobot = " + data._15x15PVB + " AND score3x3vsRobot < " + data._3x3PVB + ")" +
            " )" +
            "ORDER BY position ASC" +
            " LIMIT 1";
            DB.query(query, function (rows) {
                Profiler.stop(Profiler.ID_RATING_UPDATE_STEP_2, prid);
                step_3(before, rows[0]);
            });
        };
        /* Update block users with same score and lower positions. Move all down. */
        var step_3 = function (before, nearest) {
            var query;
            var prid = Profiler.start(Profiler.ID_RATING_UPDATE_STEP_3);
            query = "UPDATE rating SET position = position + 1 WHERE position < " + before.position + " AND position >= " + nearest.position;
            DB.query(query, function () {
                Profiler.stop(Profiler.ID_RATING_UPDATE_STEP_3, prid);
                step_4(before, nearest);
            });
        };
        /* Update score and position for target user. Move target user to new position. */
        var step_4 = function (before, nearest) {
            var query;
            var prid = Profiler.start(Profiler.ID_RATING_UPDATE_STEP_4);
            query = "UPDATE rating SET" +
            " score15x15vsPerson = " + data._15x15PVP +
            ",score3x3vsPerson = " + data._3x3PVP +
            ",score15x15vsRobot = " + data._15x15PVB +
            ",score3x3vsRobot = " + data._3x3PVB +
            ",position = " + nearest.position +
            " WHERE userId = " + data.userId;
            DB.query(query, function () {
                /* Теперь соощим всем клиентам, что рейтинг обновитлся и те сбросят кэш позиций. */
                LogicUser.sendToAll(CAPIUser.ratingChanged);
                Profiler.stop(Profiler.ID_RATING_UPDATE_STEP_4, prid);
                Profiler.stop(Profiler.ID_RATING_UPDATE, prid_all);
                onFinishCallback();
            });
        };
        /* Begin process here. */
        step_1();
    };
};

/**
 * Статичный класс.
 * @type {LogicRating}
 */
LogicRating = new LogicRating();
