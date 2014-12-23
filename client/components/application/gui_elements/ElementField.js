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
    /* Поле 3х3 */
    this.configure[LogicXO.FIELD_TYPE_3X3] = {
        srcField: '/images/fields/3x3Field.png',
        srcSignX: '/images/fields/3x3SignX.png',
        srcSignO: '/images/fields/3x3SignO.png',
        srcSignClear: '/images/fields/3x3SignClear.png',
        lines: {},
        fieldSize: 3,
        signWidth: 130,
        signHeight: 130,
        padding: 5,
        signOffset: 5,
        winLineSize: 3
    };
    this.configure[LogicXO.FIELD_TYPE_3X3].lines[LogicXO.WIN_LINE_HORIZONTAL] = '/images/fields/3x3LineHorizontal.png';
    this.configure[LogicXO.FIELD_TYPE_3X3].lines[LogicXO.WIN_LINE_VERTICAL] = '/images/fields/3x3LineVertical.png';
    this.configure[LogicXO.FIELD_TYPE_3X3].lines[LogicXO.WIN_LINE_LEFT_TO_UP] = '/images/fields/3x3LineLeftToUp.png';
    this.configure[LogicXO.FIELD_TYPE_3X3].lines[LogicXO.WIN_LINE_LEFT_TO_DOWN] = '/images/fields/3x3LineLeftToDown.png';
    /* Поле 15х15 */
    this.configure[LogicXO.FIELD_TYPE_15X15] = {
        srcField: '/images/fields/15x15Field.png',
        srcSignX: '/images/fields/15x15SignX.png',
        srcSignO: '/images/fields/15x15SignO.png',
        srcSignClear: '/images/fields/15x15SignClear.png',
        lines: {},
        fieldSize: 15,
        signWidth: 26,
        signHeight: 26,
        padding: 0,
        signOffset: 5,
        winLineSize: 5
    };
    this.configure[LogicXO.FIELD_TYPE_15X15].lines[LogicXO.WIN_LINE_HORIZONTAL] = '/images/fields/15x15LineHorizontal.png';
    this.configure[LogicXO.FIELD_TYPE_15X15].lines[LogicXO.WIN_LINE_VERTICAL] = '/images/fields/15x15LineVertical.png';
    this.configure[LogicXO.FIELD_TYPE_15X15].lines[LogicXO.WIN_LINE_LEFT_TO_UP] = '/images/fields/15x15LineLeftToUp.png';
    this.configure[LogicXO.FIELD_TYPE_15X15].lines[LogicXO.WIN_LINE_LEFT_TO_DOWN] = '/images/fields/15x15LineLeftToDown.png';

    /**
     * Тут будут все домы.
     * - поля;
     * - знаки;
     * - линии-побед.
     * @type {{}}
     */
    this.domList = {};

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
        var dom;
        self.domList[typeId] = {};
        dom = GUI.createDom();
        dom.x = self.x;
        dom.y = self.y;
        dom.width = self.width;
        dom.height = self.height;
        dom.backgroundImage = self.configure[typeId].srcField;
        self.domList[typeId].domField = dom;
        self.domList[typeId].domSigns = [];
        for (var y = 0; y < self.configure[typeId].fieldSize; y++) {
            self.domList[typeId].domSigns[y] = [];
            for (var x = 0; x < self.configure[typeId].fieldSize; x++) {
                dom = GUI.createDom();
                dom.x = self.configure[typeId].signOffset + self.x + x * (self.configure[typeId].signWidth + self.configure[typeId].padding);
                dom.y = self.configure[typeId].signOffset + self.y + y * (self.configure[typeId].signHeight + self.configure[typeId].padding );
                dom.width = self.configure[typeId].signWidth;
                dom.height = self.configure[typeId].signHeight;
                dom.pointer = GUI.POINTER_HAND;
                dom.backgroundImage = self.configure[typeId].srcSignClear;
                GUI.bind(dom, GUI.EVENT_MOUSE_CLICK, onSignClick, {x: x, y: y});
                self.domList[typeId].domSigns[y][x] = dom;
            }
        }
        dom = GUI.createDom();
        dom.x = self.x;
        dom.y = self.y;
        dom.width = self.width;
        dom.height = self.height;
        self.domList[typeId].domWinLine = dom;
    };

    /**
     * Покажем поле.
     */
    this.show = function () {
        if (showed == true) return;
        showed = true;
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
        if (showed == false) return;
        showed = false;
        self.domList[fieldTypeId].domField.hide();
        for (var y = 0; y < self.configure[fieldTypeId].fieldSize; y++) {
            for (var x = 0; x < self.configure[fieldTypeId].fieldSize; x++) {
                self.domList[fieldTypeId].domSigns[y][x].hide();
            }
        }
        self.domList[fieldTypeId].domWinLine.hide();
    };

    /**
     * Перерисуем поел.
     */
    this.redraw = function () {
        if (!showed)return;
        self.domList[fieldTypeId].domField.redraw();
        for (var y = 0; y < self.configure[fieldTypeId].fieldSize; y++) {
            for (var x = 0; x < self.configure[fieldTypeId].fieldSize; x++) {
                self.domList[fieldTypeId].domSigns[y][x].redraw();
            }
        }
        if (!winLineId) {
            self.domList[fieldTypeId].domWinLine.hide();
        } else {
            self.domList[fieldTypeId].domWinLine.show();
            self.domList[fieldTypeId].domWinLine.x = this.x + winLineX * (self.configure[fieldTypeId].signWidth + self.configure[fieldTypeId].padding);
            self.domList[fieldTypeId].domWinLine.y = this.y + winLineY * (self.configure[fieldTypeId].signHeight + self.configure[fieldTypeId].padding);
            self.domList[fieldTypeId].domWinLine.backgroundImage = self.configure[fieldTypeId].lines[winLineId];
            switch (winLineId) {
                case LogicXO.WIN_LINE_HORIZONTAL:
                    self.domList[fieldTypeId].domWinLine.width = self.configure[fieldTypeId].signWidth * self.configure[fieldTypeId].winLineSize;
                    self.domList[fieldTypeId].domWinLine.height = self.configure[fieldTypeId].signHeight;
                    break;
                case LogicXO.WIN_LINE_VERTICAL:
                    self.domList[fieldTypeId].domWinLine.width = self.configure[fieldTypeId].signWidth;
                    self.domList[fieldTypeId].domWinLine.height = self.configure[fieldTypeId].signHeight * self.configure[fieldTypeId].winLineSize;
                    break;
                case LogicXO.WIN_LINE_LEFT_TO_UP:
                    self.domList[fieldTypeId].domWinLine.width = self.configure[fieldTypeId].signWidth * self.configure[fieldTypeId].winLineSize;
                    self.domList[fieldTypeId].domWinLine.height = self.configure[fieldTypeId].signHeight * self.configure[fieldTypeId].winLineSize;
                    break;
                case LogicXO.WIN_LINE_LEFT_TO_DOWN:
                    self.domList[fieldTypeId].domWinLine.width = self.configure[fieldTypeId].signWidth * self.configure[fieldTypeId].winLineSize;
                    self.domList[fieldTypeId].domWinLine.height = self.configure[fieldTypeId].signHeight * self.configure[fieldTypeId].winLineSize;
                    break;
            }
        }
        self.domList[fieldTypeId].domWinLine.redraw();
    };

    /**
     * Переключимся на поле соответствующего типа.
     * @param typeId
     */
    this.swithToField = function (typeId) {
        if (fieldTypeId == typeId) return;
        self.hide();
        fieldTypeId = typeId;
        self.show();
        self.redraw();
    };

    /**
     * Установить знак.
     * @param x {Number} координаты x(от нуля)
     * @param y {Number} координаты y(от нуля)
     * @param signId {Number} id знака LogicXO.SIGN_ID_*
     */
    this.setSign = function (x, y, signId) {
        switch (signId) {
            case LogicXO.SIGN_ID_X:
                self.domList[fieldTypeId].domSigns[y][x].backgroundImage = self.configure[fieldTypeId].srcSignX;
                break;
            case LogicXO.SIGN_ID_O:
                self.domList[fieldTypeId].domSigns[y][x].backgroundImage = self.configure[fieldTypeId].srcSignO;
                break;
            case LogicXO.SIGN_ID_Empty:
                self.domList[fieldTypeId].domSigns[y][x].backgroundImage = self.configure[fieldTypeId].srcSignClear;
                break;
            default:
                Logs.log("Undefined signId:", Logs.LEVEL_FATAL_ERROR, signId);
                break;
        }
        self.redraw();
    };

    /**
     * Очистить поле.
     */
    this.clearField = function () {
        self.domList[fieldTypeId].domField.redraw();
        for (var y = 0; y < self.configure[fieldTypeId].fieldSize; y++) {
            for (var x = 0; x < self.configure[fieldTypeId].fieldSize; x++) {
                self.domList[fieldTypeId].domSigns[y][x].backgroundImage = self.configure[fieldTypeId].srcSignClear;
            }
        }
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
        self.onClick.call(null, self.x, self.y);
    };
};