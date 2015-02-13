KrispiCases = function () {
    var self = this;

    this.intensivityInterval = 0;

    this.variant1 = function () {
        var deviation = function () {
            return Math.round(Math.random() * 100) - 50;
        };
        setInterval(self.SAPIChat, self.intensivityInterval + deviation());
        setInterval(self.SAPIGameСreateRandomGame, self.intensivityInterval + deviation());
        setInterval(self.SAPIGameCancelRandomGame, self.intensivityInterval * 3 + deviation());
        setInterval(self.SAPIGameDoMove, self.intensivityInterval * 2 + deviation());
        setInterval(self.SAPIInvites, self.intensivityInterval + deviation());
        setInterval(self.SAPIRating, self.intensivityInterval + deviation());
        setInterval(self.SAPIRobotGame, self.intensivityInterval + deviation());
        setInterval(self.SAPIUser, self.intensivityInterval + deviation());
        setInterval(self.SAPIUserState, self.intensivityInterval + deviation());
        /* Умножим на большое число, всё таки там 140 картинок пачкой запрашиваются. */
        setInterval(self.getImages, self.intensivityInterval * 10 + deviation());
        setInterval(self.loadClient, self.intensivityInterval + deviation());
    };

    /**
     * Нагрузка, загрузка клиента.
     * state: completed.
     */
    this.loadClient = function () {
        var list, xmlhttp;
        list = [
            '/clientCode?api_url=http://api.vk.com/api.php&api_id=4467180&api_settings=8199&viewer_id=12578187&viewer_type=0&sid=c57ce42cb7fefaf59d1456800cdc86a9c732b7d9e99a84cc6e00147150fd3d34532c97317c695edfdcb7c&secret=3704c9427d&access_token=4fe7830d6ecd2eeac26cc5a3d009fa1dcf6cb268765347fcda81f97405817420835122f29cf5834afbedf&user_id=0&group_id=0&is_app_user=1&auth_key=1bb91dabd1b8e7913c3ebb052f7d2a39&language=0&parent_language=0&ad_info=ElsdCQBeRFJsBAxcAwJSXHt5C0Q8HTJXUVBBJRVBNwoIFjI2HA8E&is_secure=0&ads_app_id=4467180_e18d649ad35faed323&referrer=unknown&lc_name=fe8f8c15&hide_picture=false&picture_opacities=0.05',
            '/clientCode?api_url=http://api.vk.com/api.php&api_id=4467180&api_settings=8199&viewer_id=235670763&viewer_type=1&sid=78213a6505f0be90ebeea2c0513b0ff4de81c57db58ca098b19afb0378c7a444f9630664b987ff6c71e5a&secret=bd90b54c7a&access_token=d07ae23289cda2e7c65d841ddb89b2f5d4aca969455dd8bbc489b831c359cd642a9f809c90a0d596d9983&user_id=12578187&group_id=0&is_app_user=1&auth_key=d775df44d5898c596c7f46387ea4d3e4&language=0&parent_language=0&ad_info=ElsdCQNfRFNjBQNdFkVUXiN2AFtzBx5pU1BXIgZUJlIEAWcgAUoLQg==&is_secure=0&ads_app_id=4467180_7e8ab7a5346effbe9e&referrer=unknown&lc_name=7ec3b40f&hash=&hide_picture=false&picture_opacities=0.05',
            '/clientCode?t=someData'
        ];
        for (var i = 0; i < list.length; i++) {
            xmlhttp = new XMLHttpRequest;
            xmlhttp.open('GET', list[i], true);
            xmlhttp.send();
        }
    };

    /**
     * Нагрузка на загрузку картинок.
     * state: completed.
     */
    this.getImages = function () {
        var list = ['/images/buttons/menuActive.png?t=1',
            '/images/buttons/menuHover.png?t=1',
            '/images/buttons/menuRest.png?t=1',
            '/images/buttons/playActive.png?t=1',
            '/images/buttons/playHover.png?t=1',
            '/images/buttons/playRest.png?t=1',
            '/images/buttons/ratingActive.png?t=1',
            '/images/buttons/ratingHover.png?t=1',
            '/images/buttons/ratingMenuActive.png?t=1',
            '/images/buttons/ratingMenuHover.png?t=1',
            '/images/buttons/ratingMenuRest.png?t=1',
            '/images/buttons/ratingRest.png?t=1',
            '/images/fields/15x15Field.png?t=1',
            '/images/fields/15x15LineHorizontal.png?t=1',
            '/images/fields/15x15LineLeftToDown.png?t=1',
            '/images/fields/15x15LineLeftToUp.png?t=1',
            '/images/fields/15x15LineVertical.png?t=1',
            '/images/fields/15x15SignClear.png?t=1',
            '/images/fields/15x15SignO.png?t=1',
            '/images/fields/15x15SignX.png?t=1',
            '/images/fields/3x3Field.png?t=1',
            '/images/fields/3x3LineHorizontal.png?t=1',
            '/images/fields/3x3LineLeftToDown.png?t=1',
            '/images/fields/3x3LineLeftToUp.png?t=1',
            '/images/fields/3x3LineVertical.png?t=1',
            '/images/fields/3x3SignClear.png?t=1',
            '/images/fields/3x3SignO.png?t=1',
            '/images/fields/3x3SignX.png?t=1',
            '/images/flags/vsRobotActive.png?t=1',
            '/images/flags/vsRobotHover.png?t=1',
            '/images/flags/vsRobotRest.png?t=1',
            '/images/font/1025.png?t=1',
            '/images/font/1040.png?t=1',
            '/images/font/1041.png?t=1',
            '/images/font/1042.png?t=1',
            '/images/font/1043.png?t=1',
            '/images/font/1044.png?t=1',
            '/images/font/1045.png?t=1',
            '/images/font/1046.png?t=1',
            '/images/font/1047.png?t=1',
            '/images/font/1048.png?t=1',
            '/images/font/1049.png?t=1',
            '/images/font/1050.png?t=1',
            '/images/font/1051.png?t=1',
            '/images/font/1052.png?t=1',
            '/images/font/1053.png?t=1',
            '/images/font/1054.png?t=1',
            '/images/font/1055.png?t=1',
            '/images/font/1056.png?t=1',
            '/images/font/1057.png?t=1',
            '/images/font/1058.png?t=1',
            '/images/font/1059.png?t=1',
            '/images/font/1060.png?t=1',
            '/images/font/1061.png?t=1',
            '/images/font/1062.png?t=1',
            '/images/font/1063.png?t=1',
            '/images/font/1064.png?t=1',
            '/images/font/1065.png?t=1',
            '/images/font/1066.png?t=1',
            '/images/font/1067.png?t=1',
            '/images/font/1068.png?t=1',
            '/images/font/1069.png?t=1',
            '/images/font/1070.png?t=1',
            '/images/font/1071.png?t=1',
            '/images/font/1072.png?t=1',
            '/images/font/1073.png?t=1',
            '/images/font/1074.png?t=1',
            '/images/font/1075.png?t=1',
            '/images/font/1076.png?t=1',
            '/images/font/1077.png?t=1',
            '/images/font/1078.png?t=1',
            '/images/font/1079.png?t=1',
            '/images/font/1080.png?t=1',
            '/images/font/1081.png?t=1',
            '/images/font/1082.png?t=1',
            '/images/font/1083.png?t=1',
            '/images/font/1084.png?t=1',
            '/images/font/1085.png?t=1',
            '/images/font/1086.png?t=1',
            '/images/font/1087.png?t=1',
            '/images/font/1088.png?t=1',
            '/images/font/1089.png?t=1',
            '/images/font/1090.png?t=1',
            '/images/font/1091.png?t=1',
            '/images/font/1092.png?t=1',
            '/images/font/1093.png?t=1',
            '/images/font/1094.png?t=1',
            '/images/font/1095.png?t=1',
            '/images/font/1096.png?t=1',
            '/images/font/1097.png?t=1',
            '/images/font/1098.png?t=1',
            '/images/font/1099.png?t=1',
            '/images/font/1100.png?t=1',
            '/images/font/1101.png?t=1',
            '/images/font/1102.png?t=1',
            '/images/font/1103.png?t=1',
            '/images/font/1105.png?t=1',
            '/images/font/32.png?t=1',
            '/images/font/33.png?t=1',
            '/images/font/45.png?t=1',
            '/images/font/46.png?t=1',
            '/images/font/48.png?t=1',
            '/images/font/49.png?t=1',
            '/images/font/50.png?t=1',
            '/images/font/51.png?t=1',
            '/images/font/52.png?t=1',
            '/images/font/53.png?t=1',
            '/images/font/54.png?t=1',
            '/images/font/55.png?t=1',
            '/images/font/56.png?t=1',
            '/images/font/57.png?t=1',
            '/images/font/58.png?t=1',
            '/images/photo/buttonInviteActive.png?t=1',
            '/images/photo/buttonInviteHover.png?t=1',
            '/images/photo/buttonInviteRest.png?t=1',
            '/images/photo/buttonLetsPlayActive.png?t=1',
            '/images/photo/buttonLetsPlayHover.png?t=1',
            '/images/photo/buttonLetsPlayRest.png?t=1',
            '/images/photo/camera_c.gif?t=1',
            '/images/photo/dummy.png?t=1',
            '/images/photo/dummyHover.png?t=1',
            '/images/photo/iconOffline.png?t=1',
            '/images/photo/iconOnline.png?t=1',
            '/images/photo/indicatorWait.png?t=1',
            '/images/radio/field15x15Active.png?t=1',
            '/images/radio/field15x15Hover.png?t=1',
            '/images/radio/field15x15Rest.png?t=1',
            '/images/radio/field3x3Active.png?t=1',
            '/images/radio/field3x3Hover.png?t=1',
            '/images/radio/field3x3Rest.png?t=1',
            '/images/radio/signOActive.png?t=1',
            '/images/radio/signOHover.png?t=1',
            '/images/radio/signORest.png?t=1',
            '/images/radio/signRandomActive.png?t=1',
            '/images/radio/signRandomHover.png?t=1',
            '/images/radio/signRandomRest.png?t=1',
            '/images/radio/signXActive.png?t=1',
            '/images/radio/signXHover.png?t=1',
            '/images/radio/signXRest.png?t=1',
            '/images/table.png?t=1'];

        var xmlhttp;
        for (var i = 0; i < list.length; i++) {
            xmlhttp = new XMLHttpRequest;
            xmlhttp.open('GET', list[i], true);
            xmlhttp.send();
        }
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
     * Нагрузка SAPIGame do move.s
     * state: completed.
     * @constructor
     */
    this.SAPIGameDoMove = function () {
        var allGames = DataGames.getAll();
        /* Переберем каждую отдельную, активную игру, и сделаем в ней ход. */
        var game, fieldSize;

        for (var i in allGames) {
            game = allGames[i];
            if (game.status != LogicXO.STATUS_RUN) {
                continue;
            }
            if (LogicXO.userCanDoMove(game, LogicKrispiRobot.authorizedUserId, game.lastX, game.lastY)) {
                if (game.isRandom) {
                    SAPIGame.doMove(game.id, game.lastX, game.lastY, true);
                }
                if (game.vsRobot) {
                    SAPIRobotGame.doMove(game.id, game.lastX, game.lastY, true);
                }
            }
            fieldSize = LogicXO.getFieldSize(game.fieldTypeId);
            game.lastX++;
            if (game.lastX >= fieldSize) {
                game.lastX = 0;
                game.lastY++;
            }
            if (game.lastY >= fieldSize) {
                if (game.isRandom) {
                    SAPIGame.closeRandomGame(game.id);
                }
                if (game.vsRobot) {
                    SAPIRobotGame.closeGame(game.id);
                    SAPIRobotGame.checkWinner(game.id);
                }
            }
        }
    };

    /**
     * Нагрузка SAPIGame cancel random game.
     * state: completed.
     * @constructor
     */
    this.SAPIGameCancelRandomGame = function () {
        SAPIGame.cancelRandomGameRequests();
    };

    /**
     * Нагрузка SAPIGame. create random game.
     * state: completed.
     * @constructor
     */
    this.SAPIGameСreateRandomGame = function () {
        SAPIGame.requestRandomGame(LogicXO.FIELD_TYPE_15X15, LogicXO.SIGN_ID_Empty);
        SAPIGame.requestRandomGame(LogicXO.FIELD_TYPE_15X15, LogicXO.SIGN_ID_X);
        SAPIGame.requestRandomGame(LogicXO.FIELD_TYPE_15X15, LogicXO.SIGN_ID_O);
        SAPIGame.requestRandomGame(LogicXO.FIELD_TYPE_3X3, LogicXO.SIGN_ID_Empty);
        SAPIGame.requestRandomGame(LogicXO.FIELD_TYPE_3X3, LogicXO.SIGN_ID_X);
        SAPIGame.requestRandomGame(LogicXO.FIELD_TYPE_3X3, LogicXO.SIGN_ID_O);
    };

    /**
     * Нагрузка SAPIInvites.
     * state: uncompleted.
     * @constructor
     */
    this.SAPIInvites = function () {
        var uid, n;
        n = Math.round(Math.random() * LogicKrispiRobot.allUserIds.length) - 1;
        uid = LogicKrispiRobot.allUserIds[n];
        SAPIInvites.send(LogicKrispiRobot.authorizedUserId, uid);
    };

    /**
     * Нагрузка SAPIRating.
     * state: completed.
     * @constructor
     */
    this.SAPIRating = function () {
        SAPIRating.sendMeTopList();
    };

    /**
     * Нагрузка SAPIRobot.
     * state: completed.
     * @constructor
     */
    this.SAPIRobotGame = function () {
        SAPIRobotGame.startGame(LogicXO.FIELD_TYPE_15X15, LogicXO.SIGN_ID_Empty);
        SAPIRobotGame.startGame(LogicXO.FIELD_TYPE_15X15, LogicXO.SIGN_ID_X);
        SAPIRobotGame.startGame(LogicXO.FIELD_TYPE_15X15, LogicXO.SIGN_ID_O);
        SAPIRobotGame.startGame(LogicXO.FIELD_TYPE_3X3, LogicXO.SIGN_ID_Empty);
        SAPIRobotGame.startGame(LogicXO.FIELD_TYPE_3X3, LogicXO.SIGN_ID_X);
        SAPIRobotGame.startGame(LogicXO.FIELD_TYPE_3X3, LogicXO.SIGN_ID_O);
    };

    /**
     * Нагрузка SAPIUser.
     * state: uncompleted.
     * @constructor
     */
    this.SAPIUser = function () {
        SAPIUser.sendMeOnlineCount();
        /* @todo только после включения кэширования соцнетапи-запросов. */
        SAPIUser.sendMeUserInfo(rndId());
        SAPIUser.sendMeFriends(rndId());
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
        id = Math.round(Math.random() * 1500000) + 1;
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