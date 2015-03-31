/**
 * @todo блокировать кнопку "расказать", ато много постов будет, плохо это.
 */
/**
 *
 * @constructor
 */
LogicDrawWallPost = function () {

    var fieldStartX = 50;
    var fieldStartY = 50;

    var canvasDom;

    var show = true;

    var images = [];

    var postText = '';

    this.draw = function (game, user, opponent) {
        init(function () {
            drawPost(game, user, opponent);
        });
    };

    var drawPost = function (game, user, opponent) {
        var context, srcField, srcSignX, srcSignO, cfg, imageX, imageY, src;
        context = getContext();
        cfg = ElementField.getConfigure(game.fieldTypeId);
        /* 1 - рисуем стол */
        drawImage(context, '/images/table.png', -100, -100);
        /* 2 - рисуем поле */
        drawImage(context, cfg.srcField, fieldStartX, fieldStartY);
        /* 3 - рисуем знаки */
        for (var y = 0; y < cfg.fieldSize; y++) {
            for (var x = 0; x < cfg.fieldSize; x++) {
                imageX = fieldStartX + cfg.signOffsetX + x * (cfg.signWidth + cfg.padding);
                imageY = fieldStartY + cfg.signOffsetY + y * (cfg.signHeight + cfg.padding);
                src = '/images/notFound.png';
                switch (game.field[y][x]) {
                    case LogicXO.SIGN_ID_X:
                        src = cfg.srcSignX;
                        break;
                    case LogicXO.SIGN_ID_O:
                        src = cfg.srcSignO;
                        break;
                    case LogicXO.SIGN_ID_Empty:
                        src = cfg.srcSignClear;
                        break;
                }
                drawImage(context, src, imageX, imageY);
            }
        }
        /* 4 - рисуем линю победы, если есть */
        if (game && game.outcomeResults) {
            if (game.outcomeResults.someBodyWin) {
                src = '/images/notFound.png';
                imageX = fieldStartX + cfg.lineOffset + game.outcomeResults.x * (cfg.signWidth + cfg.padding);
                imageY = fieldStartY + cfg.lineOffset + game.outcomeResults.y * (cfg.signHeight + cfg.padding);
                src = cfg.lines[game.outcomeResults.lineId];
                drawImage(context, src, imageX, imageY);
            }
        }
        /* - рисуем побед: */
        drawText(context, 'побед: ' + LogicXO.getScoreByGame(game, user), 77, 447);
        /* - рисуем рейтинг текст вверху */
        drawText(context, 'мой рейтинг: ' + LogicUser.getRatingPosition(), 251, 447);
        /* - оппонент*/
        //console.log(opponent);
        postText = '';
        var opponentNameText = '';
        var text = '';
        if (game.vsRobot) {
            opponentNameText = 'роботом';
        } else {
            opponentNameText = opponent.firstName + " " + opponent.lastName;
        }
        switch (game.status) {
            case LogicXO.STATUS_WAIT:
                text = '';
                break;
            case LogicXO.STATUS_RUN:
                text = 'Я играю с ' + opponentNameText;
                postText = 'Я играю.';
                break;
            case LogicXO.STATUS_SOMEBODY_WIN:
                if (game.winnerId == user.id) {
                    text = 'Я выиграл у ' + opponentNameText;
                    postText = 'Я выиграл!';
                } else {
                    text = 'Я проиграл ' + opponentNameText;
                    postText = 'Я проигарал';
                }
                break;
            case LogicXO.STATUS_NOBODY_WIN:
                text = 'Ничья с ' + opponentNameText;
                postText = 'Игра закончилась ничёй';
                break;
            case LogicXO.STATUS_CLOSE:
                text = 'Игра закончена.' + opponent.firstName + " " + opponent.lastName;
                postText = '';
                break;
        }

        drawText(context, text, 71, 22, 357);
        if (show) {
            canvasDom.show();
            setTimeout(canvasDom.hide, 3500);
        }
        afterDraw();
    };

    var afterDraw = function () {
        Logs.log('photos.getWallUploadServer', Logs.LEVEL_DETAIL);
        VK.api('photos.getWallUploadServer', {}, function (data) {
            /* .response.album_id=, .response.upload_url='', .response.user_id=*/
            Logs.log('photos.getWallUploadServer answered', Logs.LEVEL_DETAIL, data);
            afterGetUploadServer(data.response.upload_url);
        });
    };

    var afterGetUploadServer = function (uploadUrl) {
        var png, fileId;
        Logs.log('uploading... to xoServer:' + uploadUrl, Logs.LEVEL_DETAIL);
        // to xo server
        png = getBase64PNG();
        png = png.replace('data:image/png;base64,', '');
        png = png.match(/.{1,60000}/g);
        //console.log(png);
        fileId = LogicUser.getCurrentUser().id.toString() + "_" + mtime().toString();
        png.forEach(function (chunk) {
            SAPIUser.sendWallPost(chunk, fileId, false);
        });
        SAPIUser.sendWallPost(uploadUrl, fileId, true);
    };

    this.onUploadComplete = function (vkResponse) {
        //@todo id for every requests...
        vkResponse = JSON.parse(vkResponse);
        //console.log(vkResponse);
        VK.api('photos.saveWallPhoto', {
            user_id: LogicUser.getCurrentUser().socNetUserId,
            photo: vkResponse.photo,
            server: vkResponse.server,
            hash: vkResponse.hash
        }, function (answer) {
            //console.log("after save to wall answer:", answer);
            createPostOnWall(answer);
        });

    };

    var createPostOnWall = function (answer) {
        //console.log(answer);
        VK.api('wall.post', {
            owner_id: LogicUser.getCurrentUser().socNetUserId,
            message: postText,// +' \nhttp://vk.com/krestik.nolik',
            attachments: 'photo' + LogicUser.getCurrentUser().socNetUserId + '_' + answer.response[0].id + ',http://vk.com/krestik.nolik'
        }, function (answer) {
            //console.log('answer after post on wall', answer);
        });
    };

    var init = function (callback) {
        loadImages([
            '/images/fields/15x15Field.png',
            '/images/fields/15x15SignX.png',
            '/images/fields/15x15SignO.png',
            '/images/fields/15x15SignClear.png',
            '/images/fields/3x3Field.png',
            '/images/fields/3x3SignX.png',
            '/images/fields/3x3SignO.png',
            '/images/fields/3x3SignClear.png',
            '/images/table.png',
            '/images/fields/15x15LineHorizontal.png',
            '/images/fields/15x15LineVertical.png',
            '/images/fields/15x15LineLeftToDown.png',
            '/images/fields/15x15LineLeftToUp.png',
            '/images/fields/3x3LineVertical.png',
            '/images/fields/3x3LineHorizontal.png',
            '/images/fields/3x3LineLeftToUp.png',
            '/images/fields/3x3LineLeftToDown.png',
            '/images/font/1025.png',
            '/images/font/1040.png',
            '/images/font/1041.png',
            '/images/font/1042.png',
            '/images/font/1043.png',
            '/images/font/1044.png',
            '/images/font/1045.png',
            '/images/font/1046.png',
            '/images/font/1047.png',
            '/images/font/1048.png',
            '/images/font/1049.png',
            '/images/font/1050.png',
            '/images/font/1051.png',
            '/images/font/1052.png',
            '/images/font/1053.png',
            '/images/font/1054.png',
            '/images/font/1055.png',
            '/images/font/1056.png',
            '/images/font/1057.png',
            '/images/font/1058.png',
            '/images/font/1059.png',
            '/images/font/1060.png',
            '/images/font/1061.png',
            '/images/font/1062.png',
            '/images/font/1063.png',
            '/images/font/1064.png',
            '/images/font/1065.png',
            '/images/font/1066.png',
            '/images/font/1067.png',
            '/images/font/1068.png',
            '/images/font/1069.png',
            '/images/font/1070.png',
            '/images/font/1071.png',
            '/images/font/1072.png',
            '/images/font/1073.png',
            '/images/font/1074.png',
            '/images/font/1075.png',
            '/images/font/1076.png',
            '/images/font/1077.png',
            '/images/font/1078.png',
            '/images/font/1079.png',
            '/images/font/1080.png',
            '/images/font/1081.png',
            '/images/font/1082.png',
            '/images/font/1083.png',
            '/images/font/1084.png',
            '/images/font/1085.png',
            '/images/font/1086.png',
            '/images/font/1087.png',
            '/images/font/1088.png',
            '/images/font/1089.png',
            '/images/font/1090.png',
            '/images/font/1091.png',
            '/images/font/1092.png',
            '/images/font/1093.png',
            '/images/font/1094.png',
            '/images/font/1095.png',
            '/images/font/1096.png',
            '/images/font/1097.png',
            '/images/font/1098.png',
            '/images/font/1099.png',
            '/images/font/1100.png',
            '/images/font/1101.png',
            '/images/font/1102.png',
            '/images/font/1103.png',
            '/images/font/1105.png',
            '/images/font/32.png',
            '/images/font/33.png',
            '/images/font/45.png',
            '/images/font/46.png',
            '/images/font/48.png',
            '/images/font/49.png',
            '/images/font/50.png',
            '/images/font/51.png',
            '/images/font/52.png',
            '/images/font/53.png',
            '/images/font/54.png',
            '/images/font/55.png',
            '/images/font/56.png',
            '/images/font/57.png',
            '/images/font/58.png'
        ], callback);
    };

    var drawText = function (context, text, offsetX, offsetY, width) {
        var textHTML, symbol_url, charCode, existsSymbols, symbol, x, y, resultWidth;
        existsSymbols = '1234567890абвгдеёжзийклмнопрстуфхцчшщьыъэюя.!:- АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
        x = offsetX;
        y = offsetY;
        resultWidth = 0;
        for (var i in text) {
            symbol = text[i];
            charCode = text.charCodeAt(i);
            /* feed line symbol: 0xAh, 10d, \n */
            if (existsSymbols.indexOf(symbol) == -1) {
                //fuck off! @fuckOff @todo
                Logs.log("LogicDrawWallPost. symbol does not found!", Logs.LEVEL_WARNING);
            } else {
                symbol_url = "/images/font/" + charCode + ".png";
                resultWidth += images[symbol_url].width;
            }
        }
        if (width) {
            x += (width - resultWidth) / 2;
        }
        for (var i in text) {
            symbol = text[i];
            charCode = text.charCodeAt(i);
            /* feed line symbol: 0xAh, 10d, \n */
            if (charCode == 10) {
                y += 28;
                continue;
            }
            if (existsSymbols.indexOf(symbol) == -1) {
                //fuck off! @fuckOff @todo
                Logs.log("LogicDrawWallPost. symbol does not found!", Logs.LEVEL_WARNING);
            } else {
                symbol_url = "/images/font/" + charCode + ".png";
                drawImage(context, symbol_url, x, y);
                x += images[symbol_url].width;
            }
        }
    };

    var getCanvas = function () {
        if (!canvasDom) {
            canvasDom = GUI.createCanvas(undefined, {
                x: 0,
                y: 0
            });
            //@todo size to 500x500 or somethink like this.
            canvasDom.__dom.setAttribute('height', 500);
            canvasDom.__dom.setAttribute('width', 500);
        }
        return canvasDom;
    };

    var getContext = function () {
        return getCanvas().__dom.getContext('2d');
    };

    var loadImages = function (pathList, callback) {
        var loaded;
        loaded = 0;
        pathList.forEach(function (path) {
            if (!images[path]) {
                loadImage(path, function () {
                    loaded++;
                    if (loaded == pathList.length) {
                        callback();
                    }
                });
            } else {
                loaded++;
                if (loaded == pathList.length) {
                    callback();
                }
            }
        });
    };

    var loadImage = function (path, callback) {
        images[path] = new Image;
        images[path].onload = function () {
            callback();
        };
        images[path].src = path;
    };

    var drawImage = function (context, path, x, y, width, height) {
        if (!images[path]) {
            Logs.log("LogicDrawWallPost. Image not found " + path, Logs.LEVEL_WARNING);
        }
        if (!x) x = 0;
        if (!y) y = 0;
        if (!width) width = images[path].width;
        if (!height)height = images[path].height;
        context.drawImage(images[path], x, y, width, height);
    };

    var getBase64PNG = function () {
        return getCanvas().__dom.toDataURL('image/png');
    }
};

/**
 * константный класс.
 * @type {LogicDrawWallPost}
 */
LogicDrawWallPost = new LogicDrawWallPost();