LogicGameLookers = function () {

    var data = {};

    this.add = function (gameId, userId) {
        if (!data[gameId]) {
            data[gameId] = {};
        }
        data[gameId][userId] = userId;
    };

    this.delete = function (gameId, userId) {
        var count;
        delete data[gameId][userId];
        count = 0;
        for (var userId in data[gameId]) {
            count++;
        }
        if (count == 0) {
            delete data[gameId];
        }
    };

    this.get = function (gameId) {
        if (data[gameId]) {
            return data[gameId];
        } else {
            return {};
        }
    };
};

/**
 * ����������� �����.
 * @type {LogicGameLookers}
 */
LogicGameLookers = new LogicGameLookers();