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
    this.createGame = function (creatorUserId, creatorSignId, fieldTypeId, isRandom, isInvitation, vsRobot) {
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
     * @param user {Object}
     */
    this.isHisTurn = function (game, user) {
        if (user.id == game.XUserId && game.turnId == LogicXO.SIGN_ID_X)return true;
        if (user.id == game.OUserId && game.turnId == LogicXO.SIGN_ID_O)return true;
        return false;
    };
};
/**
 * Статичный класс.
 * @type {LogicXO}
 */
LogicXO = new LogicXO();