/**
 * Страница игры в Х-О.
 * @constructor
 */
PageBlockXOGame = function PageBlockXOGame() {
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
     * Элемент, таймер игры.
     * @type {ElementGraphicText}
     */
    var elementTimer = null;

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
     * {ElementGraphicText}
     */
    var elementScores;

    /**
     * Тексты для статусов игры.
     * @type {{waiting: string, yourTurnX: string, yourTurnO: string, opponentTurnX: string, opponentTurnO: string, closed: string, nobodyWin: string, youWinSexMan: string, youWinSexWoman: string, opponentWinSexMan: string, opponentWinSexWoman: string}}
     */
    var gameStatusTextList = {
        waiting: 'ждём...',

        yourTurnX: 'ход: Х \nтвой ход',
        yourTurnO: 'ход: О \nтвой ход',
        opponentTurnX: 'ход: Х \nоппонент',
        opponentTurnO: 'ход: О \nоппонент',
        turnX: 'ход: Х',
        turnO: 'ход: О',

        youWinSexUnknown: 'вы выиграли!',
        youWinSexMan: 'ты выиграл!',
        youWinSexWoman: 'ты выиграла!',
        opponentWin: 'оппонент \nвыиграл!',
        XWin: 'крестики \nвыиграли',
        OWin: 'нолики \nвыиграли',

        closed: 'игра \nокончена',

        opponentLeave: 'оппонент \nпокинул игру',
        playerXLeave: 'крестик \nпокинул игру',
        playerOLeave: 'нолик \nпокинул игру',
        playersLeave: 'игроки \nпокинули игру',
        playerLeave: 'игрок \nпокинул игру',

        nobodyWin: 'ничья.'
    };

    /**
     * @type {ElementButton}
     */
    var elementButtonWallPost;

    /**
     * @type {ElementGraphicText}
     */
    var elementWallPostWait;

    var wallPostCountDown;

    var wallPostIntervalId;

    var elementCameraButton;

    var elementCameraWait;

    var textVariants = null;

    var timerTimerId = null;

    /**
     * Собствено проинициализируем нашу страницу.
     */
    this.init = function () {

        textVariants = [
            {status: LogicXO.STATUS_WAIT, text: gameStatusTextList.waiting},
            {
                status: LogicXO.STATUS_RUN,
                isLooking: false,
                turnId: LogicXO.SIGN_ID_X,
                isOurTurn: true,
                text: gameStatusTextList.yourTurnX
            },
            {
                status: LogicXO.STATUS_RUN,
                isLooking: false,
                turnId: LogicXO.SIGN_ID_X,
                isOurTurn: false,
                text: gameStatusTextList.opponentTurnX
            },
            {
                status: LogicXO.STATUS_RUN,
                isLooking: false,
                turnId: LogicXO.SIGN_ID_O,
                isOurTurn: true,
                text: gameStatusTextList.yourTurnO
            },
            {
                status: LogicXO.STATUS_RUN,
                isLooking: false,
                turnId: LogicXO.SIGN_ID_O,
                isOurTurn: false,
                text: gameStatusTextList.opponentTurnO
            },

            {
                status: LogicXO.STATUS_RUN,
                isLooking: true,
                turnId: LogicXO.SIGN_ID_X,
                isOurTurn: false,
                text: gameStatusTextList.turnX
            },
            {
                status: LogicXO.STATUS_RUN,
                isLooking: true,
                turnId: LogicXO.SIGN_ID_O,
                isOurTurn: false,
                text: gameStatusTextList.turnO
            },

            {
                status: LogicXO.STATUS_SOMEBODY_WIN,
                isLooking: false,
                isOurWin: true,
                sex: SocNet.SEX_UNKNOWN,
                text: gameStatusTextList.youWinSexUnknown
            },
            {
                status: LogicXO.STATUS_SOMEBODY_WIN,
                isLooking: false,
                isOurWin: true,
                sex: SocNet.SEX_MAN,
                text: gameStatusTextList.youWinSexMan
            },
            {
                status: LogicXO.STATUS_SOMEBODY_WIN,
                isLooking: false,
                isOurWin: true,
                sex: SocNet.SEX_WOMAN,
                text: gameStatusTextList.youWinSexWoman
            },
            {
                status: LogicXO.STATUS_SOMEBODY_WIN,
                isLooking: false,
                isOurWin: false,
                text: gameStatusTextList.opponentWin
            },

            {
                status: LogicXO.STATUS_SOMEBODY_WIN,
                isLooking: true,
                vsRobot: true,
                winSignId: LogicXO.SIGN_ID_X,
                text: gameStatusTextList.XWin
            },
            {
                status: LogicXO.STATUS_SOMEBODY_WIN,
                isLooking: true,
                vsRobot: true,
                winSignId: LogicXO.SIGN_ID_O,
                text: gameStatusTextList.OWin
            },
            {
                status: LogicXO.STATUS_SOMEBODY_WIN,
                isLooking: true,
                vsRobot: false,
                winSignId: LogicXO.SIGN_ID_X,
                text: gameStatusTextList.XWin
            },
            {
                status: LogicXO.STATUS_SOMEBODY_WIN,
                isLooking: true,
                vsRobot: false,
                winSignId: LogicXO.SIGN_ID_O,
                text: gameStatusTextList.OWin
            },

            {status: LogicXO.STATUS_NOBODY_WIN, text: gameStatusTextList.nobodyWin},
            {
                status: LogicXO.STATUS_NOBODY_WIN,
                isLooking: false,
                vsRobot: false,
                opponentLeave: true,
                text: gameStatusTextList.opponentLeave
            },
            {
                status: LogicXO.STATUS_NOBODY_WIN,
                isLooking: true,
                vsRobot: false,
                XLeave: true,
                OLeave: false,
                text: gameStatusTextList.playerXLeave
            },
            {
                status: LogicXO.STATUS_NOBODY_WIN,
                isLooking: true,
                vsRobot: false,
                XLeave: false,
                OLeave: true,
                text: gameStatusTextList.playerOLeave
            },
            {
                status: LogicXO.STATUS_NOBODY_WIN,
                isLooking: true,
                vsRobot: false,
                XLeave: true,
                OLeave: true,
                text: gameStatusTextList.playersLeave
            },

            {status: LogicXO.STATUS_CLOSED, text: gameStatusTextList.closed},
            {
                status: LogicXO.STATUS_CLOSED,
                isLooking: false,
                opponentLeave: true,
                text: gameStatusTextList.opponentLeave
            },
            {
                status: LogicXO.STATUS_CLOSED,
                isLooking: true,
                vsRobot: false,
                XLeave: true,
                OLeave: false,
                text: gameStatusTextList.playerXLeave
            },
            {
                status: LogicXO.STATUS_CLOSED,
                isLooking: true,
                vsRobot: false,
                XLeave: false,
                OLeave: true,
                text: gameStatusTextList.playerOLeave
            },
            {
                status: LogicXO.STATUS_CLOSED,
                isLooking: true,
                vsRobot: false,
                XLeave: true,
                OLeave: true,
                text: gameStatusTextList.playersLeave
            },
            {
                status: LogicXO.STATUS_CLOSED,
                isLooking: true,
                vsRobot: true,
                bothLeave: true,
                text: gameStatusTextList.playerLeave
            },

            /* Это должно быть внизу таблицы! */
            {isLooking: true, vsRobot: true, bothLeave: true, text: gameStatusTextList.playerLeave},
            {isLooking: true, vsRobot: false, XLeave: true, OLeave: false, text: gameStatusTextList.playerXLeave},
            {isLooking: true, vsRobot: false, XLeave: false, OLeave: true, text: gameStatusTextList.playerOLeave},
            {isLooking: true, vsRobot: false, bothLeave: true, text: gameStatusTextList.playersLeave},
            {isLooking: false, vsRobot: false, opponentLeave: true, text: gameStatusTextList.opponentLeave},

            {waitRepeat: true, text: gameStatusTextList.waiting}
        ];

        var element;
        /* Игровое поле*/
        element = GUI.createElement(ElementField, {
            x: 102,
            y: 92,
            width: 400,
            height: 400,
            onClick: LogicPageXO.onFieldSignClick
        });
        this.elements.push(element);
        elementField = element;
        /* Кнопка возврата на главную страницу. */
        element = GUI.createElement(ElementButton, {
            x: 562,
            y: 95,
            srcRest: '/images/buttons/menuRest.png',
            srcHover: '/images/buttons/menuHover.png',
            srcActive: '/images/buttons/menuActive.png',
            onClick: LogicPageXO.onMenuButtonClick
        });
        self.elements.push(element);
        /* Фото оппонента. */
        element = GUI.createElement(ElementPhoto, {
            x: 585,
            y: 171,
            showCardInfo: true,
            cardInfoOffsetX: -115,
            cardInfoOffsetY: -20
        });
        self.elements.push(element);
        elementPhoto = element;
        /* Фото оппонента 2. */
        element = GUI.createElement(ElementPhoto, {
            x: 585,
            y: 171,
            showCardInfo: true,
            cardInfoOffsetX: -188,
            cardInfoOffsetY: -20
        });
        elementPhoto2 = element;
        /* Статус игры. */
        element = GUI.createElement(ElementGraphicText, {
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
        element = GUI.createElement(ElementButton, {
            x: 549,
            y: 345,
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
        element = GUI.createElement(ElementGraphicText, {
            x: 575,
            y: 455,
            width: 150,
            text: 'побед: - '
        });
        self.elements.push(element);
        elementScores = element;

        element = GUI.createElement(ElementButton, {
            x: 550,
            y: 315,
            srcRest: '/images/buttons/wallPostRest.png',
            srcHover: '/images/buttons/wallPostHover.png',
            srcActive: '/images/buttons/wallPostHover.png',
            onClick: function () {
                var game, user, opponentId, opponent;
                game = LogicGame.getCurrentGame();
                user = LogicUser.getCurrentUser();
                opponentId = LogicXO.getOpponentUserId(game, user.id);
                if (opponentId) {
                    opponent = LogicUser.getById(opponentId);
                } else {
                    opponent = getRobotDummy();
                }
                LogicDrawWallPost.drawWallPost(game, user, opponent);
                wallPostCountDown = 5;
                wallPostIntervalId = setInterval(function () {
                    if (wallPostCountDown == 0) {
                        clearInterval(wallPostIntervalId);
                        wallPostIntervalId = false;
                        return;
                    }
                    wallPostCountDown--;
                    PageController.redraw();
                }, 387);
                PageController.redraw();
            }
        });
        elementButtonWallPost = element;
        element = GUI.createElement(ElementGraphicText, {
            x: 575,
            y: 310,
            width: 100,
            text: 'ждём...'
        });
        elementWallPostWait = element;
        element = GUI.createElement(ElementButton, {
            x: 511,
            y: 101,
            srcRest: '/images/buttons/cameraRest.png',
            srcHover: '/images/buttons/cameraHover.png',
            srcActive: '/images/buttons/cameraActive.png',
            title: 'Сфотографировать.',
            onClick: function () {
                var game, user, opponentId, opponent;
                if (LogicGame.getLookingGameId()) {
                    game = LogicGame.getById(LogicGame.getLookingGameId());
                } else {
                    game = LogicGame.getCurrentGame();
                }
                user = LogicUser.getCurrentUser();
                opponentId = LogicXO.getOpponentUserId(game, user.id);
                if (opponentId) {
                    opponent = LogicUser.getById(opponentId);
                } else {
                    opponent = getRobotDummy();
                }
                LogicDrawWallPost.drawCameraPhoto(game, user, opponent);
                wallPostCountDown = 5;
                wallPostIntervalId = setInterval(function () {
                    if (wallPostCountDown == 0) {
                        clearInterval(wallPostIntervalId);
                        wallPostIntervalId = false;
                        return;
                    }
                    wallPostCountDown--;
                    PageController.redraw();
                }, 500);
                PageController.redraw();
            }
        });
        elementCameraButton = element;
        element = GUI.createElement(ElementGraphicText, {
            x: 512,
            y: 101,
            width: 20,
            text: '5',
            scale: 0.75
        });
        element.setText('5');
        elementCameraWait = element;
        element = GUI.createElement(ElementGraphicText, {
            x: 575,
            y: 345,
            width: 140,
            text: '00 : 00'
        });
        self.elements.push(element);
        elementTimer = element;
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
        timerTimerId = setInterval(self.redrawTimer, 1000 / 35);
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
        /* Сбросим фото */
        elementPhoto.update({user: getRobotDummy()});
        elementPhoto2.update({user: getRobotDummy()});
        elementPhoto.hide();
        elementPhoto2.hide();
        domSignO.hide();
        domSignX.hide();
        elementButtonWallPost.hide();
        elementWallPostWait.hide();
        elementCameraButton.hide();
        elementCameraWait.hide();
        clearInterval(timerTimerId);
    };

    /**
     * Настройка перед отрисовкой.
     */
    this.preset = function () {
        var game, fieldSize, currentUser, justLooking, opponent, user1, user2;
        currentUser = LogicUser.getCurrentUser();
        /* Перересовываем поле */
        justLooking = Boolean(LogicGame.getLookingGameId());
        if (justLooking) {
            game = LogicGame.getById(LogicGame.getLookingGameId());
        } else {
            game = LogicGame.getCurrentGame();
        }

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
            var isOurTurn, isOurWin, winSignId, XLeave, OLeave, bothLeave, opponentLeave;
            isOurTurn = LogicXO.isHisTurn(game, currentUser.id);
            isOurWin = game.winnerId == currentUser.id;
            winSignId = null;
            if (game.status == LogicXO.STATUS_SOMEBODY_WIN && game.XUserId == game.winnerId) {
                winSignId = LogicXO.SIGN_ID_X;
            }
            if (game.status == LogicXO.STATUS_SOMEBODY_WIN && game.OUserId == game.winnerId) {
                winSignId = LogicXO.SIGN_ID_O;
            }
            XLeave = LogicUser.getById(game.XUserId).onGameId != game.id;
            OLeave = LogicUser.getById(game.OUserId).onGameId != game.id;
            opponentLeave = LogicUser.getById(LogicXO.getOpponentUserId(game, currentUser.id)).onGameId != game.id;
            bothLeave = XLeave && OLeave;
            textVariants.forEach(function (variant) {
                if (variant.status != undefined && variant.status != game.status) return;
                if (variant.turnId != undefined && variant.turnId != game.turnId) return;
                if (variant.isOurTurn != undefined && variant.isOurTurn != isOurTurn) return;
                if (variant.sex != undefined && variant.sex != currentUser.sex) return;
                if (variant.isOurWin != undefined && variant.isOurWin != isOurWin) return;
                if (variant.isLooking != undefined && variant.isLooking != justLooking) return;
                if (variant.XLeave != undefined && variant.XLeave != XLeave) return;
                if (variant.OLeave != undefined && variant.OLeave != OLeave) return;
                if (variant.vsRobot != undefined && variant.vsRobot != game.vsRobot) return;
                if (variant.winSignId != undefined && variant.winSignId != winSignId) return;
                if (variant.bothLeave != undefined && variant.bothLeave != bothLeave) return;
                if (variant.opponentLeave != undefined && variant.opponentLeave != opponentLeave) return;
                if (variant.waitRepeat != undefined && variant.waitRepeat != LogicPageXO.waitRepeat) return;
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
            opponent = !game.vsRobot ? LogicUser.getById(LogicXO.getOpponentUserId(game, currentUser.id)) : getRobotDummy();
            elementPhoto.update({user: opponent});
            elementPhoto.degreesDiapazon = 12;
            elementPhoto.showCardInfo = Boolean(opponent.id);
            elementPhoto.x = 585;
            elementPhoto2.hide();
            domSignO.hide();
            domSignX.hide();
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
            /*v.1 575, 649 , y = 242*/
            /*v.2 524, 698 , y = 198*/
            /* Крестик левый?*/
            if (game.XUserId == game.creatorUserId) {
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
            domSignX.redraw();
            domSignO.redraw();
        }
        /* Кнопка "Еще" */
        if (game && showAgainButtonForGame(game, currentUser) && !justLooking) {
            elementButtonAgain.show();
        } else {
            elementButtonAgain.hide();
        }
        if (game && game.fieldTypeId == LogicXO.FIELD_TYPE_15X15 && !game.vsRobot) {
            elementScores.setText('побед: ' + currentUser.score15x15vsPerson);
        }
        if (game && game.fieldTypeId == LogicXO.FIELD_TYPE_3X3 && !game.vsRobot) {
            elementScores.setText('побед: ' + currentUser.score3x3vsPerson);
        }
        if (game && game.fieldTypeId == LogicXO.FIELD_TYPE_15X15 && game.vsRobot) {
            elementScores.setText('побед: ' + currentUser.score15x15vsRobot);
        }
        if (game && game.fieldTypeId == LogicXO.FIELD_TYPE_3X3 && game.vsRobot) {
            elementScores.setText('побед: ' + currentUser.score3x3vsRobot);
        }
        if (!game) {
            elementScores.setText('побед: -');
        }
        //@todo
        // кнопка рассказать
        if (game && (game.status == LogicXO.STATUS_SOMEBODY_WIN || game.status == LogicXO.STATUS_NOBODY_WIN) && !justLooking && !LogicDrawWallPost.blocked) {
            //@todo HARD-WORK! не работает загрузка на сервер вк.
            //elementButtonWallPost.show();
            elementButtonWallPost.hide();
        } else {
            elementButtonWallPost.hide();
        }
        // вейтер рассказать
        if (LogicDrawWallPost.drawingWallPost && !LogicDrawWallPost.postReady) {
            elementWallPostWait.show();
            elementWallPostWait.setText('ждём...' + wallPostCountDown);
        } else {
            elementWallPostWait.hide();
        }
        // кнопка "фотоаппарат"
        if (!LogicDrawWallPost.blocked) {
            //@todo HARD-WORK!
            //не работает загрузка на сервер VK
            //elementCameraButton.show();
            elementCameraButton.hide();
        } else {
            elementCameraButton.hide();
        }
        // вейтер фотоаппарат
        if (LogicDrawWallPost.drawingCameraPhoto && !LogicDrawWallPost.postReady) {
            elementCameraWait.show();
            elementCameraWait.setText(wallPostCountDown.toString());
        } else {
            elementCameraWait.hide();
        }
        // таймер поста на стену
        if (LogicDrawWallPost.blocked && LogicDrawWallPost.postReady && wallPostIntervalId) {
            clearInterval(wallPostIntervalId);
            wallPostIntervalId = false;
        }
        if (game && game.status == LogicXO.STATUS_RUN) {
            elementTimer.show();
        } else {
            elementTimer.hide();
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
        var opponentUserId, opponent;
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
        // отдельно, потому что не хотим показывтаь при вызове .show функции.
        elementWallPostWait.redraw();
        elementCameraWait.redraw();
    };

    /**
     * Да, таймер перерисовываем отдельно,
     * так надо потому что перерисовка будет раз в 1000/35 миллисекунду(real-time)!
     * Всю страницу перерисовывать так часто не надо, т.е. это оптимизация, хотя механизм перерисовки страницы достаточно быстрый,
     * т.е. не перерисовывает ненужные элементы, все же
     */
    this.redrawTimer = function () {
        var game, text, dateLast, tLast;
        game = LogicGame.getCurrentGame();
        if (!game) {
            //try get looking game!
            lookingId = LogicGame.getLookingGameId();
            if (lookingId) {
                game = LogicGame.getById(lookingId);
            }
        }
        if (game) {
            tLast = LogicXO.getTimerMilliseconds(game);
            dateLast = new Date(tLast);
            text =
                str_pad(dateLast.getMinutes()) + ':' +
                str_pad(dateLast.getSeconds());
        } else {
            text = "00:00";
        }
        // показать время.ммм т.е. это точка и  текущая точка, т.е. их разница
        elementTimer.setText(text);
        elementTimer.redraw();
    };

    /**
     * Дополним нулями значение и вернёт строку
     * Тут это специфичная функция, дополнит нулями число спереди до 2ух знаков.
     * @param sourceValue {Mixed}
     * @todo эта функция уже есть в Logs.js
     */
    var str_pad = function (sourceValue) {
        return "00000".substr(0, 2 - sourceValue.toString().length) + sourceValue;
    };
};


PageBlockXOGame = new PageBlockXOGame;