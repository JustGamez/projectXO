ActionsRobotGame = function () {
    var self = this;

    /**
     * Создание игры с роботом.
     * Если ход робота, вызываем его ход.
     * @param userId {Object} id пользователя.
     * @param fieldTypeId {Number} Запрашиваемый тип поля, LogicXO.FIELD_TYPE_*
     * @param signId {Number} Запрашиваемый знак в игре, LogicXO.SIGN_ID_*
     * @param callback {Function}
     */
    this.createGame = function (userId, fieldTypeId, signId, callback) {
        var game;
        Logs.log("ActionsRobotGame.createGame", Logs.LEVEL_DETAIL);
        game = LogicXO.create(userId, signId, fieldTypeId, false, false, true);
        game = LogicXO.chooseSigns(game);
        game = LogicXO.run(game);
        DataGame.save(game, callback);
    };

    /**
     * Выполнить ход искуственным интеллектом.
     * @param gameId {Number}
     */
    this.raiseAIMove = function (gameId) {
        var AICoords;
        var prid = Profiler.start(Profiler.ID_ROBOT_THINKING);
        DataGame.getById(gameId, function (game) {
            if (!game || !game.id) {
                Logs.log("ActionsRobotGame.raiseAIMove. game does not exists.", Logs.LEVEL_WARNING, gameId);
                return;
            }
            if (!game.vsRobot) {
                Logs.log("ActionsRobotGame.raiseAIMove. game is not vsRobot game.", Logs.LEVEL_WARNING, gameId);
                return;
            }
            if (game.status != LogicXO.STATUS_RUN) {
                Logs.log("ActionsRobotGame.raiseAIMove. game is not running.", Logs.LEVEL_WARNING, gameId);
                return;
            }
            /* 0 is a bot id, but bot is not exists */
            if (!LogicXO.isHisTurn(game, 0)) {
                Logs.log("ActionsRobotGame.raiseAIMove. Is not turn of robot.", Logs.LEVEL_WARNING, game);
                return;
            }
            /* Сюда будем ставить ход. */
            DataUser.getById(game.creatorUserId, function (user) {
                AICoords = LogicRobot.generateMovementCoords(game, user);
                if (!LogicXO.userCanDoMove(game, 0, AICoords.x, AICoords.y)) {
                    Logs.log("ActionsRobotGame.raiseAIMove. Robot can not do move.x:" + AICoords.x + ", y:" + AICoords.y, Logs.LEVEL_WARNING, game);
                    return;
                }
                /* Тут мы добавим\обновим линии робота на основании последнего хода. */
                game = LogicXO.setSign(game, AICoords.x, AICoords.y);
                game = LogicXO.switchTurn(game);
                DataGame.save(game, function (game) {
                    CAPIGame.updateMove(game.creatorUserId, game.id, game.lastMove.x, game.lastMove.y);
                    var lookers = LogicGameLookers.get(game.id);
                    for (var userId in lookers) {
                        CAPIGame.updateMove(userId, game.id, game.lastMove.x, game.lastMove.y);
                    }
                    Profiler.stop(Profiler.ID_ROBOT_THINKING, prid);
                });
            });
        });
    };
};

/**
 * Константный класс.
 * @type {ActionsRobotGame}
 */
ActionsRobotGame = new ActionsRobotGame();
