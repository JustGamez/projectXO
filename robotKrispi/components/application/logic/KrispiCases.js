KrispiCases = function () {
    var self = this;

    this.intensivityInterval = 0;

    this.variant1 = function () {
        var deviation = function () {
            return Math.round(Math.random() * 100) - 50;
        };
        setInterval(self.SAPIChat, self.intensivityInterval + deviation());
        setInterval(self.SAPIGame, self.intensivityInterval + deviation());
        setInterval(self.SAPIInvites, self.intensivityInterval + deviation());
        setInterval(self.SAPIRating, self.intensivityInterval + deviation());
        setInterval(self.SAPIRobotGame, self.intensivityInterval + deviation());
        setInterval(self.SAPIUser, self.intensivityInterval + deviation());
        setInterval(self.SAPIUserState, self.intensivityInterval + deviation());
    };


    /**
     * Нагрузка SAPIChat
     * state: completed.
     * @constructor
     */
    this.SAPIChat = function () {
        SAPIChat.sendMeLastMessages();
        SAPIChat.sendMessage(rndMessageString());
    };

    /**
     * Нагрузка SAPIGame.
     * state: uncompleted.
     * @constructor
     */
    this.SAPIGame = function () {
        //SAPIGame.cancelRandomGameRequests();
        SAPIGame.requestRandomGame(LogicXO.FIELD_TYPE_15X15, LogicXO.SIGN_ID_Empty);
        var runGames = DataGames.getRunGames();
        /* Переберем каждую отдельную, активную игру, и сделаем в ней ход. */
        var game, fieldSize;
        for (var i in runGames) {
            game = runGames[i];
            // if run
            // if is our turn
            // if field is empty
            if (LogicXO.userCanDoMove(game, LogicKrispiRobot.authorizedUserId, game.lastX, game.lastY)) {
                fieldSize = LogicXO.getFieldSize(game.fieldTypeId);
                SAPIGame.doMove(game.id, game.lastX, game.lastY, false);
                console.log('doMove:x:' + game.lastX + ' y:' + game.lastY + ' id:' + game.id);
            }
            game.lastX++;
            if (game.lastX >= fieldSize) {
                game.lastX = 0;
                game.lastY++;
            }
            if (game.lastY >= fieldSize) {
                console.log('closeRandomGame:' + game.lastX + ' ' + game.lastY + ' ' + game.id);
                SAPIGame.closeRandomGame(game.id);
            }
        }
    };

    /**
     * Нагрузка SAPIInvites.
     * state: uncompleted.
     * @constructor
     */
    this.SAPIInvites = function () {
        SAPIInvites.send(rndId(), rndId());
    };

    /**
     * Нагрузка SAPIRating.
     * state: uncompleted.
     * @constructor
     */
    this.SAPIRating = function () {
        SAPIRating.sendMeTopList();
    };

    /**
     * Нагрузка SAPIRobot.
     * state: uncompleted.
     * @constructor
     */
    this.SAPIRobotGame = function () {

    };

    /**
     * Нагрузка SAPIUser.
     * state: uncompleted.
     * @constructor
     */
    this.SAPIUser = function () {
        SAPIUser.sendMeOnlineCount();
        /* @todo только после включения кэширования соцнетапи-запросов. */
        //SAPIUser.sendMeUserInfo(rndId());
        //SAPIUser.sendMeFriends(rndId());
    };

    /**
     * Нагрузка SAPIUserState.
     * state: completed.
     * @constructor
     */
    this.SAPIUserState = function () {
        SAPIUserState.isBusy();
        SAPIUserState.isNoBusy();
        /* Иногда должно быть и нуль. */
        SAPIUserState.onGame(rndId() - 1);
    };

    /**
     * Будем использовать случайные айдишники.
     * @returns {number}
     */
    var rndId = function () {
        var id;
        id = Math.round(Math.random() * 1500) + 1;
        return id;
    };

    var rndMessageString = function () {
        var text = "";
        var possibilities = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789АБВГДЕЁЖЗИКЛМНОПРСТУФХЦЧШЩЬЫЪЭЮЯабвгдеёжзийклмнопрстуфхцчшщьыъэюя.,:;";
        var length = possibilities.length;
        for (var i = 0; i < 100; i++) {
            text += possibilities.charAt(Math.floor(Math.random() * length));
        }
        return text;
    };
};

/**
 * Статичный класс.
 * @type {KrispiCases}
 */
KrispiCases = new KrispiCases();