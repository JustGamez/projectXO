/**
 * Логика непосредственно игры Х-О :)
 * @constructor
 */
LogicXO = function () {
    var self = this;

    /**
     * Тип поля 3 на 3.
     * @type {number}
     */
    this.FIELD_TYPE_3X3 = 1;

    /**
     * Тип поля 15 на 15.
     * @type {number}
     */
    this.FIELD_TYPE_15X15 = 2;

    /**
     * Линия победы: горизонтальная.
     * @type {number}
     */
    this.LINE_HORIZONTAL = 1;

    /**
     * Линия победы: вертикальная.
     * @type {number}
     */
    this.LINE_VERTICAL = 2;

    /**
     * Линия победы: слева и наверх.
     * @type {number}
     */
    this.LINE_LEFT_UP = 3;

    /**
     * Линия победы: слева и во вниз.
     * @type {number}
     */
    this.LINE_LEFT_DOWN = 4;

    /**
     * id всех линий.
     * @type {*[]}
     */
    this.lineIds = [self.LINE_HORIZONTAL, self.LINE_VERTICAL, self.LINE_LEFT_DOWN, self.LINE_LEFT_UP];

    /**
     * Id знака крестик.
     * @type {number}
     */
    this.SIGN_ID_X = 1;

    /**
     * Id знака нулик.
     * @type {number}
     */
    this.SIGN_ID_O = 2;

    /**
     * Id знака - нет знака.
     * @type {number}
     */
    this.SIGN_ID_Empty = 3;

    /**
     * Игра создана и ждёт подключение оппонента.
     * @type {number}
     */
    this.STATUS_WAIT = 1;

    /**
     * Игра запущена, идёт игра.
     * @type {number}
     */
    this.STATUS_RUN = 2;

    /**
     * Игра закрыта до результата. Видимо кто-то вышел из игры.
     * @type {number}
     */
    this.STATUS_CLOSED = 3;

    /**
     * Кто то выиграл.
     * @type {number}
     */
    this.STATUS_SOMEBODY_WIN = 4;

    /**
     * Никто не выиграл.
     * @type {number}
     */
    this.STATUS_NOBODY_WIN = 5;

    /**
     * Создать игру.
     * @param creatorUserId {object} внутрений id пользователя создающего игру.
     * @param creatorSignId {number} id запрашиваемого создателем игры знака, LogicXO.SIGN_ID_*
     * @param fieldTypeId {number} id типа поля, LogicXO.FIELD_TYPE_*
     * @param isRandom {boolean} true - если это случайная игра.
     * @param isInvitation {boolean} true - если игра по приглашению
     * @param vsRobot {boolean} true - если игра с роботом.
     * @returns {{creatorUserId: (fields.id|*|id|user.id|LogicUser.getUserById.id|string), joinerUserId: number, creatorSignId: *, joinerSignId: number, fieldTypeId: *, isRandom: *, isInvitation: *, vsRobot: *, XUserId: number, OUserId: number, turnId: number, result_field: string, status: number, winnerId: number}}
     */
    this.create = function (creatorUserId, creatorSignId, fieldTypeId, isRandom, isInvitation, vsRobot) {
        var field;
        field = createField(fieldTypeId);
        return {
            creatorUserId: creatorUserId,
            joinerUserId: 0,
            creatorSignId: creatorSignId,
            joinerSignId: vsRobot ? LogicXO.SIGN_ID_Empty : 0,
            fieldTypeId: fieldTypeId,
            isRandom: (isRandom) ? 1 : 0,
            isInvitation: (isInvitation) ? 1 : 0,
            vsRobot: (vsRobot) ? 1 : 0,
            XUserId: 0,
            OUserId: 0,
            turnId: LogicXO.SIGN_ID_X,
            result_field: '',
            status: LogicXO.STATUS_WAIT,
            winnerId: 0,
            field: field
        };
    };

    /**
     * Создадим поле.
     * @param fieldTypeId тип поля.
     */
    var createField = function (fieldTypeId) {
        var fieldSize, field;
        fieldSize = self.getFieldSize(fieldTypeId);
        field = [];
        for (var y = 0; y < fieldSize; y++) {
            field[y] = [];
            for (var x = 0; x < fieldSize; x++) {
                field[y][x] = LogicXO.SIGN_ID_Empty;
            }
        }
        return field;
    };

    /**
     * Вернуть размер поля по типу поля.
     * @param fieldTypeId LogicXO.FIELD_TYPE_*
     * @returns {number}
     */
    this.getFieldSize = function (fieldTypeId) {
        switch (fieldTypeId) {
            case LogicXO.FIELD_TYPE_3X3:
                return 3;
                break;
            case LogicXO.FIELD_TYPE_15X15:
                return 15;
                break;
            default:
                Logs.log("Undefined field type id. (" + fieldTypeId + ")", Logs.LEVEL_ERROR);
                return 0;
                break;
        }
    };

    /**
     * Вернуть размер линии победы по типу поля.
     * @param fieldTypeId LogicXO.FIELD_TYPE_*
     * @returns {number}
     */
    this.getLineSize = function (fieldTypeId) {
        switch (fieldTypeId) {
            case LogicXO.FIELD_TYPE_3X3:
                return 3;
                break;
            case LogicXO.FIELD_TYPE_15X15:
                return 5;
                break;
        }
    };

    /**
     * Присоединить игрока к игре.
     * @param joinerUserId {Number} внутрений id игрока, присоединяемого к игре.
     * @param joinerSignId {Number} id знака запрашиваемого присоединяемым игроком, LogicXO.SIGN_ID_*.
     * @param game {Object} собсвтенно игра.
     * @returns {*}
     */
    this.joinGame = function (joinerUserId, joinerSignId, game) {
        game.joinerUserId = joinerUserId;
        game.joinerSignId = joinerSignId;
        return game;
    };

    /**
     * Выставить знаки согласно параметрам игры.
     * @param game {Object}
     * @returns {*}
     */
    this.chooseSigns = function (game) {
        /* Оба не имеют запрашиваемых знаков. */
        if (game.creatorSignId == LogicXO.SIGN_ID_Empty && game.joinerSignId == LogicXO.SIGN_ID_Empty) {
            if (Math.round(Math.random() * 2) > 1) {
                game.XUserId = game.creatorUserId;
                game.OUserId = game.joinerUserId;
            } else {
                game.XUserId = game.joinerUserId;
                game.OUserId = game.creatorUserId;
            }
        }
        /* Оба имеют запрашиваемых знаков. */
        if (game.creatorSignId != LogicXO.SIGN_ID_Empty && game.joinerSignId != LogicXO.SIGN_ID_Empty) {
            /* Тут немного хитро, мы пологаем что одинаковые знаки не придут к нам. */
            if (game.creatorSignId == LogicXO.SIGN_ID_X) {
                game.XUserId = game.creatorUserId;
                game.OUserId = game.joinerUserId;
            } else {
                game.XUserId = game.joinerUserId;
                game.OUserId = game.creatorUserId;
            }
        }
        /* Только создатель имеет знак */
        if (game.creatorSignId != LogicXO.SIGN_ID_Empty && game.joinerSignId == LogicXO.SIGN_ID_Empty) {
            if (game.creatorSignId == LogicXO.SIGN_ID_X) {
                game.XUserId = game.creatorUserId;
                game.OUserId = game.joinerUserId;
            } else {
                game.XUserId = game.joinerUserId;
                game.OUserId = game.creatorUserId;
            }
        }
        /* Только приглашенный имеет знак */
        if (game.creatorSignId == LogicXO.SIGN_ID_Empty && game.joinerSignId != LogicXO.SIGN_ID_Empty) {
            if (game.joinerSignId == LogicXO.SIGN_ID_X) {
                game.XUserId = game.joinerUserId;
                game.OUserId = game.creatorUserId;
            } else {
                game.XUserId = game.creatorUserId;
                game.OUserId = game.joinerUserId;
            }
        }
        if (!game.vsRobot && (!game.XUserId || !game.OUserId)) {
            Logs.log("Не удалось установить участников. Игра без робота.", Logs.LEVEL_FATAL_ERROR, game);
        }
        if (game.vsRobot && (!(game.XUserId > 0 && game.OUserId == 0) && !(game.XUserId == 0 && game.OUserId > 0))) {
            Logs.log("Не удалось установить участников. Игра с роботом.", Logs.LEVEL_FATAL_ERROR, game);
        }
        return game;
    };

    /**
     * Запустить игру.
     * @param game {Object}
     * @returns {*}
     */
    this.run = function (game) {
        game.status = LogicXO.STATUS_RUN;
        return game;
    };

    /**
     * Возвращает true если ход переданного игрока.
     * @param game {Object}
     * @param userId {Object}
     */
    this.isHisTurn = function (game, userId) {
        if (userId == game.XUserId && game.turnId == LogicXO.SIGN_ID_X) return true;
        if (userId == game.OUserId && game.turnId == LogicXO.SIGN_ID_O) return true;
        return false;
    };

    /**
     * Является ли игрок участником игры.
     * @param game {Object} объект игры.
     * @param userId {Number} id игрока.
     */
    this.isMember = function (game, userId) {
        if (game.creatorUserId == userId) return true;
        if (game.joinerUserId == userId) return true;
        return false;
    };

    /**
     * Может ли пользователь закрыть игру.
     * Игру можно закрыть, только если пользователь является участником игры и игра находиться в стаусе WAIT или RUN.
     * @param game {Object} объект игры.
     * @param userId {Number} id юзера.
     */
    this.userCanCloseGame = function (game, userId) {
        if (
            self.isMember(game, userId) &&
            (game.status == LogicXO.STATUS_WAIT || game.status == LogicXO.STATUS_RUN)) {
            return true;
        }
        return false;
    };

    /**
     * Закроем игру.
     * @param game {Object} объект игры.
     */
    this.close = function (game) {
        game.status = LogicXO.STATUS_CLOSED;
        return game;
    };

    /**
     * Может ли пользователь сделать ход.
     * @param game {Object}
     * @param userId {Number}
     * @param x {Number}
     * @param y {Number}
     */
    this.userCanDoMove = function (game, userId, x, y) {
        var fieldSize;
        if (!LogicXO.isMember(game, userId)) return false;
        if (!LogicXO.isHisTurn(game, userId)) return false;
        if (game.status != LogicXO.STATUS_RUN) return false;
        fieldSize = LogicXO.getFieldSize(game.fieldTypeId);
        if (x < 0) return false;
        if (x >= fieldSize) return false;
        if (y < 0) return false;
        if (y >= fieldSize) return false;
        if (game.field[y][x] != LogicXO.SIGN_ID_Empty) return false;
        return true;
    };

    /**
     * Установим текущий знак.
     * @param game {Object}
     * @param x {Number}
     * @param y {Number}
     * @returns {*}
     */
    this.setSign = function (game, x, y) {
        game.field[y][x] = game.turnId;
        return game;
    };

    /**
     * Перевернем текущий знак.
     * @param game {Object}
     * @returns {*}
     */
    this.switchTurn = function (game) {
        switch (game.turnId) {
            case LogicXO.SIGN_ID_X:
                game.turnId = LogicXO.SIGN_ID_O;
                break;
            case LogicXO.SIGN_ID_O:
                game.turnId = LogicXO.SIGN_ID_X;
                break;
            default:
                Logs.log("Can't switch turn, because unexpected game.turnId value have.", Logs.LEVEL_WARNING, game);
                break;
        }
        return game;
    };

    /**
     * Найти линию победы, если она конечно есть.
     * @param game {Object}
     */
    this.findWinLine = function (game) {
        Profiler.start(Profiler.LOGIC_XO_FIND_WIN_LINE);
        var fieldSize, lineSize, lineIds, loseLinesCount, winnerLineId, lastResult, res;
        fieldSize = LogicXO.getFieldSize(game.fieldTypeId);
        lineSize = LogicXO.getLineSize(game.fieldTypeId);

        lineIds = [LogicXO.LINE_HORIZONTAL, LogicXO.LINE_VERTICAL, LogicXO.LINE_LEFT_DOWN, LogicXO.LINE_LEFT_UP];
        loseLinesCount = 0;
        winnerLineId = 0;
        lastResult = false;

        for (var y = 0; y < fieldSize; y++) {
            for (var x = 0; x < fieldSize; x++) {
                for (var lineId in lineIds) {
                    res = false;
                    res = __findWinLine(game.field, x, y, lineSize, lineIds[lineId]);
                    if (res) {
                        if (res.isLosed) loseLinesCount++;
                        if (res.signId) {
                            lastResult = res;
                        }
                    }
                }
            }
        }
        /* Нет выигрывших, нет проигравших */
        var result = {
            noBodyWin: false,
            someBodyWin: false,
            signId: 0,
            lineId: 0,
            x: 0,
            y: 0
        };
        /* Если найден хотя бы один результат */
        if (lastResult) {
            result = {
                noBodyWin: false,
                someBodyWin: true,
                signId: lastResult.signId,
                lineId: lastResult.lineId,
                x: lastResult.x,
                y: lastResult.y
            };
        }
        /* Может быть ничья */
        if (game.fieldTypeId == LogicXO.FIELD_TYPE_3X3 && loseLinesCount == lineSize * 2 + 2) {
            result.noBodyWin = true;
        }
        Profiler.stop(Profiler.LOGIC_XO_FIND_WIN_LINE);
        return result;
    };

    /**
     * Найти линию-победы в заданных координатах и с задонным типом.
     * @param field {Array} поле, вида field[y][x] = LogicXO.SIGN_ID_*.
     * @param startX {Number} начальная X координаты линии-победы.
     * @param startY {Number} начальная Y координаты линии-победы.
     * @param lineSize {Number} длина линии-победы.
     * @param lineId {Number} id линии-победы, LogicXO.WIN_LINE_*.
     * @private
     */
    var __findWinLine = function (field, startX, startY, lineSize, lineId) {
        var x, y, Xcnt, Ocnt, isLosed, points, lastPoint, signId, vector;
        x = startX;
        y = startY;
        Xcnt = Ocnt = 0;
        isLosed = false;
        points = [];
        signId = 0;
        vector = LogicXO.getLineVector(lineId);
        if (!vector)return;
        switch (lineId) {
            case LogicXO.LINE_HORIZONTAL:
                if (field[startY][startX + (lineSize - 1)] == undefined) return false;
                break;
            case LogicXO.LINE_VERTICAL:
                if (field[startY + (lineSize - 1)] == undefined) return false;
                break;
            case LogicXO.LINE_LEFT_UP:
                if (field[startY - (lineSize - 1)] == undefined) return false;
                if (field[startY][startX + (lineSize - 1)] == undefined) return false;
                break;
            case LogicXO.LINE_LEFT_DOWN:
                if (field[startY + (lineSize - 1)] == undefined) return false;
                if (field[startY][startX + (lineSize - 1)] == undefined) return false;
                break;
            default:
                Logs.log("LogicXO.__findWinLine. Undefined lineId.", Logs.LEVEL_WARNING, lineId);
                return false;
                break;
        }
        for (var offset = 0; offset < lineSize; offset++) {
            if (field[y] [x] == LogicXO.SIGN_ID_X) Xcnt++;
            if (field[y] [x] == LogicXO.SIGN_ID_O) Ocnt++;
            points.push({x: x, y: y});
            x += vector.x;
            y += vector.y;
        }
        if (Xcnt == lineSize) {
            signId = LogicXO.SIGN_ID_X;
        }
        if (Ocnt == lineSize) {
            signId = LogicXO.SIGN_ID_O;
        }
        if (Ocnt != 0 && Xcnt != 0) isLosed = true;
        if (lineId == LogicXO.LINE_LEFT_UP) startY -= ( lineSize - 1 );
        return {
            lineId: lineId,
            isLosed: isLosed,
            signId: signId,
            x: startX,
            y: startY
        };
    };

    /**
     * Возвращает вектор с длиной 1, для линии.
     * @param lineId id линии. DataGame.LINE_*
     * @param direction направление true - A, false - B.
     */
    this.getLineVector = function (lineId, direction) {
        var vector;
        switch (lineId) {
            case LogicXO.LINE_HORIZONTAL:
                vector = {x: 1, y: 0};
                break;
            case LogicXO.LINE_VERTICAL:
                vector = {x: 0, y: 1};
                break;
            case LogicXO.LINE_LEFT_UP:
                vector = {x: 1, y: -1};
                break;
            case LogicXO.LINE_LEFT_DOWN:
                vector = {x: 1, y: 1};
                break;
            default:
                Logs.log("LogicXO.getLineVector. undefined lineId:" + lineId, Logs.LEVEL_ERROR);
                return false;
                break;
        }
        if (direction) {
            vector.x *= -1;
            vector.y *= -1;
        }
        return vector;
    };

    /**
     * Тут мы установим линию-победы.
     * И соответствующий статус.
     * Либо установим ниьчю, для этой игры.
     * @param game {Object}
     * @param winLine {Object}
     */
    this.setOutcomeResults = function (game, winLine) {
        game.outcomeResults = winLine;
        if (winLine.noBodyWin) {
            game.status = LogicXO.STATUS_NOBODY_WIN;
        }
        if (winLine.someBodyWin) {
            game.status = LogicXO.STATUS_SOMEBODY_WIN;
            if (winLine.signId == LogicXO.SIGN_ID_X) {
                game.winnerId = game.XUserId;
            }
            if (winLine.signId == LogicXO.SIGN_ID_O) {
                game.winnerId = game.OUserId;
            }
        }
        return game;
    };

    /**
     * Проверяет находятся ли координаты вне поля.
     * @param fieldSize {Number}
     * @param x {Number}
     * @param y {Number}
     * @returns {boolean}
     */
    this.notInField = function (x, y, fieldSize) {
        if (x < 0) return true;
        if (x >= fieldSize) return true;
        if (y < 0) return true;
        if (y >= fieldSize) return true;
        return false;
    };

    /**
     * Вернёт противоположный знак.
     * @param signId {Number} LogicXO.SIGN_ID_*
     */
    this.getOppositeSignId = function (signId) {
        switch (signId) {
            case LogicXO.SIGN_ID_X:
                return LogicXO.SIGN_ID_O;
                break;
            case LogicXO.SIGN_ID_O:
                return LogicXO.SIGN_ID_X;
                break;
            default:
                Logs.log("LogicXO.getOppositeSignId. Undefined Sign Id." + signId, Logs.LEVEL_ERROR);
                break;
        }
    };
    /**
     * Возвращает id оппонента.
     * @param game {Object}
     * @param userId {int} внутрений id пользователя.
     */
    this.getOpponentUserId = function (game, userId) {
        if (game.XUserId == userId) {
            return game.OUserId;
        }
        if (game.OUserId == userId) {
            return game.XUserId;
        }
        return false;
    };
};
/**
 * Статичный класс.
 * @type {LogicXO}
 */
LogicXO = new LogicXO();