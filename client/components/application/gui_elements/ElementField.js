/**
 * Элемент игровое поле.
 * @constructor
 */
ElementField = function () {
    var self = this;

    /**
     * Показывать ли элемент.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Координата X игровое поле.
     * @type {number}
     */
    this.x = 0;

    /**
     * Координата Y игровое поле.
     * @type {number}
     */
    this.y = 0;

    /**
     * Ширина игровое поле.
     * @type {number}
     */
    this.width = 0;

    /**
     * Высота игровое поле.
     * @type {number}
     */
    this.height = 0;

    /**
     * Графические сеттингы для полей разных типов.
     * @type {Array}
     */
    this.configure = [];

    /**
     * Тип поля.
     * @see LogicXO.FIELD_TYPE_*
     * @type {Number}
     */
    var fieldTypeId = null;

    var currentConfigure = null;

    /**
     * Текущая победная линия,
     * если не установлено - то линия не отображается.
     * @type {Number|null}
     */
    var winLineId = null;

    /**
     * Коодинаты(x) победной линии. от нуля.
     * @type {Number}
     */
    var winLineX = 0;

    /**
     * Коодинаты(y) победной линии. от нуля.
     * @type {Number}
     */
    var winLineY = 0;

    /**
     * Вызывается при нажатии на поле.
     * @type {function}
     */
    this.onClick = null;

    var lastMove;

    /* Поле 3х3 */
    this.configure[LogicXO.FIELD_TYPE_3X3] = {
        srcField: '/images/fields/3x3Field.png',
        srcSignX: '/images/fields/3x3SignX.png',
        srcSignXLastMove: '/images/fields/3x3SignX.png',
        srcSignO: '/images/fields/3x3SignO.png',
        srcSignOLastMove: '/images/fields/3x3SignO.png',
        srcSignClear: '/images/fields/3x3SignClear.png',
        lines: {},
        fieldSize: 3,
        signWidth: 130,
        signHeight: 130,
        padding: 5,
        lineOffset: 5,
        signOffsetX: 5,
        signOffsetY: 5,
        winLineSize: 3
    };
    this.configure[LogicXO.FIELD_TYPE_3X3].lines[LogicXO.LINE_HORIZONTAL] = '/images/fields/3x3LineHorizontal.png';
    this.configure[LogicXO.FIELD_TYPE_3X3].lines[LogicXO.LINE_VERTICAL] = '/images/fields/3x3LineVertical.png';
    this.configure[LogicXO.FIELD_TYPE_3X3].lines[LogicXO.LINE_LEFT_UP] = '/images/fields/3x3LineLeftToUp.png';
    this.configure[LogicXO.FIELD_TYPE_3X3].lines[LogicXO.LINE_LEFT_DOWN] = '/images/fields/3x3LineLeftToDown.png';

    /* Поле 15х15 */
    this.configure[LogicXO.FIELD_TYPE_15X15] = {
        srcField: '/images/fields/15x15Field.png',
        srcSignX: '/images/fields/15x15SignX.png',
        srcSignXLastMove: '/images/fields/15x15SignXLastMove.png',
        srcSignO: '/images/fields/15x15SignO.png',
        srcSignOLastMove: '/images/fields/15x15SignOLastMove.png',
        srcSignClear: '/images/fields/15x15SignClear.png',
        lines: {},
        fieldSize: 15,
        /*131 126*/
        /*127 117*/
        signWidth: 26,
        signHeight: 26,
        padding: 0,
        lineOffset: 5,
        signOffsetX: 5,
        signOffsetY: 5,
        winLineSize: 5
    };
    this.configure[LogicXO.FIELD_TYPE_15X15].lines[LogicXO.LINE_HORIZONTAL] = '/images/fields/15x15LineHorizontal.png';
    this.configure[LogicXO.FIELD_TYPE_15X15].lines[LogicXO.LINE_VERTICAL] = '/images/fields/15x15LineVertical.png';
    this.configure[LogicXO.FIELD_TYPE_15X15].lines[LogicXO.LINE_LEFT_UP] = '/images/fields/15x15LineLeftToUp.png';
    this.configure[LogicXO.FIELD_TYPE_15X15].lines[LogicXO.LINE_LEFT_DOWN] = '/images/fields/15x15LineLeftToDown.png';

    ElementField.getConfigure = function (type) {
        return self.configure[type];
    };

    /**
     * Тут будут все домы.
     * - поля;
     * - знаки;
     * - линии-побед.
     * @type {{}}
     */
    this.domList = {};

    /**
     * Абстрактные данные поля.
     * @type {{}}
     */
    this.field = {};

    /**
     * Создает домы полей всех типов.
     * т.е. 3х3 и 15х15.
     */
    this.init = function () {
        /* Поле 3 х 3 */
        initFieldByTypeId(LogicXO.FIELD_TYPE_3X3);
        /* Поле 15 х 15 */
        initFieldByTypeId(LogicXO.FIELD_TYPE_15X15);
    };

    /**
     * Инициализирует поле с указанным типом.
     * @param typeId
     */
    var initFieldByTypeId = function (typeId) {
        var dom, cfg;
        cfg = self.configure[typeId];
        self.domList[typeId] = {};
        self.field[typeId] = [];
        dom = GUI.createDom();
        dom.x = self.x;
        dom.y = self.y;
        dom.backgroundImage = cfg.srcField;
        self.domList[typeId].domField = dom;
        self.domList[typeId].domSigns = [];
        for (var y = 0; y < cfg.fieldSize; y++) {
            self.domList[typeId].domSigns[y] = [];
            self.field[typeId][y] = [];
            for (var x = 0; x < cfg.fieldSize; x++) {
                dom = GUI.createDom();
                dom.x = cfg.signOffsetX + self.x + x * (cfg.signWidth + cfg.padding);
                dom.y = cfg.signOffsetY + self.y + y * (cfg.signHeight + cfg.padding);
                dom.pointer = GUI.POINTER_HAND;
                dom.backgroundImage = cfg.srcSignClear;
                GUI.bind(dom, GUI.EVENT_MOUSE_CLICK, onSignClick, {x: x, y: y});
                GUI.bind(dom, GUI.EVENT_MOUSE_OVER, onMouseOver, {dom: dom, x: x, y: y});
                GUI.bind(dom, GUI.EVENT_MOUSE_OUT, onMouseOut, {dom: dom, x: x, y: y});
                self.domList[typeId].domSigns[y][x] = dom;
                self.field[typeId][y][x] = LogicXO.SIGN_ID_Empty;
            }
        }
        dom = GUI.createDom();
        dom.x = self.x;
        dom.y = self.y;
        self.domList[typeId].domWinLine = dom;
    };

    /**
     * Покажем поле.
     */
    this.show = function () {
        if (showed == true) {
            return;
        }
        showed = true;
        showByFieldTypeId(fieldTypeId);
        self.redraw();
    };

    var showByFieldTypeId = function (fieldTypeId) {
        if (!fieldTypeId) {
            return;
        }
        self.domList[fieldTypeId].domField.show();
        for (var y = 0; y < self.configure[fieldTypeId].fieldSize; y++) {
            for (var x = 0; x < self.configure[fieldTypeId].fieldSize; x++) {
                self.domList[fieldTypeId].domSigns[y][x].show();
            }
        }
        self.domList[fieldTypeId].domWinLine.show();
        self.redraw();
    };

    /**
     * Спрячем поле.
     */
    this.hide = function () {
        if (showed == false) {
            return;
        }
        showed = false;
        hideByFieldTypeId(fieldTypeId);
    };

    var hideByFieldTypeId = function (fieldTypeId) {
        if (!fieldTypeId) {
            return;
        }
        self.domList[fieldTypeId].domField.hide();
        for (var y = 0; y < self.configure[fieldTypeId].fieldSize; y++) {
            for (var x = 0; x < self.configure[fieldTypeId].fieldSize; x++) {
                self.domList[fieldTypeId].domSigns[y][x].hide();
            }
        }
        self.domList[fieldTypeId].domWinLine.hide();
    };
    /**
     * Перерисуем поле.
     */
    this.redraw = function () {
        var domList;
        if (focusedCell) {
            var game = LogicGame.getCurrentGame();
            var user = LogicUser.getCurrentUser();
            if (LogicXO.isHisTurn(game, user.id) && self.field[fieldTypeId][focusedCell.y][focusedCell.x] == LogicXO.SIGN_ID_Empty) {
                animateFadeIn(game.turnId, focusedCell.dom);
            } else {
                focusedCell.dom.animateStop();
                focusedCell = null;
            }
        }
        if (!showed) return;
        domList = self.domList[fieldTypeId];
        domList.domField.redraw();
        for (var y = 0; y < currentConfigure.fieldSize; y++) {
            for (var x = 0; x < currentConfigure.fieldSize; x++) {
                domList.domSigns[y][x].redraw();
            }
        }
        if (!winLineId) {
            domList.domWinLine.hide();
        } else {
            domList.domWinLine.show();
            domList.domWinLine.x = self.x + currentConfigure.lineOffset + winLineX * (currentConfigure.signWidth + currentConfigure.padding);
            domList.domWinLine.y = self.y + currentConfigure.lineOffset + winLineY * (currentConfigure.signHeight + currentConfigure.padding);
            domList.domWinLine.backgroundImage = currentConfigure.lines[winLineId];
            switch (winLineId) {
                case LogicXO.LINE_HORIZONTAL:
                    domList.domWinLine.width = currentConfigure.signWidth * currentConfigure.winLineSize;
                    domList.domWinLine.height = currentConfigure.signHeight;
                    break;
                case LogicXO.LINE_VERTICAL:
                    domList.domWinLine.width = currentConfigure.signWidth;
                    domList.domWinLine.height = currentConfigure.signHeight * currentConfigure.winLineSize;
                    break;
                case LogicXO.LINE_LEFT_UP:
                    domList.domWinLine.width = currentConfigure.signWidth * currentConfigure.winLineSize;
                    domList.domWinLine.height = currentConfigure.signHeight * currentConfigure.winLineSize;
                    break;
                case LogicXO.LINE_LEFT_DOWN:
                    domList.domWinLine.width = currentConfigure.signWidth * currentConfigure.winLineSize;
                    domList.domWinLine.height = currentConfigure.signHeight * currentConfigure.winLineSize;
                    break;
            }
        }
        domList.domWinLine.redraw();
    };

    /**
     * Переключимся на поле соответствующего типа.
     * @param typeId {Number} LogicXO.FIELD_TYPE_*
     */
    this.switchToField = function (typeId) {
        if (fieldTypeId == typeId) {
            return;
        }
        /* Тут еще старый fieldId. */
        hideByFieldTypeId(fieldTypeId);
        fieldTypeId = typeId;
        currentConfigure = self.configure[fieldTypeId];
        showByFieldTypeId(fieldTypeId);
    };

    this.setLastMove = function (coords) {
        lastMove = {x: coords.x, y: coords.y};
    };

    /**
     * Установить знак.
     * @param x {Number} координаты x(от нуля)
     * @param y {Number} координаты y(от нуля)
     * @param signId {Number} id знака LogicXO.SIGN_ID_*
     */
    this.setSign = function (x, y, signId) {
        var src, domSign, isItLast;
        domSign = self.domList[fieldTypeId].domSigns[y][x];
        isItLast = lastMove && lastMove.x == x && lastMove.y == y;
        if (signId == LogicXO.SIGN_ID_X && isItLast) src = currentConfigure.srcSignXLastMove;
        if (signId == LogicXO.SIGN_ID_X && !isItLast) src = currentConfigure.srcSignX;
        if (signId == LogicXO.SIGN_ID_O && isItLast) src = currentConfigure.srcSignOLastMove;
        if (signId == LogicXO.SIGN_ID_O && !isItLast) src = currentConfigure.srcSignO;
        if (signId == LogicXO.SIGN_ID_Empty) src = currentConfigure.srcSignClear;
        if (!src) {
            Logs.log("Undefined signId:", Logs.LEVEL_FATAL_ERROR, signId);
        }
        domSign.backgroundImage = src;
        domSign.animateStop();
        domSign.opacity = 1.0;
        self.field[fieldTypeId][y][x] = signId;
    };

    /**
     * Очистить поле.
     */
    this.clearField = function () {
        for (var y = 0; y < currentConfigure.fieldSize; y++) {
            for (var x = 0; x < currentConfigure.fieldSize; x++) {
                self.domList[fieldTypeId].domSigns[y][x].backgroundImage = currentConfigure.srcSignClear;
                self.field[fieldTypeId][y][x] = LogicXO.SIGN_ID_Empty;
            }
        }
        lastMove = null;
        winLineId = null;
        winLineX = 0;
        winLineY = 0;
    };

    /**
     * Установить выигрышную линию.
     * @param x
     * @param y
     * @param lineId
     */
    this.setWinLine = function (x, y, lineId) {
        winLineId = lineId;
        winLineX = x;
        winLineY = y;
        self.redraw();
    };

    /**
     * Обработчки нажатий на поля.
     */
    var onSignClick = function () {
        /* this тут - это объект с полями x и y, этот контест должен быть присвоин во время биндингом эвента. */
        self.onClick.call(null, this.x, this.y);
    };

    var focusedCell;
    /**
     * При вхождении курсора в ячейку знака, анимируем "проявление", если надо.
     */
    var onMouseOver = function () {
        var game, user;
        if (self.field[fieldTypeId][this.y][this.x] != LogicXO.SIGN_ID_Empty) {
            return;
        }
        focusedCell = this;
        game = LogicGame.getCurrentGame();
        user = LogicUser.getCurrentUser();
        if (LogicXO.isHisTurn(game, user.id)) {
            animateFadeIn(game.turnId, this.dom);
        }
    };

    var animateFadeIn = function (signId, dom) {
        if (signId == LogicXO.SIGN_ID_X) {
            dom.backgroundImage = currentConfigure.srcSignX;
        } else {
            dom.backgroundImage = currentConfigure.srcSignO;
        }
        if (fieldTypeId == LogicXO.FIELD_TYPE_3X3) {
            dom.animateOpacity(0.21, 0.18, 20);
        }
        if (fieldTypeId == LogicXO.FIELD_TYPE_15X15) {
            dom.animateOpacity(0.52, 0.21, 20);
        }
        dom.redraw();
    };

    /**
     * При ухода курсора со знака, анимируем затимнение, если надо.
     */
    var onMouseOut = function () {
        focusedCell = null;
        if (self.field[fieldTypeId][this.y][this.x] != LogicXO.SIGN_ID_Empty) {
            return;
        }
        this.dom.animateOpacity(0.00, this.dom.opacity, 12);
    };
};
