/**
 * Страница игры в Х-О.
 * @constructor
 */
PageXOGame = function PageXOGame() {
    var self = this;

    /**
     * Массив всех элементов страницы.
     * @type {Array}
     */
    this.elements = [];

    /**
     * Показывать ли страницу.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Игровое поле.
     * @type {ElementField}
     */
    this.elementField = null;

    /**
     * Статус игры, кто ходит, выиграл проиграл и т.д.
     * @type {ElementGraphicText}
     */
    this.elementGameStatus = null;

    /**
     * Тексты для статусов игры.
     * @type {{waiting: string, yourTurnX: string, yourTurnO: string, opponentTurnX: string, opponentTurnO: string, closed: string, nobodyWin: string, youWinSexMan: string, youWinSexWoman: string, opponentWinSexMan: string, opponentWinSexWoman: string}}
     */
    var gameStatusTextList = {
        waiting: 'ждём...',
        yourTurnX: 'ход: Х\nтвой ход',
        yourTurnO: 'ход: О\nтвой ход',
        opponentTurnX: 'ход: Х\nоппонент',
        opponentTurnO: 'ход: О\nоппонент',
        closed: 'оппонент \nпокинул игру',
        nobodyWin: 'ничья.',
        youWinSexMan: 'ты выиграл!',
        youWinSexWoman: 'ты выиграла!',
        opponentWinSexMan: 'ты проиграл!',
        opponentWinSexWoman: 'ты проиграла!'
    };

    /**
     * Собствено проинициализируем нашу страницу.
     */
    this.init = function () {
        var element;
        /* Игровое поле*/
        element = GUI.createElement('ElementField', {
            x: 150,
            y: 138,
            width: 400,
            height: 400,
            onClick: LogicPageXO.onFieldSignClick
        });
        this.elements.push(element);
        this.elementField = element;
        /* Кнопка возврата на главную страницу. */
        element = GUI.createElement('ElementButton', {
            x: 545,
            y: 55,
            width: 148,
            height: 73,
            srcRest: '/images/buttons/menuRest.png',
            srcHover: '/images/buttons/menuHover.png',
            srcActive: '/images/buttons/menuActive.png',
            onClick: LogicPageXO.onMenuButtonClick
        });
        self.elements.push(element);
        /* game status */
        element = GUI.createElement('ElementGraphicText', {
            x: 570,
            y: 175,
            text: ''
        });
        self.elements.push(element);
        self.elementGameStatus = element;
    };

    /**
     * Покажем элементы страницы.
     */
    this.show = function () {
        if (showed == true) return;
        showed = true;
        self.preset();
        for (var i in self.elements) {
            self.elements[i].show();
        }
        self.redraw();
    };

    /**
     * Спрячем элементы страницы.
     */
    this.hide = function () {
        if (showed == false) return;
        showed = false;
        for (var i in self.elements) {
            self.elements[i].hide();
        }
    };

    /**
     * Настройка перед отрисовкой.
     */
    this.preset = function () {
        /* Перересовываем поле */
        var game, fieldSize, user;
        game = LogicGame.getCurrentGame();
        user = LogicUser.getCurrentUser();
        if (!game) {
            self.elementField.swithToField(LogicXOSettings.requestedFieldTypeId);
        } else {
            fieldSize = LogicXO.getFieldSize(game.fieldTypeId);
            self.elementField.swithToField(game.fieldTypeId);
            self.elementField.clearField();
            for (var y = 0; y < fieldSize; y++) {
                for (var x = 0; x < fieldSize; x++) {
                    self.elementField.setSign(x, y, game.field[y][x]);
                }
            }
        }
        /* Перересовываем статус игры */
        if (game) {
            if (game.status == LogicXO.STATUS_WAIT) {
                self.elementGameStatus.setText(gameStatusTextList.waiting);
            }
            if (game.status == LogicXO.STATUS_RUN) {
                if (LogicXO.isHisTurn(game, user.id)) {
                    if (game.turnId == LogicXO.SIGN_ID_X) {
                        self.elementGameStatus.setText(gameStatusTextList.yourTurnX);
                    } else {
                        self.elementGameStatus.setText(gameStatusTextList.yourTurnO);
                    }
                } else {
                    if (game.turnId == LogicXO.SIGN_ID_X) {
                        self.elementGameStatus.setText(gameStatusTextList.opponentTurnX);
                    } else {
                        self.elementGameStatus.setText(gameStatusTextList.opponentTurnO);
                    }
                }
            }
            if (game.status == LogicXO.STATUS_CLOSED) {
                self.elementGameStatus.setText(gameStatusTextList.closed);
            }
        }
        else {
            self.elementGameStatus.setText(gameStatusTextList.waiting);
        }
    };

    /**
     * Обновим страницу.
     */
    this.redraw = function () {
        if (!showed)return;
        self.preset();
        for (var i in self.elements) {
            self.elements[i].redraw();
        }
    };
};