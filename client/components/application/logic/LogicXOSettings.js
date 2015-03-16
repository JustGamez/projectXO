/**
 * Логика всяких настроек игры.
 * @constructor
 */
LogicXOSettings = function () {

    /**
     * Запрашиваемый тип поля.
     * @type {Number} LogicXO.FIELD_TYPE_*
     */
    this.requestedFieldTypeId = null;

    /**
     * Запрашиваемый знак.
     * @type {Number} LogicXO.SIGN_ID_*
     */
    this.requestedSignId = null;
};
/**
 * Статичный класс.
 * @type {LogicXOSettings}
 */
LogicXOSettings = new LogicXOSettings();