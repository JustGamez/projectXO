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
    var elementField = null;

    /**
     * Статус игры, кто ходит, выиграл проиграл и т.д.
     * @type {ElementGraphicText}
     */
    var elementGameStatus = null;

    /**
     * Элемент фото оппонента.
     * @type {ElementPhoto}
     */
    var elementPhoto = null;

    /**
     * Элемент фото второго оппонента. Если мы наблюдаем.
     * @type {ElementPhoto}
     */
    var elementPhoto2 = null;

    /**
     * Элемент, кнопка играть "Ещё".
     * @type {ElementButton}
     */
    var elementButtonAgain = null;

    /**
     * @type {GUIDom}
     */
    var domSignX;

    /**
     *
     * @type {GUIDom}
     */
    var domSignO;

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
        nobodyWin: 'ничья.',
        youWinSexUnknown: 'вы выиграли!',
        youWinSexMan: 'ты выиграл!',
        youWinSexWoman: 'ты выиграла!',
        opponentWin: 'оппонент \nвыиграл!',
        opponentLeave: 'оппонент \nпокинул игру',

        turnX: 'ход: Х',
        turnO: 'ход: О',
        closed: 'игра\nокончена',
        someBodyWin: 'игра\nокончена'
    };

    var textVariants = [
        {status: LogicXO.STATUS_WAIT, text: gameStatusTextList.waiting},
        {status: LogicXO.STATUS_RUN, isOurTurn: true, turnId: LogicXO.SIGN_ID_X, text: gameStatusTextList.yourTurnX},
        {status: LogicXO.STATUS_RUN, isOurTurn: true, turnId: LogicXO.SIGN_ID_O, text: gameStatusTextList.yourTurnO},
        {status: LogicXO.STATUS_RUN, isOurTurn: false, turnId: LogicXO.SIGN_ID_X, text: gameStatusTextList.opponentTurnX},
        {status: LogicXO.STATUS_RUN, isOurTurn: false, turnId: LogicXO.SIGN_ID_O, text: gameStatusTextList.opponentTurnO},
        {status: LogicXO.STATUS_SOMEBODY_WIN, isOurWin: true, sex: SocNet.SEX_UNKNOWN, text: gameStatusTextList.youWinSexUnknown},
        {status: LogicXO.STATUS_SOMEBODY_WIN, isOurWin: true, sex: SocNet.SEX_MAN, text: gameStatusTextList.youWinSexMan},
        {status: LogicXO.STATUS_SOMEBODY_WIN, isOurWin: true, sex: SocNet.SEX_WOMAN, text: gameStatusTextList.youWinSexWoman},
        {status: LogicXO.STATUS_SOMEBODY_WIN, isOurWin: false, text: gameStatusTextList.opponentWin},
        {status: LogicXO.STATUS_CLOSED, text: gameStatusTextList.opponentLeave},
        {status: LogicXO.STATUS_NOBODY_WIN, text: gameStatusTextList.nobodyWin},
        {status: LogicXO.STATUS_RUN, isLooking: true, turnId: LogicXO.SIGN_ID_X, text: gameStatusTextList.turnX},
        {status: LogicXO.STATUS_RUN, isLooking: true, turnId: LogicXO.SIGN_ID_O, text: gameStatusTextList.turnO},
        {status: LogicXO.STATUS_SOMEBODY_WIN, isLooking: true, text: gameStatusTextList.someBodyWin}
    ];

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
        elementField = element;
        /* Кнопка возврата на главную страницу. */
        element = GUI.createElement('ElementButton', {
            x: 562,
            y: 95,
            srcRest: '/images/buttons/menuRest.png',
            srcHover: '/images/buttons/menuHover.png',
            srcActive: '/images/buttons/menuActive.png',
            onClick: LogicPageXO.onMenuButtonClick
        });
        self.elements.push(element);
        /* Фото оппонента. */
        element = GUI.createElement("ElementPhoto", {
            x: 585,
            y: 171,
            showCardInfo: true,
            cardInfoOffsetX: -115,
            cardInfoOffsetY: -20
        });
        self.elements.push(element);
        elementPhoto = element;
        /* Фото оппонента 2. */
        element = GUI.createElement("ElementPhoto", {
            x: 585,
            y: 171,
            showCardInfo: true,
            cardInfoOffsetX: -188,
            cardInfoOffsetY: -20
        });
        elementPhoto2 = element;
        /* Статус игры. */
        element = GUI.createElement('ElementGraphicText', {
            x: 545, //with no alignCenter : 578
            y: 258,
            width: 157,
            height: undefined,
            alignCenter: true,
            text: ''
        });
        self.elements.push(element);
        elementGameStatus = element;
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
                elementButtonAgain.hide();
                LogicPageXO.onAgainButtonClick();
            }
        });
        elementButtonAgain = element;
        self.elements.push(element);
        domSignX = GUI.createDom(undefined, {
            backgroundImage: '/images/fields/15x15SignX.png',
            opacity: 0.25
        });
        domSignO = GUI.createDom(undefined, {
            backgroundImage: '/images/fields/15x15SignO.png',
            opacity: 0.25
        });
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
        elementPhoto2.hide();
        domSignO.hide();
        domSignX.hide();
    };

    /**
     * Настройка перед отрисовкой.
     */
    this.preset = function () {
        var game, fieldSize, user, justLooking, opponent, user1, user2;
        /* Перересовываем поле */
        justLooking = Boolean(LogicGame.getLookingGameId());
        if (justLooking) {
            game = LogicGame.getById(LogicGame.getLookingGameId());
        } else {
            game = LogicGame.getCurrentGame();
        }
        user = LogicUser.getCurrentUser();
        /* Установим тип поля и знаки */
        if (!game) {
            elementField.switchToField(LogicXOSettings.requestedFieldTypeId);
            elementField.clearField();
            elementPhoto.x = 585;
            elementPhoto2.hide();
            domSignX.hide();
            domSignO.hide();
        } else {
            fieldSize = LogicXO.getFieldSize(game.fieldTypeId);
            elementField.switchToField(game.fieldTypeId);
            elementField.clearField();

            /* Подсветить последний шаг. */
            if (game.lastMove && game.status == LogicXO.STATUS_RUN) {
                elementField.setLastMove(game.lastMove);
            }
            for (var y = 0; y < fieldSize; y++) {
                for (var x = 0; x < fieldSize; x++) {
                    elementField.setSign(x, y, game.field[y][x]);
                }
            }
        }
        /* Посмотрим есть ли у нас линия-победы */
        if (game && game.outcomeResults) {
            if (game.outcomeResults.someBodyWin) {
                elementField.setWinLine(game.outcomeResults.x, game.outcomeResults.y, game.outcomeResults.lineId);
            }
        }
        /* Перересовываем статус игры */
        var text = gameStatusTextList.waiting;
        if (game) {
            var isOurTurn, isOurWin;
            isOurTurn = LogicXO.isHisTurn(game, user.id);
            isOurWin = game.winnerId == user.id;
            textVariants.forEach(function (variant) {
                if (variant.status != undefined && variant.status != game.status) return;
                if (variant.isOurTurn != undefined && variant.isOurTurn != isOurTurn) return;
                if (variant.turnId != undefined && variant.turnId != game.turnId) return;
                if (variant.sex != undefined && variant.sex != user.sex) return;
                if (variant.isOurWin != undefined && variant.isOurWin != isOurWin) return;
                if (variant.isLooking != undefined && variant.isLooking != justLooking) return;
                text = variant.text;
            });
        }
        else {
            text = 'ждём...';
        }
        elementGameStatus.setText(text);
        elementGameStatus.y = 258;
        /* Фото оппонента. */
        if (game && !justLooking) {
            opponent = LogicXO.getOpponentUserId(game, user.id) ? LogicUser.getById(LogicXO.getOpponentUserId(game, user.id)) : getRobotDummy();
            elementPhoto.update({user: opponent});
            elementPhoto.degreesDiapazon = 12;
            elementPhoto.showCardInfo = Boolean(opponent.id);
            elementPhoto.x = 585;
        } else if (game && justLooking) {
            user1 = game.creatorUserId ? LogicUser.getById(game.creatorUserId) : getRobotDummy();
            user2 = game.joinerUserId ? LogicUser.getById(game.joinerUserId) : getRobotDummy();
            elementPhoto.update({user: user1});
            elementPhoto.showCardInfo = Boolean(user1.id);
            elementPhoto.x = 585 - 39;
            elementPhoto.degreesDiapazon = 8;
            elementPhoto2.degreesDiapazon = 8;
            elementPhoto2.x = 585 + 39;
            elementPhoto2.update({user: user2, showCardInfo: Boolean(user2.id)});
            elementPhoto2.showCardInfo = Boolean(user2.id);
            elementPhoto2.show();
            elementPhoto2.redraw();
            elementGameStatus.y = 278;
            /* Крестик левый?*/
            if (game.XUserId == user1.id) {
                /*v.1 575, 649 , y = 242*/
                /*v.2 524, 698 , y = 198*/
                domSignX.x = 575;
                domSignO.x = 649;
            } else {
                domSignX.x = 649;
                domSignO.x = 575;
            }
            domSignX.y = 247;
            domSignO.y = 247;
            domSignO.show();
            domSignX.show();
        }
        /* Кнопка "Еще" */
        if (game && showAgainButtonForGame(game, user)) {
            elementButtonAgain.show();
        } else {
            elementButtonAgain.hide();
        }
    };

    var getRobotDummy = function () {
        return {
            id: 0,
            online: true,
            photo50: '/images/photo/vsRobot.png',
            firstName: 'Игра с роботом.',
            lastName: ''
        };
    };

    var showAgainButtonForGame = function (game, user) {
        var againShow, opponentUserId, opponent;
        if (!game) return false;
        if (!game.id) return false;
        if (!LogicXO.isMember(game, user.id)) return false;
        if (game.isInvitation) {
            opponentUserId = LogicXO.getOpponentUserId(game, user.id);
            if (!opponentUserId) return false;
            opponent = LogicUser.getById(opponentUserId);
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
