/**
 * @constructor
 */
LogicNotifier = function () {
    var self = this;

    var tableName = 'notifies';

    this.init = function (afterInitCallback) {
        setInterval(process, Config.LogicNotifier.timeInterval);
        afterInitCallback();
    };

    this.onUserCreated = function (user) {
        DB.query("INSERT INTO " + tableName + " (userId, socNetUserId, isAppUser, lastCheck,lastNotify,lastPosition) VALUES (" + user.id + "," + user.socNetUserId + " ,1,0,0,0)", function () {
        });
    };

    this.onUserLogin = function (user) {
        // @todo update position from rating table.
        DB.query("UPDATE " + tableName + " SET lastPosition = 0 WHERE userId = " + user.id, function () {
        });
    };

    var blocked = false;

    this.runManual = function () {
        process();
    };

    var proccessAgainCount = 0;

    var process = function () {
        var query;
        if (blocked) return;

        blocked = true;

        query = "UPDATE notifies SET lastPosition = (SELECT position FROM rating WHERE rating.userId = notifies.userId) WHERE lastPosition = 0";
        DB.query(query, function (result) {
            step2();
        });
    };

    var step2 = function () {
        var query, processedCount, timeout;

        query = "SELECT " +
        "n.*, " +
        "rating.updated, rating.position as currentPosition  " +
        "FROM " + tableName + " as n LEFT JOIN rating ON n.userId = rating.userId " +
        "WHERE " +
        " lastCheck < " + (time() - 10) +
            /* не чаще 3 раз в сутки */
        " AND lastNotify < " + (time() - (24 * 60 * 60) / 3) +
        " AND rating.position > n.lastPosition" +
            /* не раннее чем через сутки */
            //@todo swtich on it!
            //" updated >= " + (time() - (24 * 60 * 60)) +
        " ORDER BY lastCheck ASC, lastNotify ASC LIMIT " + Config.LogicNotifier.usersPerIteration;
        DB.query(query, function (rows) {
            Logs.log("LogicNotifier.process: count:" + rows.length, Logs.LEVEL_NOTIFY);
            var count = rows.length;
            if (count == 0) {
                blocked = false;
                return;
            }
            step3(rows);
        });
    };

    var step3 = function (rows) {
        var socNetUserIds, tmp;
        socNetUserIds = [];
        rows.forEach(function (row) {
            socNetUserIds.push(row.socNetUserId);
        });

        SocNet.getUsersOnline(socNetUserIds, function (socNetUserIdToOnline) {
            tmp = [];
            rows.forEach(function (row) {
                if (socNetUserIdToOnline[row.socNetUserId].online) {
                    tmp.push(row);
                } else {
                    checkComplete(row, function () {
                    });
                }
            });
            rows = tmp;
            Logs.log("LogicNotifier.process:count ONLINE ONLY:" + rows.length, Logs.LEVEL_NOTIFY);
            step4(rows);
        });
    };

    /**
     * Опвестить их всех.
     * @param rows
     */
    var step4 = function (rows) {
        var processCount, timeout;
        if (rows.length == 0) {
            blocked = false;
            return;
        }
        processCount = 0;
        timeout = 0;
        rows.forEach(function (row) {
            timeout += Config.LogicNotifier.notifyTimeInterval;
            setTimeout(function () {
                processRow(row, function () {
                    processCount++;
                    if (rows.length == processCount) {
                        Logs.log("Notifier unblocked. count:" + processCount, Logs.LEVEL_NOTIFY);
                        blocked = false;
                    }
                });
            }, timeout);
        });
    };

    /**
     * @param row {Object} fields: userId, lastCheck ,lastNotify, isAppUser, lastPosition, currentPosition
     * @param callback
     */
    var processRow = function (row, callback) {
        var prid = Profiler.start(Profiler.ID_NOTIFIER_PROCESS_ONE);
        if (row.lastPosition == 0) {
            checkComplete(row, callback, prid);
            return;
        }
        /**
         * Обратите внимание, нельзя отправлять пользователю более 1 уведомления в час (3 в сутки).
         * Кроме того, нельзя отправить одному пользователю два уведомления с одинаковым текстом подряд.
         * @see http://vk.com/dev/secure.sendNotification
         */
        sendPositionChanged(row, callback, prid);
    };

    var sendPositionChanged = function (row, callback, prid) {
        var message, pointsText, diff, cases, titles, agoText;
        diff = (row.currentPosition - row.lastPosition);
        cases = [2, 0, 1, 1, 1, 2];
        titles = ['пункт', 'пункта', 'пунктов'];
        // 1 единица:
        // 2,3,4 единицы:
        // 5,6,7 единиц:
        pointsText = titles[(diff % 100 > 4 && diff % 100 < 20) ? 2 : cases[(diff % 10 < 5) ? diff % 10 : 5]];
        agoText = 'Твоя позиция';
        if (row.updated < time() - 60 * 60 * 24 && row.updated > time() - 60 * 60 * 24 * 2) {
            agoText = 'Вчера, твоя позиция';
        }
        if (row.updated < time() - 60 * 60 * 24 * 2) {
            //agoText = (new Date(row.updated * 1000).getDate()) + "." + (new Date(row.updated * 1000).getMonth() + 1) + ' числа, твоя позиция';
        }
        message = agoText + " в рейтинге снизилась на " + diff + " " + pointsText + ". Текущая позиция: " + row.currentPosition + ".";

        SocNet.executeMethod('secure.sendNotification', {
            user_id: row.socNetUserId,
            message: message
        }, function (answer) {
            if (parseInt(answer) == parseInt(row.socNetUserId)) {
                Statistic.add(row.userId, Statistic.ID_NOTIFIER_SUCCESS);
            } else {
                Statistic.add(row.userId, Statistic.ID_NOTIFIER_FAILED);
            }
            Logs.log("Notification(" + ( (parseInt(answer) == parseInt(row.socNetUserId)) ? 'success' : 'failed') + ") " + row.userId.toString() + " : " + message, Logs.LEVEL_NOTIFY);
            row.lastNotify = time();
            checkComplete(row, callback, prid);
        }, true);
    };

    var checkComplete = function (row, callback, prid) {
        var query;
        row.lastCheck = time();
        query = "UPDATE " + tableName + " SET " +
        "lastCheck = " + row.lastCheck +
        ",lastNotify = " + row.lastNotify +
        ",isAppUser = " + row.isAppUser +
        ",lastPosition = " + row.lastPosition +
        " WHERE userId = " + row.userId;
        DB.query(query, function () {
            //console.log('query completed');
            if (prid) {
                Profiler.stop(Profiler.ID_NOTIFIER_PROCESS_ONE, prid);
            }
            callback();
        });
    };
};

/**
 * Константный класс.
 * @type {LogicNotified}
 */
LogicNotifier = new LogicNotifier();