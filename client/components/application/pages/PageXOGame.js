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
     * Элемент фото оппонента.
     * @type {ElementPhoto}
     */
    this.elementOpponentPhoto = null;

    /**
     * Элемент, кнопка играть "Ещё".
     * @type {ElementButton}
     */
    this.elementButtonAgain = null;

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
        youWinSexMan: 'вы выиграли!',
        youWinSexWoman: 'вы выиграли!',
        opponentWinSexMan: 'оппонент \nвыиграл!',
        opponentWinSexWoman: 'оппонент \nвыиграл!'
    };

    /**
     * Собствено проинициализируем нашу страницу.
     */
    this.init = function () {
        var element;
        /* Игровое поле*/
        element = GUI.createElement('ElementField', {
            x: 102,
            y: 92,
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
        /* Фото оппонента. */
        element = GUI.createElement("ElementPhoto", {
            x: 585,
            y: 163
        });
        self.elements.push(element);
        self.elementOpponentPhoto = element;
        /* Статус игры. */
        element = GUI.createElement('ElementGraphicText', {
            x: 578,
            y: 258,
            width: 157,
            text: ''
        });
        self.elements.push(element);
        self.elementGameStatus = element;
        /* Кнопка играть "Еще". */
        element = GUI.createElement('ElementButton', {
            x: 535,
            y: 312,
            width: 175,
            height: 94,
            srcRest: '/images/buttons/againRest.png',
            srcHover: '/images/buttons/againHover.png',
            srcActive: '/images/buttons/againActive.png',
            onClick: function () {
                self.elementButtonAgain.hide();
                LogicPageXO.onAgainButtonClick();
            }
        });
        self.elementButtonAgain = element;
        self.elements.push(element);
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
        var game, fieldSize, user, isItLastMove, x, y;
        game = LogicGame.getCurrentGame();
        user = LogicUser.getCurrentUser();
        /* Установим тип поля и знаки */
        if (!game) {
            self.elementField.switchToField(LogicXOSettings.requestedFieldTypeId);
            self.elementField.clearField();
        } else {
            fieldSize = LogicXO.getFieldSize(game.fieldTypeId);
            self.elementField.switchToField(game.fieldTypeId);
            self.elementField.clearField();

            if (game.lastMove && game.status == LogicXO.STATUS_RUN) {
                x = game.lastMove.x;
                y = game.lastMove.y;
                self.elementField.setLastMove(x, y);
            }
            for (var y = 0; y < fieldSize; y++) {
                for (var x = 0; x < fieldSize; x++) {
                    self.elementField.setSign(x, y, game.field[y][x]);
                }
            }
        }
        /* Посмотрим есть ли у нас линия-победы */
        if (game && game.outcomeResults) {
            if (game.outcomeResults.someBodyWin) {
                self.elementField.setWinLine(game.outcomeResults.x, game.outcomeResults.y, game.outcomeResults.lineId);
            }
        }
        /* Перересовываем статус игры */
        var text = gameStatusTextList.waiting;
        if (game) {
            if (game.status == LogicXO.STATUS_WAIT) {
                text = gameStatusTextList.waiting;
            }
            if (game.status == LogicXO.STATUS_RUN) {
                if (LogicXO.isHisTurn(game, user.id)) {
                    if (game.turnId == LogicXO.SIGN_ID_X) {
                        text = gameStatusTextList.yourTurnX;
                    } else {
                        text = gameStatusTextList.yourTurnO;
                    }
                } else {
                    if (game.turnId == LogicXO.SIGN_ID_X) {
                        text = gameStatusTextList.opponentTurnX;
                    } else {
                        text = gameStatusTextList.opponentTurnO;
                    }
                }
            }
            if (game.status == LogicXO.STATUS_CLOSED) {
                text = gameStatusTextList.closed;
            }
            if (game.status == LogicXO.STATUS_SOMEBODY_WIN) {
                if (game.winnerId == user.id) {
                    text = gameStatusTextList.youWinSexMan;
                } else {
                    text = gameStatusTextList.opponentWinSexMan;
                }
            }
            if (game.status == LogicXO.STATUS_NOBODY_WIN) {
                text = gameStatusTextList.nobodyWin;
            }
        }
        else {
            text = gameStatusTextList.waiting;
        }
        self.elementGameStatus.setText(text);
        /* Фото оппонента. */
        var opponent, photoSrc, opponentTitle, opponentUserId;
        photoSrc = '/images/photo/camera_c.gif';
        opponentTitle = '';
        if (game) {
            if (game.vsRobot) {
                photoSrc = '/images/photo/vsRobot.png';
                opponentTitle = 'Игра с роботом.';
            } else {
                opponentUserId = LogicXO.getOpponentUserId(game, user.id);
                if (opponentUserId) {
                    opponent = LogicUser.getUserById(opponentUserId);
                    if (opponent) {
                        opponentTitle = opponent.firstName + ' ' + opponent.lastName;
                        photoSrc = opponent.photo50;
                    }
                }
            }
        }
        self.elementOpponentPhoto.update({
            src: photoSrc,
            title: opponentTitle,
            online: null,
            showButtonInvite: false,
            showButtonLetsPlay: false,
            showIndicatorWaiting: false,
            showOnlineIndicator: false,
            onClick: function (photoInfo) {
                window.open(SocNet.getUserProfileUrl(photoInfo.socNetTypeId, photoInfo.socNetUserId), '_blank');
            },
            onButtonInviteClick: false,
            onButtonLetsPlayClick: false,
            enableButtonInvite: false,
            photoInfo: opponent
        });
        /* Кнопка "Еще" */
        if (game && showAgainButtonForGame(game, user)) {
            self.elementButtonAgain.show();
        } else {
            self.elementButtonAgain.hide();
        }
    };

    var showAgainButtonForGame = function (game, user) {
        var againShow, opponentUserId, opponent;
        if (!game) return false;
        if (!game.id) return false;
        if (!LogicXO.isMember(game, user.id)) return false;
        if (game.isRandom || game.isInvitation) {
            opponentUserId = LogicXO.getOpponentUserId(game, user.id);
            if (!opponentUserId) return false;
            opponent = LogicUser.getUserById(opponentUserId);
            if (!opponent) return false;
            if (opponent.onGameId != game.id) return false;
            if (opponent.onGameId == 0) return false;
            if (!opponent.online) return false;
        }
        if (game.status == LogicXO.STATUS_WAIT) return false;
        if (game.status == LogicXO.STATUS_RUN) return false;
        return true;
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