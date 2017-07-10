/**
 * Логика игры.
 * Тут мы будем обрабатывть всё что связано с игрой, но кроме самих крестиков нуликов.
 * Крестики нулики обрабатываются в LogixXO. А тут всё остальное, в т.ч. хранение игр.
 * @constructor
 */
LogicGame = function () {
    var self = this;

    /**
     * Id текущей игры.
     * @type {null}
     */
    var currentGameId = null;

    /**
     * Будем хранить тут данные об игрых.
     * @type {Array}
     */
    var games = [];

    /**
     * Обновить данные об игре.
     * @param game {Object} объект игры.
     */
    this.update = function (game) {
        games[game.id] = game;
        PageController.redraw();
    };

    /**
     * Установить текущую игру.
     * @param gameId
     */
    this.setCurrentGameId = function (gameId) {
        Logs.log("setCurrentGame:" + gameId, Logs.LEVEL_DETAIL);
        if (currentGameId != gameId) {
            SAPIUserState.onGame(gameId, gameId ? Boolean(LogicGame.getById(gameId).vsRobot) : false);
            LogicUser.setBusy(gameId ? true : false);
            currentGameId = gameId;
            PageController.redraw();
        }
    };

    /**
     * Получить текущую игру.
     */
    this.getCurrentGameId = function () {
        return currentGameId;
    };

    /**
     * Получить текущую игру.
     */
    this.getCurrentGame = function () {
        if (currentGameId && games[currentGameId]) {
            return games[currentGameId];
        } else {
            return null;
        }
    };

    /**
     * Возвращает игру по id, если она конечно есть в "кэшэ".
     * @param gameId {int}
     * @returns {Object}
     */
    this.getById = function (gameId) {
        return games[gameId];
    };

    /**
     * Мы будем просить сервер проверять таймер игры
     */
    var checkTimerTimerId;

    var lookingGameId;
    this.setLookingGameId = function (id) {
        lookingGameId = id;
    };

    this.getLookingGameId = function () {
        return lookingGameId;
    };

    this.onSetSign = function (game, x, y) {
        var winLine;
        if (checkTimerTimerId) {
            clearTimeout(checkTimerTimerId);
        }
        Sounds.play('/sounds/turn.mp3');
        /* Обновим у нас. */
        LogicXO.setSign(game, x, y);
        LogicXO.switchTurn(game);
        /* Проверим, есть ли победитель. */
        winLine = LogicXO.findWinLine(game);
        LogicXO.setOutcomeResults(game, winLine);
        LogicGame.update(game);

        // вынос проверки на клиент
        if (game.id == LogicGame.getCurrentGameId()) {
            if (game.outcomeResults.someBodyWin || game.outcomeResults.noBodyWin) {
                SAPIGame.checkWinner(game.id);
            }
        }
        if (game.status == LogicXO.STATUS_RUN) {
            LogicGame.onTurnStart(game);
        }
    };

    this.onTimerFinished = function (game, timerStartPoint) {
        if (game.status !== LogicXO.STATUS_RUN) return;
        if (checkTimerTimerId) {
            clearTimeout(checkTimerTimerId);
        }
        Sounds.play('/sounds/pip.mp3');
        /* Обновим у нас. */
        game.timerStartPoint = timerStartPoint;
        LogicXO.switchTurn(game);
        LogicGame.update(game);
        LogicGame.onTurnStart(game);
    };

    this.onTurnStart = function (game) {
        var ourGame, isOurTurn, gameId;
        ourGame = LogicGame.getCurrentGameId() == game.id;
        isOurTurn = LogicXO.isHisTurn(game, LogicUser.getCurrentUser().id);
        // если это наша игра с роботом, и ход робота - попросим сервер сделать ход :)
        if (ourGame && game.vsRobot && game.status == LogicXO.STATUS_RUN && !isOurTurn) {
            setTimeout(function () {
                SAPIRobotGame.raiseAIMove(game.id)
            }, 350);
        }
        gameId = game.id;
        // если это наша игра, и ход наш, то запустим таймер на проверку таймера-игры
        if (ourGame && (isOurTurn || game.vsRobot)) {
            checkTimerTimerId = setTimeout(function () {
                var game = LogicGame.getById(gameId);
                console.log(game);
                if (game.status !== LogicXO.STATUS_RUN) {
                    return;
                }
                SAPIGame.checkTimer(gameId);
            }, LogicXO.TIMER_TIMEOUT + 5);//добавим 5 милли секунд, что бы точно попасть в timeout :)
            Logs.log('Timer start, game.id=' + game.id + ' checkTimerTimerId=' + checkTimerTimerId, Logs.LEVEL_DETAIL);
        }
    };
};

/**
 * Константный класс.
 * @type {LogicGame}
 */
LogicGame = new LogicGame();
