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
    this.WIN_LINE_HORIZONTAL = 1;

    /**
     * Линия победы: вертикальная.
     * @type {number}
     */
    this.WIN_LINE_VERTICAL = 2;

    /**
     * Линия победы: слева и наверх.
     * @type {number}
     */
    this.WIN_LINE_LEFT_TO_UP = 3;

    /**
     * Линия победы: слева и во вниз.
     * @type {number}
     */
    this.WIN_LINE_LEFT_TO_DOWN = 4;

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
     * @param creatorUserId {object}
     * @param creatorSignId {number}
     * @param fieldTypeId {number}
     * @param isRandom {boolean}
     * @param isInvitation {boolean}
     * @param vsRobot {boolean}
     * @returns {{creatorUserId: (fields.id|*|id|user.id|LogicUser.getUserById.id|string), joinerUserId: number, creatorSignId: *, joinerSignId: number, fieldTypeId: *, isRandom: *, isInvitation: *, vsRobot: *, XUserId: number, OUserId: number, turnId: number, result_field: string, status: number, winnerId: number}}
     */
    this.create = function (creatorUserId, creatorSignId, fieldTypeId, isRandom, isInvitation, vsRobot) {
        var field;
        field = createField(fieldTypeId);
        return {
            creatorUserId: creatorUserId,
            joinerUserId: 0,
            creatorSignId: creatorSignId,
            joinerSignId: 0,
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
        }
    };

    /**
     * Присоединить игрока к игре.
     */
    this.joinGame = function (joinerUserId, joinerSignId, game) {
        game.joinerUserId = joinerUserId;
        game.joinerSignId = joinerSignId;
        return game;
    };

    /**
     * Выставить знаки согласно параметами игры.
     * @param game
     * @returns {*}
     */
    this.setSigns = function (game) {
        /* Оба не имеют запрашиваемые знаки */
        if (game.creatorSignId == LogicXO.SIGN_ID_Empty && game.joinerSignId == LogicXO.SIGN_ID_Empty) {
            if (Math.round(Math.random() * 2) > 1) {
                game.XUserId = game.creatorUserId;
                game.OUserId = game.joinerUserId;
            } else {
                game.XUserId = game.joinerUserId;
                game.OUserId = game.creatorUserId;
            }
        }
        /* Оба нимеют запрашиваемые знаки */
        if (game.creatorSignId != LogicXO.SIGN_ID_Empty && game.joinerSignId != LogicXO.SIGN_ID_Empty) {
            game.XUserId = (game.creatorSignId == LogicXO.SIGN_ID_X) ? game.creatorUserId : game.joinerUserId;
            game.OUserId = (game.joinerUserId == LogicXO.SIGN_ID_O) ? game.joinerUserId : game.creatorUserId;
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
        /* Только приглашенный имеет знак*/
        if (game.creatorSignId == LogicXO.SIGN_ID_Empty && game.joinerSignId != LogicXO.SIGN_ID_Empty) {
            if (game.joinerSignId == LogicXO.SIGN_ID_X) {
                game.XUserId = game.joinerUserId;
                game.OUserId = game.creatorUserId;
            } else {
                game.XUserId = game.creatorUserId;
                game.OUserId = game.joinerUserId;
            }
        }
        if (!game.XUserId || !game.OUserId) {
            Logs.log("Не удалось установить участников", Logs.LEVEL_FATAL_ERROR, game);
        }
        return game;
    };

    /**
     * Запустить игру.
     * @param game
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
     * @param game {Object} объект игры
     * @param userId {Number} id юзера
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
    this.userCandDoMove = function (game, userId, x, y) {
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
     * Перевернем текущий знак
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
    }
};
/**
 * Статичный класс.
 * @type {LogicXO}
 */
LogicXO = new LogicXO();