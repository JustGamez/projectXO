LogicTurnTimer = function () {
    var self = this;

    var startTimestamp = null;

    var timeElapsed = null;

    var run = false;

    var maxTime = 15;

    this.start = function (timestamp) {
        maxTime = LogicXO.turnTimerValue;
        startTimestamp = timestamp;
        timeElapsed = 0;
        run = true;
        PageController.redraw();
        checkSecondsJumping();
    };

    this.stop = function () {
        run = false;
    };

    this.getAllSeconds = function () {
        return maxTime - Math.max(( Math.floor((mtime() - startTimestamp) / 1000)), 0);
    };

    this.getSeconds = function () {
        var allSeconds, seconds, minutes;
        allSeconds = self.getAllSeconds();
        minutes = Math.floor(allSeconds / 60);
        seconds = allSeconds - (minutes ) * 60;
        console.log(allSeconds, minutes, seconds);
        return seconds;
    };

    this.getMinutes = function () {
        var allSeconds, seconds, minutes;
        allSeconds = self.getAllSeconds();
        minutes = Math.floor(allSeconds / 60);
        return minutes;
    };

    /**
     * Таймер JS не гарантирует точность, а нам нужно поточней.
     */
    var checkSecondsJumping = function () {
        if (!run) return;
        //console.log(mtime() - (startTimestamp + timeElapsed));
        if (mtime() - (startTimestamp + timeElapsed) < 1000) {
            setTimeout(checkSecondsJumping, 50);
            return;
        }
        PageController.redraw();
        if (self.getAllSeconds() == 0) {
            self.stop();
            onTimeLeft();
        }
        timeElapsed += 1000;
        setTimeout(checkSecondsJumping, 24);
    };

    var onTimeLeft = function () {
        var game;
        game = LogicGame.getCurrentGame();
        if (!game) {
            Logs.log(Logs.LEVEL_WARNING, "turn time left, but no game found");
            return;
        }
        game = LogicXO.resetTimer(game);
        game = LogicXO.switchTurn(game);
        LogicGame.update(game);
        self.start(game.lastTurnTimestamp);
        SAPIGame.checkTimeLeft(game.id);
        if (game.vsRobot) {
            setTimeout(function () {
                SAPIRobotGame.raiseAIMove(game.id);
            }, 750);
        }
    };
};

LogicTurnTimer = new LogicTurnTimer;