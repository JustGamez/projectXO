/**
 * Логика непосредственно игры Х-О :)
 * @constructor
 */
LogicXO = function () {

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
};
/**
 * Статичный класс.
 * @type {LogicXO}
 */
LogicXO = new LogicXO();