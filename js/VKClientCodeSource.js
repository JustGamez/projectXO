
/* ../client/system/functions.js */
/**
 * В этом файле содержаться системные функции.
 */

/**
 * Логи на этапах создания.
 * @param message
 */
log = function (message) {
    console.log(message);
};

/**
 * Ошибка создания, выводит сообщение и завершает работу.
 * @param message
 */
error = function (message) {
    console.log("Ошибка: " + message);
    process.exit();
};

/* Функционал для последовательной инициализации компонент. */
var sequencedInitStack = [];
var sequencedInitBlocked = false;

/**
 * Выполнить очередной инит по завершению всех предыдущих.
 * @param initFunction {function}
 */
sequencedInit = function (initFunction) {
    sequencedInitStack.push(initFunction);
    tryInitNext();
};

var tryInitNext = function () {
    if (!sequencedInitStack.length) {
        log("Init stack empty now.");
        return;
    }
    if (sequencedInitBlocked) return;
    sequencedInitBlocked = true;
    initFunction = sequencedInitStack.shift();
    initFunction(function () {
        sequencedInitBlocked = false;
        tryInitNext();
    });
};

!function(a){"use strict";function b(a,b){var c=(65535&a)+(65535&b),d=(a>>16)+(b>>16)+(c>>16);return d<<16|65535&c}function c(a,b){return a<<b|a>>>32-b}function d(a,d,e,f,g,h){return b(c(b(b(d,a),b(f,h)),g),e)}function e(a,b,c,e,f,g,h){return d(b&c|~b&e,a,b,f,g,h)}function f(a,b,c,e,f,g,h){return d(b&e|c&~e,a,b,f,g,h)}function g(a,b,c,e,f,g,h){return d(b^c^e,a,b,f,g,h)}function h(a,b,c,e,f,g,h){return d(c^(b|~e),a,b,f,g,h)}function i(a,c){a[c>>5]|=128<<c%32,a[(c+64>>>9<<4)+14]=c;var d,i,j,k,l,m=1732584193,n=-271733879,o=-1732584194,p=271733878;for(d=0;d<a.length;d+=16)i=m,j=n,k=o,l=p,m=e(m,n,o,p,a[d],7,-680876936),p=e(p,m,n,o,a[d+1],12,-389564586),o=e(o,p,m,n,a[d+2],17,606105819),n=e(n,o,p,m,a[d+3],22,-1044525330),m=e(m,n,o,p,a[d+4],7,-176418897),p=e(p,m,n,o,a[d+5],12,1200080426),o=e(o,p,m,n,a[d+6],17,-1473231341),n=e(n,o,p,m,a[d+7],22,-45705983),m=e(m,n,o,p,a[d+8],7,1770035416),p=e(p,m,n,o,a[d+9],12,-1958414417),o=e(o,p,m,n,a[d+10],17,-42063),n=e(n,o,p,m,a[d+11],22,-1990404162),m=e(m,n,o,p,a[d+12],7,1804603682),p=e(p,m,n,o,a[d+13],12,-40341101),o=e(o,p,m,n,a[d+14],17,-1502002290),n=e(n,o,p,m,a[d+15],22,1236535329),m=f(m,n,o,p,a[d+1],5,-165796510),p=f(p,m,n,o,a[d+6],9,-1069501632),o=f(o,p,m,n,a[d+11],14,643717713),n=f(n,o,p,m,a[d],20,-373897302),m=f(m,n,o,p,a[d+5],5,-701558691),p=f(p,m,n,o,a[d+10],9,38016083),o=f(o,p,m,n,a[d+15],14,-660478335),n=f(n,o,p,m,a[d+4],20,-405537848),m=f(m,n,o,p,a[d+9],5,568446438),p=f(p,m,n,o,a[d+14],9,-1019803690),o=f(o,p,m,n,a[d+3],14,-187363961),n=f(n,o,p,m,a[d+8],20,1163531501),m=f(m,n,o,p,a[d+13],5,-1444681467),p=f(p,m,n,o,a[d+2],9,-51403784),o=f(o,p,m,n,a[d+7],14,1735328473),n=f(n,o,p,m,a[d+12],20,-1926607734),m=g(m,n,o,p,a[d+5],4,-378558),p=g(p,m,n,o,a[d+8],11,-2022574463),o=g(o,p,m,n,a[d+11],16,1839030562),n=g(n,o,p,m,a[d+14],23,-35309556),m=g(m,n,o,p,a[d+1],4,-1530992060),p=g(p,m,n,o,a[d+4],11,1272893353),o=g(o,p,m,n,a[d+7],16,-155497632),n=g(n,o,p,m,a[d+10],23,-1094730640),m=g(m,n,o,p,a[d+13],4,681279174),p=g(p,m,n,o,a[d],11,-358537222),o=g(o,p,m,n,a[d+3],16,-722521979),n=g(n,o,p,m,a[d+6],23,76029189),m=g(m,n,o,p,a[d+9],4,-640364487),p=g(p,m,n,o,a[d+12],11,-421815835),o=g(o,p,m,n,a[d+15],16,530742520),n=g(n,o,p,m,a[d+2],23,-995338651),m=h(m,n,o,p,a[d],6,-198630844),p=h(p,m,n,o,a[d+7],10,1126891415),o=h(o,p,m,n,a[d+14],15,-1416354905),n=h(n,o,p,m,a[d+5],21,-57434055),m=h(m,n,o,p,a[d+12],6,1700485571),p=h(p,m,n,o,a[d+3],10,-1894986606),o=h(o,p,m,n,a[d+10],15,-1051523),n=h(n,o,p,m,a[d+1],21,-2054922799),m=h(m,n,o,p,a[d+8],6,1873313359),p=h(p,m,n,o,a[d+15],10,-30611744),o=h(o,p,m,n,a[d+6],15,-1560198380),n=h(n,o,p,m,a[d+13],21,1309151649),m=h(m,n,o,p,a[d+4],6,-145523070),p=h(p,m,n,o,a[d+11],10,-1120210379),o=h(o,p,m,n,a[d+2],15,718787259),n=h(n,o,p,m,a[d+9],21,-343485551),m=b(m,i),n=b(n,j),o=b(o,k),p=b(p,l);return[m,n,o,p]}function j(a){var b,c="";for(b=0;b<32*a.length;b+=8)c+=String.fromCharCode(a[b>>5]>>>b%32&255);return c}function k(a){var b,c=[];for(c[(a.length>>2)-1]=void 0,b=0;b<c.length;b+=1)c[b]=0;for(b=0;b<8*a.length;b+=8)c[b>>5]|=(255&a.charCodeAt(b/8))<<b%32;return c}function l(a){return j(i(k(a),8*a.length))}function m(a,b){var c,d,e=k(a),f=[],g=[];for(f[15]=g[15]=void 0,e.length>16&&(e=i(e,8*a.length)),c=0;16>c;c+=1)f[c]=909522486^e[c],g[c]=1549556828^e[c];return d=i(f.concat(k(b)),512+8*b.length),j(i(g.concat(d),640))}function n(a){var b,c,d="0123456789abcdef",e="";for(c=0;c<a.length;c+=1)b=a.charCodeAt(c),e+=d.charAt(b>>>4&15)+d.charAt(15&b);return e}function o(a){return unescape(encodeURIComponent(a))}function p(a){return l(o(a))}function q(a){return n(p(a))}function r(a,b){return m(o(a),o(b))}function s(a,b){return n(r(a,b))}function t(a,b,c){return b?c?r(b,a):s(b,a):c?p(a):q(a)}"function"==typeof define&&define.amd?define(function(){return t}):a.md5=t}(this);

/**
 *
 *  Javascript string pad
 *  http://www.webtoolkit.info/
 *
 **/

var STR_PAD_LEFT = 1;
var STR_PAD_RIGHT = 2;
var STR_PAD_BOTH = 3;

str_pad = function (str, len, pad, dir) {

    if (typeof(len) == "undefined") { var len = 0; }
    if (typeof(pad) == "undefined") { var pad = ' '; }
    if (typeof(dir) == "undefined") { var dir = STR_PAD_RIGHT; }

    if (len + 1 >= str.length) {

        switch (dir){
            case STR_PAD_LEFT:
                str = Array(len + 1 - str.length).join(pad) + str;
                break;

            case STR_PAD_BOTH:
                var right = Math.ceil((padlen = len - str.length) / 2);
                var left = padlen - right;
                str = Array(left+1).join(pad) + str + Array(right+1).join(pad);
                break;

            default:
                str = str + Array(len + 1 - str.length).join(pad);
                break;
        } // switch
    }
    return str;
};

/**
 * Возвращает время в секундах.
 */
time = function () {
    return Math.floor((new Date()).getTime() / 1000);
};
if(window["functions"] != undefined){window["functions"].__path="../client/system/functions.js"};

/* ../client/components/application/capi/CAPIChat.js */
CAPIChat = function () {

    /**
     * Обновить данные о пользователи.
     * @param cntx {Object} контекст соединения.
     * @param userId {Number} сообщение
     * @param text {String} сообщение
     * @param timestamp {Number} сообщение
     */
    this.getNewMessage = function (cntx, userId, text, timestamp) {
        text = LogicChatCache.censureIt(text);
        LogicChatCache.add(userId, text, timestamp, false);
        pageController.redraw();
    };
};

/**
 * Константный класс.
 * @type {CAPIChat}
 */
CAPIChat = new CAPIChat();if(window["CAPIChat"] != undefined){window["CAPIChat"].__path="../client/components/application/capi/CAPIChat.js"};

/* ../client/components/application/capi/CAPIGame.js */
CAPIGame = function () {

    /**
     * Обновить данные об игре.
     * @param cntx {Object} контекст соединения.
     * @param game {Object} данные об игре.
     */
    this.updateInfo = function (cntx, game) {
        LogicGame.update(game);
    };

    /**
     * Оповещение, что игра создана.
     * @param cntx {Object} контекст соединения.
     * @param gameId {int} id игры.
     */
    this.gameCreated = function (cntx, gameId) {
        var current, created;
        current = LogicGame.getCurrentGame();
        created = LogicGame.getById(gameId);
        if (current && !current.finish) {
            SAPIGame.close(gameId);
        } else {
            LogicGame.setCurrentGameId(gameId);
            if (created.vsRobot && LogicXO.isHisTurn(created, 0)) {
                setTimeout(function () {
                    SAPIRobotGame.raiseAIMove(created.id)
                }, 750);
            }
            pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_CHAT, PageController.PAGE_ID_ONLINE_SCORE, PageController.PAGE_ID_XO_GAME]);
        }
    };

    this.updateMove = function (cntx, gameId, x, y) {
        var game, winLine;
        game = LogicGame.getById(gameId);
        if (!game) {
            Logs.log("CAPIGAme.updateMove some error.", Logs.LEVEL_ERROR);
            return;
        }
        /* Мы ставим это у себя. */
        game = LogicXO.setSign(game, x, y);
        game = LogicXO.switchTurn(game);
        LogicGame.update(game);
        Sounds.play('/sounds/turn.mp3');
        if (game.vsRobot) {
            winLine = LogicXO.findWinLine(game);
            LogicXO.setOutcomeResults(game, winLine);
            if (game.outcomeResults.someBodyWin || game.outcomeResults.noBodyWin) {
                SAPIGame.checkWinner(gameId);
            }
        }
    };
};

/**
 * Константный класс.
 * @type {CAPIGame}
 */
CAPIGame = new CAPIGame();
if(window["CAPIGame"] != undefined){window["CAPIGame"].__path="../client/components/application/capi/CAPIGame.js"};

/* ../client/components/application/capi/CAPIInvites.js */
CAPIInvites = function () {

    /**
     * Получение приглашения.
     * @param cntx контекст соединения.
     * @param whoId {Number} внутрений id пользователя который пригласил.
     * @param whomId {Number} внутрений id пользователя которого пригласили.
     */
    this.receive = function (cntx, whoId, whomId) {
        LogicInvites.save(whoId, whomId);
        LogicTimers.start('letsplay_' + whoId, Config.Invites.letsPlaytimeout, LogicInvites.clearInviteByPare, [whoId, whomId]);
    };
};

/**
 * Статичный класс.
 * @type {CAPIInvites}
 */
CAPIInvites = new CAPIInvites();if(window["CAPIInvites"] != undefined){window["CAPIInvites"].__path="../client/components/application/capi/CAPIInvites.js"};

/* ../client/components/application/capi/CAPIRating.js */
CAPIRating = function () {

    /**
     * Отправить клиенту рейтинг топ.
     * @param cntx {Object} контекст соединения.
     * @param list {{userId: number, score: number, position: number}[]} список рейтинга.
     */
    this.updateTopList = function (cntx, list) {
        LogicRating.updateTopList(list);
    };

    /**
     * Отправить клиенту рейтинг топ.
     * @param cntx {Object} контекст соединения.
     * @param list {{userId: number, score: number, position: number}[]} список рейтинга.
     */
    this.updateRatingData = function (cntx, list) {
        LogicRating.updateRatingData(list);
    };

    this.updateLastPosition = function (cntx, lastPosition) {
        LogicRating.updateLastPosition(lastPosition);
    };
};

/**
 * Константный класс.
 * @type {CAPIRating}
 */
CAPIRating = new CAPIRating();if(window["CAPIRating"] != undefined){window["CAPIRating"].__path="../client/components/application/capi/CAPIRating.js"};

/* ../client/components/application/capi/CAPIUser.js */
CAPIUser = function () {

    /**
     * Авторизация успешна.
     * @param cntx {Object} контекст соединения.
     * @param userId {Number} какой id авторизованного юзера сообщаем.
     */
    this.authorizeSuccess = function (cntx, userId) {
        LogicUser.authorizeSuccess(userId);
    };

    /**
     * Обновить данные о пользователи.
     * @param cntx {Object} контекст соединения.
     * @param user {Object} юзер инфо.
     */
    this.updateUserInfo = function (cntx, user) {
        LogicUser.updateUserInfo(user);
    };

    /**
     * Обновление данныех о друзьях.
     * @param cntx {Object} контекст соединения.
     * @param userId {Number} id int пользователя, чьи друзья
     * @param friends {Number[]} список друзей.
     */
    this.updateFriends = function (cntx, userId, friends) {
        LogicFriends.updateFriends(userId, friends);
    };

    /**
     * Обновляем кол-во о нлайн игроков.
     * @param cntx {Object} контекст соединения.
     * @param count {Number} кол-во онлайн игроков.
     * @param userId {Number} внутрений id пользователя.
     * @param direction {Boolean} true - вошел в игру, false - вышел из игры.
     */
    this.updateOnlineCount = function (cntx, count, userId, direction) {
        LogicUser.updateOnlineCount(count, userId, direction);
    };

    /**
     * @param cntx {Object} контекст соединения.
     * @param userId {Int} внутрений id итрока.
     * @param position {Int} позиция в рейтинге.
     */
    this.updateRatingPosition = function (cntx, userId, position) {
        LogicUser.updateRatingPosition(userId, position);
    };

    this.ratingChanged = function (cntx) {
        LogicUser.setRatingPositionsNeedReload();
        LogicRating.onRatingUpdated();
    };
};

/**
 * Константный класс.
 * @type {CAPIUser}
 */
CAPIUser = new CAPIUser();if(window["CAPIUser"] != undefined){window["CAPIUser"].__path="../client/components/application/capi/CAPIUser.js"};

/* ../client/components/application/capi/CAPIUserState.js */
CAPIUserState = function () {

    /**
     * Оповещение, что пользователь занят.
     * @param cntx {Object} контекст соединения.
     * @param userId {Number} внутрений id пользователя, который занят.
     */
    this.isBusy = function (cntx, userId) {
        LogicUser.updateUserInfo({id: userId, isBusy: true});
        LogicInvites.clearInvitesByUserId(userId);
    };

    /**
     * Оповещение, что пользователь не занят.
     * @param cntx {Object} контекст соединения.
     * @param userId {Number} внутрений id пользователя, который не занят.
     */
    this.isNoBusy = function (cntx, userId) {
        LogicUser.updateUserInfo({id: userId, isBusy: false});
    };

    /**
     * Оповещение, что пользователь занят.
     * @param cntx {Object} контекст соединения.
     * @param userId {Number} внутрений id пользователя, который занят.
     * @param gameId {Number} id игры.
     */
    this.onGame = function (cntx, userId, gameId) {
        LogicUser.updateUserInfo({id: userId, onGameId: gameId});
    };
};

/**
 * Константный класс.
 * @type {CAPIUserState}
 */
CAPIUserState = new CAPIUserState();if(window["CAPIUserState"] != undefined){window["CAPIUserState"].__path="../client/components/application/capi/CAPIUserState.js"};

/* ../client/components/application/gui_elements/ElementButton.js */
/**
 * Элемент кнопки.
 * @constructor
 */
ElementButton = function () {
    var self = this;

    /**
     * Показывать ли элемент.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Координата X кнопки.
     * @type {number}
     */
    this.x = 0;

    /**
     * Координата Y кнопки.
     * @type {number}
     */
    this.y = 0;

    /**
     * Ширина кнопки.
     * @type {number}
     */
    this.width = 0;

    /**
     * Высота кноки.
     * @type {number}
     */
    this.height = 0;

    /**
     * Ссылка на картинку при наведении фокуса(мыши).
     * @type {string}
     */
    this.srcHover = '/path/to/image/hover.png';

    /**
     * Ссылка на картинку при активации кнопки(клике).
     * @type {string}
     */
    this.srcActive = '/path/to/image/active.png';

    /**
     * Ссылка на картинку в покое(ожидании/бездействии).
     * @type {string}
     */
    this.srcRest = 'path/to/image/rest.png';

    /**
     * Будет вызываться при нажатии на кнопку.
     * @type {function}
     */
    this.onClick = null;

    /**
     * Подсказка кнопки.
     * @type {String}
     */
    this.title = null;

    /**
     * Активна ли кнопка.
     * @type {boolean}
     */
    this.enabled = true;

    /**
     * Дом картинки.
     * @type {GUIDom}
     */
    var dom = null;

    /**
     * Опущена ли мышка.
     * @type {boolean}
     */
    var mouseStateDown = false;

    /**
     * Мышь в фокусе.
     * @type {boolean}
     */
    var mouseStateFocused = false;

    /**
     * Создадим дом и настроем его.
     */
    this.init = function () {
        dom = GUI.createDom();
        dom.x = self.x;
        dom.y = self.y;
        dom.width = self.width;
        dom.height = self.height;
        dom.backgroundImage = self.srcRest;
        dom.pointer = GUI.POINTER_HAND;
        GUI.bind(dom, GUI.EVENT_MOUSE_MOUSE_DOWN, onMouseDown, self);
        GUI.bind(dom, GUI.EVENT_MOUSE_CLICK, onMouseClick, self);
        GUI.bind(dom, GUI.EVENT_MOUSE_OVER, onMouseOver, self);
        GUI.bind(dom, GUI.EVENT_MOUSE_OUT, onMouseOut, self);
    };

    /**
     * Покажем кнопку.
     */
    this.show = function () {
        if (showed == true) return;
        showed = true;
        dom.show();
        self.redraw();
    };

    /**
     * Спрячем кнопку.
     */
    this.hide = function () {
        if (showed == false) return;
        showed = false;
        dom.hide();
    };

    /**
     * Перерисуем кнопку.
     */
    this.redraw = function () {
        var src;
        if (!showed) return;
        src = self.srcRest;
        if (mouseStateFocused)src = self.srcHover;
        if (mouseStateFocused && mouseStateDown) src = self.srcActive;
        if (!mouseStateFocused && mouseStateDown) src = self.srcRest;
        dom.backgroundImage = src;
        if (self.title) dom.title = self.title;
        dom.opacity = self.enabled ? undefined : 0.5;
        dom.redraw();
    };

    /**
     * Обработка события фокуса мыши.
     */
    var onMouseOver = function () {
        if (!self.enabled) return;
        mouseStateFocused = true;
        self.redraw();
    };

    /**
     * Обработчик события на опускание мыши.
     */
    var onMouseDown = function () {
        if (!self.enabled) return;
        mouseStateDown = true;
        self.redraw();
    };

    /**
     * Обработка события выхода фокуса мыши.
     */
    var onMouseOut = function () {
        if (!self.enabled) return;
        mouseStateFocused = false;
        self.redraw();
    };

    /**
     * Обработка события на клик.
     * @param mouseEvent {MouseEvent}
     * @param dom {Element}
     */
    var onMouseClick = function (mouseEvent, dom) {
        /* Да, тут мы останавливаем дальнейшие течение клика. */
        mouseEvent.stopPropagation();
        if (!self.enabled) return;
        mouseStateDown = false;
        mouseStateFocused = false;
        self.redraw();
        return self.onClick.call(null, mouseEvent, dom);
    };
};if(window["ElementButton"] != undefined){window["ElementButton"].__path="../client/components/application/gui_elements/ElementButton.js"};

/* ../client/components/application/gui_elements/ElementCardInfo.js */
/**
 * Элемент Кард-инфо.
 * @constructor
 */
ElementCardInfo = function () {
    var self = this;

    /**
     * Запоминаем ве кард-инфо, нам надо будет их прятать все сразу, кроме активного.
     * Другими словами: одновренменно отображается только один кард-инфо.
     */
    ElementCardInfo.all.push(self);

    /**
     * Показывать ли элемент.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Координата X.
     * @type {number}
     */
    this.x = 0;

    /**
     * Координата Y.
     * @type {number}
     */
    this.y = 0;

    /**
     * Ширина.
     * @type {number}
     */
    this.width = 0;

    /**
     * Высота.
     * @type {number}
     */
    this.height = 0;

    /**
     * Основной фрейм карты.
     * @type {GUIDom}
     */
    var domFrame = null;

    /**
     * Дом онлайн\оффлайн.
     * @type {GUIDom}
     */
    var domOnline = null;

    /**
     * Позиция в рейтинге.
     * @type {GUIDom}
     */
    var domPosition = null;

    /**
     * Очки 15х15 с игроком.
     * @type {GUIDom}
     */
    var dom15x15vsPerson = null;

    /**
     * Очки 3х3 с игроком.
     * @type {GUIDom}
     */
    var dom3x3vsPerson = null;

    /**
     * Очки 15х15 с роботом.
     * @type {GUIDom}
     */
    var dom15x15vsRobot = null;

    /**
     * Очки 3х3 с роботом.
     * @type {GUIDom}
     */
    var dom3x3vsRobot = null;

    /**
     * Рейтинг.
     * @type {null}
     */
    var textRating = null;
    var text15x15vsPerson = null;
    var text3x3vsPerson = null;
    var text15x15vsRobot = null;
    var text3x3vsRobot = null;

    var user = null;

    /**
     * Все элементы и домы, для автоскрытия\показывания.
     * @type {Array}
     */
    var allElements = [];

    /**
     * Создадим нужные нам элементы\домы.
     */
    this.init = function () {

        /* Задний фон */
        domFrame = GUI.createDom(undefined, {
            backgroundImage: '/images/cardInfo/frame.png',
            x: self.x,
            y: self.y,
            zIndex: 100000,
            opacity: 0.87
        });
        allElements.push(domFrame);
        var startY = 5;
        var leftOffset = 5;
        var stepY = 18;
        var column2Offset = 74;
        /* Онлайн\оффлайн */
        domOnline = GUI.createDom(domFrame, {backgroundImage: '/images/cardInfo/textOffline.png', x: leftOffset, y: startY + stepY * 0});
        allElements.push(domOnline);
        /* Позиция */
        domPosition = GUI.createDom(domFrame, {backgroundImage: '/images/cardInfo/textPosition.png', x: leftOffset, y: startY + stepY * 1, title: 'Позиция в рейтинге.'});
        allElements.push(domPosition);
        /* очки 15х15vsPerson */
        dom15x15vsPerson = GUI.createDom(domFrame, {backgroundImage: '/images/cardInfo/image15x15vsPerson.png', x: leftOffset, y: startY + stepY * 2, title: 'Побед 15х15 с человеком.'});
        allElements.push(dom15x15vsPerson);
        /* очки 15x15vsRobot */
        dom15x15vsRobot = GUI.createDom(domFrame, {backgroundImage: '/images/cardInfo/image15x15vsRobot.png', x: leftOffset, y: startY + stepY * 3, title: 'Побед 15х15 с роботом.'});
        allElements.push(dom15x15vsRobot);
        /* очки 3x3vsPerson */
        dom3x3vsPerson = GUI.createDom(domFrame, {backgroundImage: '/images/cardInfo/image3x3vsPerson.png', x: leftOffset, y: startY + stepY * 4, title: 'Побед 3х3 с человеком.'});
        allElements.push(dom3x3vsPerson);
        /* очки 3x3vsRobot */
        dom3x3vsRobot = GUI.createDom(domFrame, {backgroundImage: '/images/cardInfo/image3x3vsRobot.png', x: leftOffset, y: startY + stepY * 5, title: 'Побед 3х3 с роботом.'});
        allElements.push(dom3x3vsRobot);
        /* Текст рейтинга. */
        textRating = GUI.createElement("ElementText", {x: leftOffset + column2Offset, y: startY + stepY * 1, fontSize: 16, bold: true, alignCenter: true, width: 30}, domFrame);
        allElements.push(textRating);
        /* Текст 15х15vsPerson. */
        text15x15vsPerson = GUI.createElement("ElementText", {x: leftOffset + column2Offset, y: startY + stepY * 2, fontSize: 16, bold: true, alignCenter: true, width: 30}, domFrame);
        allElements.push(text15x15vsPerson);
        /* Текст 15x15vsRobot. */
        text15x15vsRobot = GUI.createElement("ElementText", {x: leftOffset + column2Offset, y: startY + stepY * 3, fontSize: 16, bold: true, alignCenter: true, width: 30}, domFrame);
        allElements.push(text15x15vsRobot);
        /* Текст 3x3vsPerson. */
        text3x3vsPerson = GUI.createElement("ElementText", {x: leftOffset + column2Offset, y: startY + stepY * 4, fontSize: 16, bold: true, alignCenter: true, width: 30}, domFrame);
        allElements.push(text3x3vsPerson);
        /* Текст 3x3vsRobot. */
        text3x3vsRobot = GUI.createElement("ElementText", {x: leftOffset + column2Offset, y: startY + stepY * 5, fontSize: 16, bold: true, alignCenter: true, width: 30}, domFrame);
        allElements.push(text3x3vsRobot);
        GUI.bind(domFrame, GUI.EVENT_MOUSE_OVER, function () {
            LogicTimers.clear("CardInfo_" + domFrame.__id);
        }, this);
        GUI.bind(domFrame, GUI.EVENT_MOUSE_OUT, function () {
            self.hideStart();
        }, this);
    };

    /**
     * Покажем элемент.
     */
    this.show = function () {
        LogicTimers.clear("CardInfo_" + domFrame.__id);
        if (showed == true) return;
        showed = true;
        // hide all other before.
        ElementCardInfo.all.forEach(function (e) {
            if (e === self) {
                return;
            }
            e.hide();
        });

        for (var i in allElements) {
            allElements[i].show();
        }

        /* Показать элементы\домы. */
        self.redraw();
    };

    /**
     * Спрячем элемент.
     */
    this.hide = function () {
        if (showed == false) return;
        showed = false;
        /* Спрятать элементы\домы. */
        for (var i in allElements) {
            allElements[i].hide();
        }
    };

    /**
     * Перерисуем элемент.
     */
    this.redraw = function () {
        var rating;
        if (!showed) return;
        /* Перерисовка элементов\домов. */
        if (user.online) {
            domOnline.backgroundImage = '/images/cardInfo/textOnline.png';
        } else {
            domOnline.backgroundImage = '/images/cardInfo/textOffline.png';
        }
        rating = LogicUser.getRatingPosition(user.id);
        if (rating !== undefined) {
            textRating.setText(rating.toString());
        } else {
            textRating.setText('-');
        }
        if (user.score15x15vsPerson !== undefined) {
            text15x15vsPerson.setText(user.score15x15vsPerson.toString());
        } else {
            text15x15vsPerson.setText('-');
        }
        if (user.score15x15vsRobot !== undefined) {
            text15x15vsRobot.setText(user.score15x15vsRobot.toString());
        } else {
            text15x15vsRobot.setText('-')
        }
        if (user.score3x3vsPerson !== undefined) {
            text3x3vsPerson.setText(user.score3x3vsPerson.toString());
        } else {
            text3x3vsPerson.setText('-');
        }
        if (user.score3x3vsRobot !== undefined) {
            text3x3vsRobot.setText(user.score3x3vsRobot.toString());
        } else {
            text3x3vsRobot.setText('-');
        }
        for (var i in allElements) {
            allElements[i].redraw();
        }
    };

    this.updateUser = function (givenUser) {
        user = givenUser;
    };

    this.hideStart = function () {
        LogicTimers.start("CardInfo_" + domFrame.__id, Config.ElementCardInfo.hideTimeout, function () {
            self.hide();
        });
    }
};

ElementCardInfo.all = [];if(window["ElementCardInfo"] != undefined){window["ElementCardInfo"].__path="../client/components/application/gui_elements/ElementCardInfo.js"};

/* ../client/components/application/gui_elements/ElementChatInput.js */
/**
 * Элемент: окно ввода для чата..
 * @constructor
 */
ElementChatInput = function () {
    var self = this;
    /**
     * Показывать ли элемент.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Координата X.
     * @type {number}
     */
    this.x = 0;

    /**
     * Координата Y.
     * @type {number}
     */
    this.y = 0;

    /**
     * Ширина.
     * @type {number}
     */
    this.width = 0;

    /**
     * Высота.
     * @type {number}
     */
    this.height = 0;

    /**
     * Этот каллбэк будет вызываться. При отправки пользователем сообщения.
     * - по нажатию клавиши Enter
     * @type {Function}
     */
    this.onSendByEnter = null;

    /**
     * Дом окна.
     * @type {null}
     */
    var dom = null;

    /**
     * Максимльная длина сообщения.
     */
    var messageLengthLimit = 128;

    this.init = function () {
        dom = GUI.createInput();
        dom.opacity = 0.7;
        dom.background = 'none';
        dom.fontWeight = 'bold';
        dom.fontSize = '12pt';
        dom.fontFamily = '"Lucida Console", Monaco, monospace';
        dom.color = 'rgba(48, 32, 0 , 0.8)';
        dom.textShadow = '0px 0px 3px rgba(114,67,0,0.4)';
        dom.borderRadius = '0px 0px 0px 4px';
        dom.borderTop = 'none';
        dom.borderRight = 'none';
        dom.borderLeft = '2px solid rgba(114, 67, 0, 0.2)';
        dom.borderBottom = '2px solid rgba(114, 67, 0, 0.2)';
        dom.padding = '0px 0px 0px 6px';
        dom.boxShadow = '-1px 1px 1px 1px rgba(168,87,0,0.2)';
        dom.lineHeight = 1.1;
        dom.x = this.x;
        dom.y = this.y;
        dom.width = this.width;
        dom.height = this.height;
        dom.bind(GUI.EVENT_KEY_DOWN, onKeyDown, this);
        dom.bind(GUI.EVENT_KEY_UP, onKeyUp, this);
    };

    /**
     * Покажем элемент.
     */
    this.show = function () {
        if (showed == true) return;
        showed = true;
        dom.show();
        self.redraw();
    };

    /**
     * Спрячем картинку.
     */
    this.hide = function () {
        if (showed == false) return;
        showed = false;
        dom.hide();
    };

    /**
     * Перерисуем картинку.
     */
    this.redraw = function () {
        if (!showed) return;
        dom.redraw();
    };

    /**
     * По нажатию Enter-а будем вызывать калбэк и стирать текст из поля.
     * @param event {Object}
     * @param sourceDom {Object}
     */
    var onKeyDown = function (event, sourceDom) {
        if (sourceDom.value.length > messageLengthLimit) {
            sourceDom.value = sourceDom.value.substr(0, messageLengthLimit);
        }
        /* код клавиши Enter - 13, 0xC */
        if (event.keyCode == 13) {
            self.onSendByEnter.call(null, sourceDom.value);
            sourceDom.value = '';
        }
    };

    /**
     * По отпусканию клавиши, проверим размер текста на лимит.
     * @param event {Object}
     * @param sourceDom {Object}
     */
    var onKeyUp = function (event, sourceDom) {
        if (sourceDom.value.length > messageLengthLimit) {
            sourceDom.value = sourceDom.value.substr(0, messageLengthLimit);
        }
    }
};if(window["ElementChatInput"] != undefined){window["ElementChatInput"].__path="../client/components/application/gui_elements/ElementChatInput.js"};

/* ../client/components/application/gui_elements/ElementChatWindow.js */
/**
 * Элемент: окно чата.
 * @constructor
 */
ElementChatWindow = function () {
    var self = this;
    /**
     * Показывать ли элемент.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Координата X.
     * @type {number}
     */
    this.x = 0;

    /**
     * Координата Y.
     * @type {number}
     */
    this.y = 0;

    /**
     * Ширина.
     * @type {number}
     */
    this.width = 0;

    /**
     * Высота.
     * @type {number}
     */
    this.height = 0;

    /**
     * Дом окна.
     * @type {null}
     */
    var dom = null;

    /**
     * Тут будут храниться сообщения, которые мы будем отображать.
     * Массив ввида: [{userId:number, text:string, timestamp:number}, ...]
     * @type {Array}
     */
    var messages = [];

    this.init = function () {
        dom = GUI.createDom();
        dom.opacity = 0.5;
        dom.fontWeight = 'bold';
        dom.fontSize = '13pt';
        dom.fontFamily = '"Lucida Console", Monaco, monospace';
        dom.color = 'rgba(48, 32, 0, 0.8)';
        dom.textShadow = '0px 0px 3px rgba(114, 67, 0, 0.4)';
        dom.borderRadius = '0px 0px 0px 4px';
        dom.borderTop = 'none';
        dom.borderRight = 'none';
        dom.borderLeft = '2px solid rgba(114, 67, 0, 0.2)';
        dom.borderBottom = '2px solid rgba(114, 67, 0, 0.2)';
        dom.padding = '4px 6px';
        dom.boxShadow = '-1px 1px 1px 1px rgba(168, 87, 0, 0.2)';
        dom.lineHeight = 1.1;
    };

    /**
     * Покажем элемент.
     */
    this.show = function () {
        if (showed == true) return;
        showed = true;
        dom.show();
        self.redraw();
    };

    /**
     * Спрячем картинку.
     */
    this.hide = function () {
        if (showed == false) return;
        showed = false;
        dom.hide();
    };

    /**
     * Перерисуем картинку.
     */
    this.redraw = function () {
        var text, message, user;
        if (!showed) return;
        dom.x = this.x;
        dom.y = this.y;
        dom.height = this.height;
        dom.width = this.width;
        text = '';
        for (var i in messages) {
            message = messages[i];
            user = LogicUser.getById(message.userId);
            if (!user.id) continue;
            if (GUIDom.hidePictures) {
                dom.opacity = 0.09;
                text += "";
                text += message.timeHours + ':' + message.timeMinutes;
                text += "";
                text += " ";
                text += user.firstName;
                text += " " + user.lastName.charAt(0) + ".";
                text += ": ";
                text += "";
                text += " " + message.text;
                text += "\r\n";
            } else {
                text += "<b style='font-size:9pt;letter-spacing:-2px;font-weight:normal;float:right;opacity:0.47;' >";
                text += message.timeHours + ":" + message.timeMinutes + ":" + message.timeSeconds + " ";
                text += "</b>";
                text += "<b style='font-size:10pt;letter-spacing:-2px;font-weight:normal;' title='" + user.firstName + " " + user.lastName + "' >";
                text += user.firstName;
                text += " " + user.lastName.charAt(0) + ".";
                text += " ";
                text += "</b>";
                text += " " + message.text;
                text += "<br>";
            }
        }
        dom.innerHTML = text;
        dom.redraw();
        /* На данный момент это трюк\костыль */
        dom.__dom.scrollTop = dom.__dom.scrollHeight;
    };

    /**
     * Обновим сообщения.
     * и перересуем ессно.
     * @param inMessages {Array} массив вида [{userId:number, text:string, timestamp:number}, ...]
     */
    this.updateMessages = function (inMessages) {
        for (var i in inMessages) {
            inMessages[i].timeHours = new Date(inMessages[i].timestamp * 1000).getHours();
            inMessages[i].timeMinutes = new Date(inMessages[i].timestamp * 1000).getMinutes();
            inMessages[i].timeSeconds = new Date(inMessages[i].timestamp * 1000).getSeconds();
        }
        messages = inMessages;
        self.redraw();
    }
};if(window["ElementChatWindow"] != undefined){window["ElementChatWindow"].__path="../client/components/application/gui_elements/ElementChatWindow.js"};

/* ../client/components/application/gui_elements/ElementField.js */
/**
 * Элемент игровое поле.
 * @constructor
 */
ElementField = function () {
    var self = this;

    /**
     * Показывать ли элемент.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Координата X игровое поле.
     * @type {number}
     */
    this.x = 0;

    /**
     * Координата Y игровое поле.
     * @type {number}
     */
    this.y = 0;

    /**
     * Ширина игровое поле.
     * @type {number}
     */
    this.width = 0;

    /**
     * Высота игровое поле.
     * @type {number}
     */
    this.height = 0;

    /**
     * Графические сеттингы для полей разных типов.
     * @type {Array}
     */
    this.configure = [];

    /**
     * Тип поля.
     * @see LogicXO.FIELD_TYPE_*
     * @type {Number}
     */
    var fieldTypeId = null;

    /**
     * Текущая победная линия,
     * если не установлено - то линия не отображается.
     * @type {Number|null}
     */
    var winLineId = null;

    /**
     * Коодинаты(x) победной линии. от нуля.
     * @type {Number}
     */
    var winLineX = 0;

    /**
     * Коодинаты(y) победной линии. от нуля.
     * @type {Number}
     */
    var winLineY = 0;

    /**
     * Вызывается при нажатии на поле.
     * @type {function}
     */
    this.onClick = null;

    var lastMove;

    /* Поле 3х3 */
    this.configure[LogicXO.FIELD_TYPE_3X3] = {
        srcField: '/images/fields/3x3Field.png',
        srcSignX: '/images/fields/3x3SignX.png',
        srcSignXLastMove: '/images/fields/3x3SignX.png',
        srcSignO: '/images/fields/3x3SignO.png',
        srcSignOLastMove: '/images/fields/3x3SignO.png',
        srcSignClear: '/images/fields/3x3SignClear.png',
        lines: {},
        fieldSize: 3,
        signWidth: 130,
        signHeight: 130,
        padding: 5,
        lineOffset: 5,
        signOffsetX: 5,
        signOffsetY: 5,
        signImageWidth: 130,
        signImageHeight: 130,
        winLineSize: 3
    };
    this.configure[LogicXO.FIELD_TYPE_3X3].lines[LogicXO.LINE_HORIZONTAL] = '/images/fields/3x3LineHorizontal.png';
    this.configure[LogicXO.FIELD_TYPE_3X3].lines[LogicXO.LINE_VERTICAL] = '/images/fields/3x3LineVertical.png';
    this.configure[LogicXO.FIELD_TYPE_3X3].lines[LogicXO.LINE_LEFT_UP] = '/images/fields/3x3LineLeftToUp.png';
    this.configure[LogicXO.FIELD_TYPE_3X3].lines[LogicXO.LINE_LEFT_DOWN] = '/images/fields/3x3LineLeftToDown.png';

    /* Поле 15х15 */
    this.configure[LogicXO.FIELD_TYPE_15X15] = {
        srcField: '/images/fields/15x15Field.png',
        srcSignX: '/images/fields/15x15SignX.png',
        srcSignXLastMove: '/images/fields/15x15SignXLastMove.png',
        srcSignO: '/images/fields/15x15SignO.png',
        srcSignOLastMove: '/images/fields/15x15SignOLastMove.png',
        srcSignClear: '/images/fields/15x15SignClear.png',
        lines: {},
        fieldSize: 15,
        /*131 126*/
        /*127 117*/
        signWidth: 26,
        signHeight: 26,
        padding: 0,
        lineOffset: 5,
        signOffsetX: 5,
        signOffsetY: 5,
        signImageWidth: 26,
        signImageHeight: 26,
        winLineSize: 5
    };
    this.configure[LogicXO.FIELD_TYPE_15X15].lines[LogicXO.LINE_HORIZONTAL] = '/images/fields/15x15LineHorizontal.png';
    this.configure[LogicXO.FIELD_TYPE_15X15].lines[LogicXO.LINE_VERTICAL] = '/images/fields/15x15LineVertical.png';
    this.configure[LogicXO.FIELD_TYPE_15X15].lines[LogicXO.LINE_LEFT_UP] = '/images/fields/15x15LineLeftToUp.png';
    this.configure[LogicXO.FIELD_TYPE_15X15].lines[LogicXO.LINE_LEFT_DOWN] = '/images/fields/15x15LineLeftToDown.png';

    /**
     * Тут будут все домы.
     * - поля;
     * - знаки;
     * - линии-побед.
     * @type {{}}
     */
    this.domList = {};

    /**
     * Абстрактные данные поля.
     * @type {{}}
     */
    this.field = {};

    /**
     * Создает домы полей всех типов.
     * т.е. 3х3 и 15х15.
     */
    this.init = function () {
        /* Поле 3 х 3 */
        initFieldByTypeId(LogicXO.FIELD_TYPE_3X3);
        /* Поле 15 х 15 */
        initFieldByTypeId(LogicXO.FIELD_TYPE_15X15);
    };

    /**
     * Инициализирует поле с указанным типом.
     * @param typeId
     */
    var initFieldByTypeId = function (typeId) {
        var dom;
        self.domList[typeId] = {};
        self.field[typeId] = [];
        dom = GUI.createDom();
        dom.x = self.x;
        dom.y = self.y;
        dom.width = self.width;
        dom.height = self.height;
        dom.backgroundImage = self.configure[typeId].srcField;
        self.domList[typeId].domField = dom;
        self.domList[typeId].domSigns = [];
        for (var y = 0; y < self.configure[typeId].fieldSize; y++) {
            self.domList[typeId].domSigns[y] = [];
            self.field[typeId][y] = [];
            for (var x = 0; x < self.configure[typeId].fieldSize; x++) {
                dom = GUI.createDom();
                dom.x = self.configure[typeId].signOffsetX + self.x + x * (self.configure[typeId].signWidth + self.configure[typeId].padding);
                dom.y = self.configure[typeId].signOffsetY + self.y + y * (self.configure[typeId].signHeight + self.configure[typeId].padding);
                dom.width = self.configure[typeId].signImageWidth;
                dom.height = self.configure[typeId].signImageHeight;
                dom.pointer = GUI.POINTER_HAND;
                dom.backgroundImage = self.configure[typeId].srcSignClear;
                GUI.bind(dom, GUI.EVENT_MOUSE_CLICK, onSignClick, {x: x, y: y});
                GUI.bind(dom, GUI.EVENT_MOUSE_OVER, onMouseOver, {dom: dom, x: x, y: y});
                GUI.bind(dom, GUI.EVENT_MOUSE_OUT, onMouseOut, {dom: dom, x: x, y: y});
                self.domList[typeId].domSigns[y][x] = dom;
                self.field[typeId][y][x] = LogicXO.SIGN_ID_Empty;
            }
        }
        dom = GUI.createDom();
        dom.x = self.x;
        dom.y = self.y;
        dom.width = self.width;
        dom.height = self.height;
        self.domList[typeId].domWinLine = dom;
    };

    /**
     * Покажем поле.
     */
    this.show = function () {
        if (showed == true) {
            return;
        }
        showed = true;
        self.domList[fieldTypeId].domField.show();
        for (var y = 0; y < self.configure[fieldTypeId].fieldSize; y++) {
            for (var x = 0; x < self.configure[fieldTypeId].fieldSize; x++) {
                self.domList[fieldTypeId].domSigns[y][x].show();
            }
        }
        self.domList[fieldTypeId].domWinLine.show();
        self.redraw();
    };

    /**
     * Спрячем поле.
     */
    this.hide = function () {
        if (showed == false) {
            return;
        }
        showed = false;
        self.domList[fieldTypeId].domField.hide();
        for (var y = 0; y < self.configure[fieldTypeId].fieldSize; y++) {
            for (var x = 0; x < self.configure[fieldTypeId].fieldSize; x++) {
                self.domList[fieldTypeId].domSigns[y][x].hide();
            }
        }
        self.domList[fieldTypeId].domWinLine.hide();
    };

    /**
     * Перерисуем поле.
     */
    this.redraw = function () {
        if (!showed) return;
        self.domList[fieldTypeId].domField.redraw();
        for (var y = 0; y < self.configure[fieldTypeId].fieldSize; y++) {
            for (var x = 0; x < self.configure[fieldTypeId].fieldSize; x++) {
                self.domList[fieldTypeId].domSigns[y][x].redraw();
            }
        }
        if (!winLineId) {
            self.domList[fieldTypeId].domWinLine.hide();
        } else {
            self.domList[fieldTypeId].domWinLine.show();
            self.domList[fieldTypeId].domWinLine.x = self.x + self.configure[fieldTypeId].lineOffset + winLineX * (self.configure[fieldTypeId].signWidth + self.configure[fieldTypeId].padding);
            self.domList[fieldTypeId].domWinLine.y = self.y + self.configure[fieldTypeId].lineOffset + winLineY * (self.configure[fieldTypeId].signHeight + self.configure[fieldTypeId].padding);
            self.domList[fieldTypeId].domWinLine.backgroundImage = self.configure[fieldTypeId].lines[winLineId];
            switch (winLineId) {
                case LogicXO.LINE_HORIZONTAL:
                    self.domList[fieldTypeId].domWinLine.width = self.configure[fieldTypeId].signWidth * self.configure[fieldTypeId].winLineSize;
                    self.domList[fieldTypeId].domWinLine.height = self.configure[fieldTypeId].signHeight;
                    break;
                case LogicXO.LINE_VERTICAL:
                    self.domList[fieldTypeId].domWinLine.width = self.configure[fieldTypeId].signWidth;
                    self.domList[fieldTypeId].domWinLine.height = self.configure[fieldTypeId].signHeight * self.configure[fieldTypeId].winLineSize;
                    break;
                case LogicXO.LINE_LEFT_UP:
                    self.domList[fieldTypeId].domWinLine.width = self.configure[fieldTypeId].signWidth * self.configure[fieldTypeId].winLineSize;
                    self.domList[fieldTypeId].domWinLine.height = self.configure[fieldTypeId].signHeight * self.configure[fieldTypeId].winLineSize;
                    break;
                case LogicXO.LINE_LEFT_DOWN:
                    self.domList[fieldTypeId].domWinLine.width = self.configure[fieldTypeId].signWidth * self.configure[fieldTypeId].winLineSize;
                    self.domList[fieldTypeId].domWinLine.height = self.configure[fieldTypeId].signHeight * self.configure[fieldTypeId].winLineSize;
                    break;
            }
        }
        self.domList[fieldTypeId].domWinLine.redraw();
    };

    /**
     * Переключимся на поле соответствующего типа.
     * @param typeId {Number} LogicXO.FIELD_TYPE_*
     */
    this.switchToField = function (typeId) {
        if (fieldTypeId == typeId) {
            return;
        }
        self.hide();
        fieldTypeId = typeId;
        self.show();
    };

    this.setLastMove = function (x, y) {
        lastMove = {x: x, y: y};
    };

    /**
     * Установить знак.
     * @param x {Number} координаты x(от нуля)
     * @param y {Number} координаты y(от нуля)
     * @param signId {Number} id знака LogicXO.SIGN_ID_*
     */
    this.setSign = function (x, y, signId) {
        self.domList[fieldTypeId].domSigns[y][x].animateStop();
        self.domList[fieldTypeId].domSigns[y][x].opacity = 1.0;
        switch (signId) {
            case LogicXO.SIGN_ID_X:
                if (lastMove && lastMove.x == x && lastMove.y == y) {
                    self.domList[fieldTypeId].domSigns[y][x].backgroundImage = self.configure[fieldTypeId].srcSignXLastMove;
                } else {
                    self.domList[fieldTypeId].domSigns[y][x].backgroundImage = self.configure[fieldTypeId].srcSignX;
                }
                break;
            case LogicXO.SIGN_ID_O:
                if (lastMove && lastMove.x == x && lastMove.y == y) {
                    self.domList[fieldTypeId].domSigns[y][x].backgroundImage = self.configure[fieldTypeId].srcSignOLastMove;
                } else {
                    self.domList[fieldTypeId].domSigns[y][x].backgroundImage = self.configure[fieldTypeId].srcSignO;
                }
                break;
            case LogicXO.SIGN_ID_Empty:
                self.domList[fieldTypeId].domSigns[y][x].backgroundImage = self.configure[fieldTypeId].srcSignClear;
                break;
            default:
                Logs.log("Undefined signId:", Logs.LEVEL_FATAL_ERROR, signId);
                break;
        }
        self.field[fieldTypeId][y][x] = signId;
    };

    /**
     * Очистить поле.
     */
    this.clearField = function () {
        for (var y = 0; y < self.configure[fieldTypeId].fieldSize; y++) {
            for (var x = 0; x < self.configure[fieldTypeId].fieldSize; x++) {
                self.domList[fieldTypeId].domSigns[y][x].backgroundImage = self.configure[fieldTypeId].srcSignClear;
                self.field[fieldTypeId][y][x] = LogicXO.SIGN_ID_Empty;
            }
        }
        lastMove = null;
        winLineId = null;
        winLineX = 0;
        winLineY = 0;
    };

    /**
     * Установить выигрышную линию.
     * @param x
     * @param y
     * @param lineId
     */
    this.setWinLine = function (x, y, lineId) {
        winLineId = lineId;
        winLineX = x;
        winLineY = y;
        self.redraw();
    };

    /**
     * Обработчки нажатий на поля.
     */
    var onSignClick = function () {
        /* this тут - это объект с полями x и y, этот контест должен быть присвоин во время биндингом эвента. */
        self.onClick.call(null, this.x, this.y);
    };

    /**
     * При вхождении курсора в ячейку знака, анимируем "проявление", если надо.
     */
    var onMouseOver = function () {
        var game, user;
        if (self.field[fieldTypeId][this.y][this.x] != LogicXO.SIGN_ID_Empty) {
            return;
        }
        game = LogicGame.getCurrentGame();
        user = LogicUser.getCurrentUser();

        if (LogicXO.isHisTurn(game, user.id)) {
            if (game.turnId == LogicXO.SIGN_ID_X) {
                this.dom.backgroundImage = self.configure[fieldTypeId].srcSignX;
            } else {
                this.dom.backgroundImage = self.configure[fieldTypeId].srcSignO;
            }
            if (fieldTypeId == LogicXO.FIELD_TYPE_3X3) {
                this.dom.animateOpacity(0.21, 0.18, 20);
            }
            if (fieldTypeId == LogicXO.FIELD_TYPE_15X15) {
                this.dom.animateOpacity(0.52, 0.21, 20);
            }
            this.dom.redraw();
        }
    };

    /**
     * При ухода курсора со знака, анимируем затимнение, если надо.
     */
    var onMouseOut = function () {
        if (self.field[fieldTypeId][this.y][this.x] != LogicXO.SIGN_ID_Empty) {
            return;
        }
        this.dom.animateOpacity(0.00, this.dom.opacity, 12);
    };
};if(window["ElementField"] != undefined){window["ElementField"].__path="../client/components/application/gui_elements/ElementField.js"};

/* ../client/components/application/gui_elements/ElementFlag.js */
/**
 * Элемент флаг.
 * @constructor
 */
ElementFlag = function () {
    var self = this;

    /**
     * Показывать ли элемент.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Координата X флага.
     * @type {number}
     */
    this.x = 0;

    /**
     * Координата Y флага.
     * @type {number}
     */
    this.y = 0;

    /**
     * Ширина флага.
     * @type {number}
     */
    this.width = 0;

    /**
     * Высота флага.
     * @type {number}
     */
    this.height = 0;

    /**
     * Хинт - подсказа при наведени мыши.
     * @type {string}
     */
    this.title = '';

    this.opacity = undefined;

    /**
     * Ссылка на картинку при наведении фокуса(мыши).
     * @type {string}
     */
    this.srcHover = '/path/to/image/hover.png';

    /**
     * Ссылка на картинку при активации флага(клике).
     * @type {string}
     */
    this.srcActive = '/path/to/image/active.png';

    /**
     * Ссылка на картинку в покое(ожидании/бездействии).
     * @type {string}
     */
    this.srcRest = 'path/to/image/rest.png';

    /**
     * Состояние по умолчанию.
     * @type {boolean}
     */
    this.defaultState = false;

    /**
     * Будет вызываться при изменении состояния.
     * @type {function}
     */
    this.onChange = null;

    /**
     * Дом картинки.
     * @type {GUIDom}
     */
    var dom = null;

    /**
     * Опущена ли мышка.
     * @type {boolean}
     */
    var mouseStateDown = false;

    /**
     * Находиться ли мышь над элементом.
     * @type {boolean}
     */
    var mouseStateFocused = false;

    /**
     * Состояние флага.
     * @type {boolean}
     */
    var flagState = false;

    /**
     * Создадим дом и настроем его.
     */
    this.init = function () {
        flagState = self.defaultState;
        dom = GUI.createDom();
        dom.x = this.x;
        dom.y = this.y;
        dom.width = this.width;
        dom.height = this.height;
        dom.backgroundImage = this.srcRest;
        dom.pointer = GUI.POINTER_HAND;
        /* В будущем мы возможно спасём немного времени с помощью этой проверке. */
        if (this.width == 0) {
            Logs.log("ElementFlag: width = 0, Возможно элемент не будет видно на странице!", Logs.LEVEL_WARNING, this);
        }
        /* В будущем мы возможно спасём немного времени с помощью этой проверке. */
        if (this.height == 0) {
            Logs.log("ElementFlag: width = 0, Возможно элемент не будет видно на странице!", Logs.LEVEL_WARNING, this);
        }
        GUI.bind(dom, GUI.EVENT_MOUSE_MOUSE_DOWN, onMouseDown, this);
        GUI.bind(dom, GUI.EVENT_MOUSE_CLICK, onMouseClick, this);
        GUI.bind(dom, GUI.EVENT_MOUSE_OVER, onMouseOver, this);
        GUI.bind(dom, GUI.EVENT_MOUSE_OUT, onMouseOut, this);
        self.redraw();
        self.onChange.call(null, flagState);
    };

    /**
     * Покажем флаг.
     */
    this.show = function () {
        if (showed == true) return;
        showed = true;
        dom.show();
        self.redraw();
    };

    /**
     * Спрячем флаг.
     */
    this.hide = function () {
        if (showed == false) return;
        showed = false;
        dom.hide();
    };

    /**
     * Перерисуем флаг.
     */
    this.redraw = function () {
        var src;
        if (!showed) return;
        if (flagState == false) {
            src = self.srcRest;
            if (mouseStateFocused)src = self.srcActive;
            if (mouseStateFocused && mouseStateDown) src = self.srcActive;
            if (!mouseStateFocused && mouseStateDown) src = self.srcRest;
        } else {
            src = self.srcActive;
            if (mouseStateFocused)src = self.srcRest;
            if (mouseStateFocused && mouseStateDown) src = self.srcRest;
            if (!mouseStateFocused && mouseStateDown) src = self.srcActive;
        }
        dom.backgroundImage = src;
        dom.title = self.title;
        dom.opacity = self.opacity;
        dom.redraw();
    };

    /**
     * Обработка события фокуса мыши.
     */
    var onMouseOver = function () {
        mouseStateFocused = true;
        self.redraw();
    };

    /**
     /**
     * Обработчик события на опускание мыши.
     */
    var onMouseDown = function () {
        mouseStateDown = true;
        self.redraw();
    };

    /**
     * Обработка события выхода фокуса мыши.
     */
    var onMouseOut = function () {
        mouseStateFocused = false;
        self.redraw();
    };

    /**
     * Обработка события на клик.
     */
    var onMouseClick = function () {
        flagState = !flagState;
        mouseStateDown = false;
        mouseStateFocused = false;
        self.redraw();
        self.onChange.call(null, flagState);
    };
};if(window["ElementFlag"] != undefined){window["ElementFlag"].__path="../client/components/application/gui_elements/ElementFlag.js"};

/* ../client/components/application/gui_elements/ElementFriendsType.js */
/**
 * Элемент лента-друзей.
 * Это список друзей, просто напросто.
 * @constructor
 */
ElementFriendsType = function () {
    var self = this;

    /**
     * Показывать ли ленту-друзей.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Координата X.
     * @type {number}
     */
    this.x = 0;

    /**
     * Координата Y.
     * @type {number}
     */
    this.y = 0;

    /**
     * Расстояние между фотографиями.
     * @type {number}
     */
    this.spacing = 0;

    /**
     * Кол-во для отображения фотографий.
     * @type {number}
     */
    this.columns = 5;

    /**
     * Список данных друзей.
     * @type {Array}
     */
    this.friends = [];

    /**
     * Кэллбэк при клики на заглушку.
     * @type {Function}
     */
    this.onClickDummy = null;

    /**
     * Массив элементов фотографий.
     * @type {Array}
     */
    var photos = [];

    /**
     * Массив заглушек.
     * @type {Array}
     */
    var dummies = [];

    /**
     * Создадим графические элемены\домы.
     * - создадим фотографии;
     * - создадим заглушки.
     */
    this.init = function () {
        var photo, dummy;
        /* Создадим элементы фотографий */
        for (var i = 0; i < self.columns; i++) {
            photo = GUI.createElement('ElementPhoto', {
                x: self.x + i * self.spacing,
                y: self.y,
                showCardInfo: true,
                cardInfoOffsetX: -18,
                cardInfoOffsetY: -127
            });
            photos[i] = photo;
        }
        /* Создадим заглушки */
        for (var i = 0; i < self.columns; i++) {
            dummy = GUI.createElement('ElementButton', {
                x: self.x + i * self.spacing,
                y: self.y + 8,
                width: 69,
                height: 68,
                title: 'Пригласить друзей.',
                onClick: function () {
                    self.onClickDummy();
                },
                srcRest: '/images/photo/dummy.png',
                srcHover: '/images/photo/dummyHover.png',
                srcActive: '/images/photo/dummyHover.png'
            });
            dummies[i] = dummy;
        }
    };

    /**
     * Покажем ленту-друзей.
     */
    this.show = function () {
        if (showed == true) return;
        showed = true;
        /* Тут show\hide обрабатыает redraw ввиду специфики выборочности элементов для отображения. */
        self.redraw();
    };

    /**
     * Спрячем ленту-друзей.
     */
    this.hide = function () {
        if (showed == false) return;
        showed = false;
        for (var i = 0; i < self.columns; i++) {
            photos[i].hide();
            dummies[i].hide();
        }
    };

    /**
     * Перерисуем ленту-друзей.
     */
    this.redraw = function () {
        if (!showed) return;
        for (var i = 0; i < self.columns; i++) {
            if (self.friends[i]) {
                photos[i].update(self.friends[i]);
                photos[i].show();
                photos[i].redraw();
                dummies[i].hide();
            } else {
                photos[i].hide();
                dummies[i].show();
                dummies[i].redraw();
            }
        }
    };

    /**
     * Обновим данные о друзьях.
     * @param givenFriends {Array}
     */
    this.update = function (givenFriends) {
        self.friends = givenFriends;
        self.redraw();
    };
};if(window["ElementFriendsType"] != undefined){window["ElementFriendsType"].__path="../client/components/application/gui_elements/ElementFriendsType.js"};

/* ../client/components/application/gui_elements/ElementGraphicText.js */
/**
 * Элемент графический текст.
 * Тут каждая буква будет текстом.
 * @constructor
 * Инициирующие параметры:
 * x : number координата X
 * y : number координата Y
 * width : number ширина поля
 * height : number высота поля
 * text : string текст
 */
ElementGraphicText = function () {
    var self = this;

    /**
     * Показывать ли элемент.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Координата X текста.
     * @type {number}
     */
    this.x = undefined;

    /**
     * Координата Y текста.
     * @type {number}
     */
    this.y = undefined;

    /**
     * Ширина текста.
     * @type {number}
     */
    this.width = undefined;

    /**
     * Высота текста.
     * По умолчанию 28. Это высота буквы.
     * @type {number}
     */
    this.height = 28;

    /**
     * Текст.
     * @type {string}
     */
    this.text = '';

    /**
     * Прозрачность текста.
     * @type {number}
     */
    this.opacity = undefined;

    /**
     * Выравнивать по правой стороне.
     * @type {boolean}
     */
    this.alignCenter = false;

    /**
     * Дом для текста.
     * @type {GUIDom}
     */
    var dom = null;

    this.pointer = undefined;

    this.dom = null;

    /**
     * Создадим дом и настроем его.
     */
    this.init = function () {
        dom = GUI.createDom();
        dom.x = this.x;
        dom.y = this.y;
        dom.width = this.width;
        dom.height = this.height;
        if (self.alignCenter) {
            dom.alignText = 'center';
        }
        /* Но, это только для текста без картинки, т.к. у нас не все символы есть. Пока что. */
        dom.color = "rgba(68,62,0,0.7)";
        dom.fontSize = 21;
        dom.pointer = self.pointer;
        self.dom = dom;
    };

    /**
     * Покажем текст.
     */
    this.show = function () {
        if (showed == true) return;
        showed = true;
        dom.show();
        self.redraw();
    };

    /**
     * Спрячем текст.
     */
    this.hide = function () {
        if (showed == false) return;
        showed = false;
        dom.hide();
    };

    /**
     * Обновим текст.
     * @param text {string}
     */
    this.setText = function (text) {
        self.text = text;
    };

    /**
     * Перерисуем.
     */
    this.redraw = function () {
        if (!showed) return;
        refreshText();
    };

    var refreshText = function () {
        var textHTML, symbol_url, charCode, existsSymbols;
        existsSymbols = '1234567890абвгдеёжзийклмнопрстуфхцчшщьыъэюя.!- АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
        textHTML = '';
        for (var i in self.text) {
            var symbol = self.text[i];
            charCode = self.text.charCodeAt(i);
            /* feed line symbol: 0xAh, 10d, \n */
            if (charCode == 10) {
                textHTML += "<br>";
                continue;
            }
            if (GUIDom.hidePictures) {
                textHTML += symbol;
            } else {
                if (existsSymbols.indexOf(symbol) == -1) {
                    textHTML += symbol;
                } else {
                    symbol_url = "/images/font/" + charCode + ".png";
                    textHTML += "<img alt='" + symbol + "' src='" + GUI.getImageURL(symbol_url) + "'  />";
                }
            }
        }
        dom.innerHTML = textHTML;
        dom.opacity = self.opacity;
        dom.redraw();
    };
};if(window["ElementGraphicText"] != undefined){window["ElementGraphicText"].__path="../client/components/application/gui_elements/ElementGraphicText.js"};

/* ../client/components/application/gui_elements/ElementImage.js */
/**
 * Элемент картинки.
 * @constructor
 */
ElementImage = function () {
    var self = this;

    /**
     * Показывать ли элемент.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Координата X картинки.
     * @type {number}
     */
    this.x = 0;

    /**
     * Координата Y картинки.
     * @type {number}
     */
    this.y = 0;

    /**
     * Ширина картинки.
     * @type {number}
     */
    this.width = 0;

    /**
     * Высота картинки.
     * @type {number}
     */
    this.height = 0;

    /**
     * Ссылка на картинку.
     * @type {string}
     */
    this.src = '/path/to/image.png';

    /**
     * Прозрачность картинки.
     * @type {null}
     */
    this.opacity = null;

    /**
     * Дом картинки.
     * @type {GUIDom}
     */
    var dom = null;

    this.title = undefined;

    /**
     * Создадим дом и настроем его.
     */
    this.init = function () {
        dom = GUI.createDom();
        dom.width = self.width;
        dom.height = self.height;
        dom.backgroundImage = self.src;
    };

    /**
     * Покажем картинку.
     */
    this.show = function () {
        if (showed == true) return;
        showed = true;
        dom.show();
        self.redraw();
    };

    /**
     * Спрячем картинку.
     */
    this.hide = function () {
        if (showed == false) return;
        showed = false;
        dom.hide();
    };

    /**
     * Перерисуем картинку.
     */
    this.redraw = function () {
        if (!showed) return;
        dom.redraw();
        if (self.opacity != null) {
            dom.opacity = self.opacity;
        }
        dom.x = self.x;
        dom.y = self.y;
        dom.title = self.title;
    };
};if(window["ElementImage"] != undefined){window["ElementImage"].__path="../client/components/application/gui_elements/ElementImage.js"};

/* ../client/components/application/gui_elements/ElementPhoto.js */
/**
 * Элемент фотография.
 * @constructor
 * Инициирующие параметры:
 * x : number координта X
 * y : number координта Y
 */
ElementPhoto = function () {
    var self = this;

    /**
     * Показывать ли элемент.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Координата X.
     * @type {number}
     */
    this.x = 0;

    /**
     * Координата Y.
     * @type {number}
     */
    this.y = 0;

    /**
     * Ссылка на картинку фотографии.
     * @type {string}
     */
    this.src = '/path/to/image.png';

    /**
     * Загрушка, на случай, если фотографии нет.
     * @type {string}
     */
    var srcDummy = '/images/photo/camera_c.gif';

    /**
     * Текст появляется при наведении мышки.
     * @type {string}
     */
    var title = '';

    /**
     * Кэллбэк при нажатии левой кнопки мыши.
     * @type {Function}
     */
    var onClick = null;

    this.showCardInfo = false;

    this.cardInfoOffsetX = 0;
    this.cardInfoOffsetY = 0;

    /**
     * Дом фотографии.
     * @type {GUIDom}
     */
    var domPhoto = null;

    /**
     * Дом рамки.
     * @type {GUIDom}
     */
    var domFrame = null;

    /**
     * Дом бордюр.
     * @type {GUIDom}
     */
    var domBorder = null;

    /**
     * Дом границ фоторгафии.
     * @type {GUIDom}
     */
    var domRegion = null;

    /**
     * Ширина бордюра рамки.
     * @type {number}
     */
    var borderWidth = 1;

    /**
     * Ширина рамки
     * @type {number}
     */
    this.frameWidth = 6;

    /**
     * Диапазон поворота фотографии.
     * @type {number}
     */
    this.degreesDiapazon = 16;

    /**
     * Угол поворота фотографии, расчитывается во время перерисовки.
     * @type {number}
     */
    var degress = 0;

    /**
     * Ширина фотографии.
     * Стандартная 50 на 50 фотография.
     * @type {number}
     */
    this.photoWidth = 50;

    /**
     * Высота фотографии.
     * Стандартная 50 на 50 фотография.
     * @type {number}
     */
    this.photoHeight = 50;

    /**
     * Ширина области активности вокруг фотографии.
     * @type {number}
     */
    var regionWidth = 80;

    /**
     * Высота области активности вокруг фотографии.
     * @type {number}
     */
    var regionHeight = 145;

    /**
     * Далее идут переменные кнопки пригласить\играём? и индикатора ждём...
     */

    /**
     * Кнопка пригласить в игру.
     * @type {ElementButton}
     */
    var buttonInvite = null;

    /**
     * Калбэк при нажатии кнопки пригласить в игру.
     * @type {Function}
     */
    var onButtonInviteClick = null;

    /**
     * Активна ли кнопка приглашения в игру.
     * @type {boolean}
     */
    var enableButtonInvite = false;

    /**
     * Кнопка "Играём?".
     * @type {ElementButton}
     */
    var buttonLetsPlay = null;

    /**
     * Калбэк при нажатии кнопки "Играём?".
     * @type {ElementButton}
     */
    var onButtonLetsPlayClick = null;

    /**
     * Индикатор "ждём...".
     * @type {null}
     */
    var domIndicatorWaiting = null;

    /**
     * Показывать ли кнопку пригласить.
     * @type {boolean}
     */
    var showButtonInvite = false;

    /**
     * Показывать ли кнопку "Играем?".
     * @type {boolean}
     */
    var showButtonLetsPlay = false;

    /**
     * Показывать ли индикатор "Ждём...".
     * @type {boolean}
     */
    var showIndicatorWaiting = false;

    /**
     * Текст: "занят".
     * @type {GUIDom}
     */
    var elementBusyText = false;

    /**
     * Текст "оффлайн".
     * @type {GUIDom}
     */
    var elementOfflineText = false;

    var showBusyText = false;
    var showOfflineText = false;

    /**
     * Указатель мыши при наведении.
     * @type {string}
     */
    this.pointer = GUI.POINTER_HAND;

    /**
     * Элемент: кард-инфо.
     * @type {null}
     */
    var elementCardInfo = null;

    /**
     * юзер-дата, нужно для: кард-инфо, ...
     * @type {Object}
     */
    var user = null;

    /**
     * Создадим домы и настроем их.
     */
    this.init = function () {
        /* Границы фотографии */
        domRegion = GUI.createDom();
        domRegion.x = self.x;
        domRegion.y = self.y;
        domRegion.width = regionWidth;
        domRegion.height = regionHeight;
        /* Бордюр рамки фотографии */
        domBorder = GUI.createDom(domRegion);
        domBorder.x = 8;
        domBorder.y = 5;
        domBorder.border = borderWidth + 'px solid #ebb';
        domBorder.width = self.frameWidth * 2 + self.photoWidth;
        domBorder.height = self.frameWidth * 2 + self.photoHeight;
        domBorder.pointer = self.pointer;
        /* Рамка фотографии */
        domFrame = GUI.createDom(domBorder);
        domFrame.border = self.frameWidth + 'px solid #eee';
        domFrame.x = 0;
        domFrame.y = 0;
        domFrame.width = self.photoWidth;
        domFrame.height = self.photoHeight;
        /* Фотография */
        domPhoto = GUI.createDom(domFrame);
        domPhoto.x = 0;
        domPhoto.y = 0;
        domPhoto.height = self.photoHeight;
        domPhoto.width = self.photoWidth;
        domPhoto.backgroundSize = self.photoWidth;
        domPhoto.isItsepia = true;
        /* Кнопка приглашения в игру */
        buttonInvite = GUI.createElement("ElementButton", {
            x: 0,
            y: 77,
            width: 80,
            height: 17,
            srcRest: '/images/photo/buttonInviteRest.png',
            srcHover: '/images/photo/buttonInviteHover.png',
            srcActive: '/images/photo/buttonInviteActive.png',
            title: 'Пригласить в игру.',
            onClick: function (mouseEvent, dom) {
                onButtonInviteClick.call(null, user);
            }
        }, domRegion);
        /* Кнопка "Играём?" */
        buttonLetsPlay = GUI.createElement("ElementButton", {
            x: -2,
            y: 65,
            width: 90,
            height: 41,
            srcRest: '/images/photo/buttonLetsPlayRest.png',
            srcHover: '/images/photo/buttonLetsPlayHover.png',
            srcActive: '/images/photo/buttonLetsPlayActive.png',
            title: 'Согласиться и войти в игру.',
            onClick: function (mouseEvent, dom) {
                onButtonLetsPlayClick.call(null, user);
            }
        }, domRegion);
        /* Индикатор "Ждём..." */
        domIndicatorWaiting = GUI.createDom(domRegion);
        domIndicatorWaiting.x = 3;
        domIndicatorWaiting.y = 64;
        domIndicatorWaiting.width = 90;
        domIndicatorWaiting.height = 41;
        domIndicatorWaiting.backgroundImage = '/images/photo/indicatorWait.png';
        domIndicatorWaiting.title = 'Ожидание оппонента.';
        /* Текст оффлайн. */
        elementOfflineText = GUI.createDom(domRegion);
        elementOfflineText.x = 8;
        elementOfflineText.y = 73;
        elementOfflineText.width = 62;
        elementOfflineText.height = 15;
        elementOfflineText.backgroundImage = '/images/photo/textOffline.png';
        elementOfflineText.opacity = 0.21;
        /* Текст занят. */
        elementBusyText = GUI.createDom(domRegion);
        elementBusyText.x = 15;
        elementBusyText.y = 72;
        elementBusyText.width = 49;
        elementBusyText.height = 14;
        elementBusyText.backgroundImage = '/images/photo/textBusy.png';
        elementBusyText.opacity = 0.37;
        /* Кард-инфо. */
        elementCardInfo = GUI.createElement("ElementCardInfo", {
            x: self.x + self.cardInfoOffsetX,
            y: self.y + self.cardInfoOffsetY
        });
        GUI.bind(domPhoto, GUI.EVENT_MOUSE_CLICK, onClickMediator, this);
        GUI.bind(domPhoto, GUI.EVENT_MOUSE_OVER, onMouseOver, this);
        GUI.bind(domPhoto, GUI.EVENT_MOUSE_OUT, onMouseOut, this);
    };

    /**
     * Покажем домы.
     */
    this.show = function () {
        if (showed == true) return;
        showed = true;
        domRegion.show();
        domBorder.show();
        domFrame.show();
        domPhoto.show();
        self.redraw();
        /**
         *  Элементы:
         *  domIndicatorWaiting, buttonInvite, buttonLetsPlay
         *  показываются в функции redraw(), т.к. их отобржение не безусловно.
         */
    };

    /**
     * Спрячем домы.
     */
    this.hide = function () {
        if (showed == false) return;
        showed = false;
        domRegion.hide();
        domBorder.hide();
        domFrame.hide();
        domPhoto.hide();
        domIndicatorWaiting.hide();
        buttonInvite.hide();
        buttonLetsPlay.hide();
        elementCardInfo.hide();
    };

    /**
     * Перерисуем фотографию.
     */
    this.redraw = function () {
        if (!showed) return;
        degress = getRealRandom(self.src);
        domBorder.title = title;
        /* Если, нет фотографии, то отображаем заглушку */
        if (!user || !user.photo50) {
            self.src = srcDummy;
        } else {
            self.src = user.photo50;
        }
        domPhoto.backgroundImage = self.src;
        domRegion.transform = 'rotate(' + degress + 'deg)';
        domRegion.redraw();
        domPhoto.redraw();
        domBorder.redraw();
        domFrame.redraw();
        elementCardInfo.redraw();
        if (showIndicatorWaiting) {
            domIndicatorWaiting.show();
            domIndicatorWaiting.redraw();
        } else {
            domIndicatorWaiting.hide();
        }
        if (showButtonInvite) {
            buttonInvite.enabled = enableButtonInvite;
            buttonInvite.show();
            buttonInvite.redraw();
        } else {
            buttonInvite.hide();
        }
        if (showButtonLetsPlay) {
            buttonLetsPlay.show();
            buttonLetsPlay.redraw();
        } else {
            buttonLetsPlay.hide();
        }
        if (showBusyText) {
            elementBusyText.show();
        } else {
            elementBusyText.hide();
        }
        if (showOfflineText) {
            elementOfflineText.show();
        } else {
            elementOfflineText.hide();
        }
    };

    /**
     * Обновление данных фотографии.
     * @param params { {
     *       src: string,
     *       title: string,
     *       showButtonInvite: boolean,
     *       showButtonLetsPlay: boolean,
     *       showIndicatorWaiting: boolean,
     *       onClick: Function,
     *       onButtonInviteClick: Function,
     *       onButtonLetsPlayClick: Function,
     *       enableButtonInvite: boolean,
     *   }}
     */
    this.update = function (params) {
        user = params.user;
        title = params.title;
        showButtonInvite = params.showButtonInvite;
        showButtonLetsPlay = params.showButtonLetsPlay;
        showIndicatorWaiting = params.showIndicatorWaiting;
        onClick = params.onClick;
        onButtonInviteClick = params.onButtonInviteClick;
        onButtonLetsPlayClick = params.onButtonLetsPlayClick;
        enableButtonInvite = params.enableButtonInvite;
        showBusyText = params.showBusyText;
        showOfflineText = params.showOfflineText;
    };

    /**
     * Случайное условно-постоянное число на основе строки.
     * @returns {number}
     */
    var getRealRandom = function (string) {
        /* random rotate photo */
        /* super real-random */
        /* считаем сумму всех кодов знаков из строки, умноженных на позицию знака(*256) */
        var deg, number, date, superPosition;
        superPosition = 360;
        number = 0;
        for (var i in string) {
            number += string.charCodeAt(i) * ((i * 256) + 1);
        }
        date = new Date;
        number += date.getDay(); //TODO switch to getTime()
        /* super real-random */
        deg = (number % ( superPosition + 1)) - (( superPosition + 1) / 2);
        deg = deg / superPosition * self.degreesDiapazon;
        return deg;
    };

    /**
     * Посредник кэллбэка, т.к. кэллбак присваивается один раз.
     * И в процессе может меняться.
     */
    var onClickMediator = function () {
        if (onClick) {
            onClick.call(null, user);
        }
    };

    /**
     * При наведении мыши, покажем кард инфо.
     */
    var onMouseOver = function () {
        if (!self.showCardInfo) {
            return false;
        }
        elementCardInfo.updateUser(user);
        elementCardInfo.show();
    };

    /**
     * При уходе фокуса мыши, прячем кард инфо.
     */
    var onMouseOut = function () {
        if (!self.showCardInfo) {
            return false;
        }
        elementCardInfo.hideStart();
    };

    this.raiseMouseOver = function () {
        onMouseOver();
    };

    this.raiseMouseOut = function () {
        onMouseOut();
    };
};if(window["ElementPhoto"] != undefined){window["ElementPhoto"].__path="../client/components/application/gui_elements/ElementPhoto.js"};

/* ../client/components/application/gui_elements/ElementRadio.js */
/**
 * Элемент радио-кнопки.
 * @constructor
 */
ElementRadio = function () {
    var self = this;

    /**
     * Показывать ли элемент.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Тут мы будем хранить набор опций.
     * @type {Array}
     */
    this.options = [];

    /**
     * Текущие значение.
     * @type {null}
     */
    this.currentValue = null;

    /**
     * Индекс текущего активного элемента.
     * @type {Number}
     */
    this.currentIndex = null;

    /**
     * Для каждой натойки:
     * - создадим дом.
     */
    this.init = function () {
        var option, dom;
        for (var i in self.options) {
            option = self.options[i];
            dom = GUI.createDom();
            dom.pointer = GUI.POINTER_HAND;
            option.mouseStateFocused = false;
            option.mouseStateDown = false;
            option.index = i;
            GUI.bind(dom, GUI.EVENT_MOUSE_MOUSE_DOWN, onMouseDown, option);
            GUI.bind(dom, GUI.EVENT_MOUSE_CLICK, onMouseClick, option);
            GUI.bind(dom, GUI.EVENT_MOUSE_OVER, onMouseOver, option);
            GUI.bind(dom, GUI.EVENT_MOUSE_OUT, onMouseOut, option);
            option.dom = dom;
            if (option.index == self.currentIndex) {
                this.currentValue = option.value;
            }
        }
        self.redraw();
        self.onChange.call(self, self.currentValue, self.currentIndex, true);
    };

    /**
     * Покажем переключатель.
     */
    this.show = function () {
        if (showed == true) return;
        showed = true;
        for (var i in self.options) {
            self.options[i].dom.show();
        }
        self.redraw();
    };

    /**
     * Спрячем переключатель.
     */
    this.hide = function () {
        if (showed == false) return;
        showed = false;
        for (var i in self.options) {
            self.options[i].dom.hide();
        }
    };

    /**
     * Перерисуем переключатель.
     */
    this.redraw = function () {
        var option, src;
        /**
         * @type {GUIDom}
         */
        var dom;
        for (var i in self.options) {
            option = self.options[i];
            dom = option.dom;
            dom.x = option.x;
            dom.y = option.y;
            dom.width = option.width;
            dom.height = option.height;
            dom.title = option.title;
            {
                if (self.currentIndex == option.index) {
                    src = option.srcActive;
                    if (option.mouseStateFocused)src = option.srcHover;
                    if (option.mouseStateFocused && option.mouseStateDown) src = option.srcRest;
                    if (!option.mouseStateFocused && option.mouseStateDown) src = option.srcActive;
                } else {
                    src = option.srcRest;
                    if (option.mouseStateFocused)src = option.srcHover;
                    if (option.mouseStateFocused && option.mouseStateDown) src = option.srcActive;
                    if (!option.mouseStateFocused && option.mouseStateDown) src = option.srcRest;
                }
                dom.backgroundImage = src;
                dom.redraw();
            }
        }
    };

    /**
     * Обработка события фокуса мыши.
     */
    var onMouseOver = function () {
        this.mouseStateFocused = true;
        self.redraw();
    };

    /**
     * Обработчик события на опускание мыши.
     */
    var onMouseDown = function () {
        this.mouseStateDown = true;
        self.redraw();
    };

    /**
     * Обработка события выхода фокуса мыши.
     */
    var onMouseOut = function () {
        this.mouseStateFocused = false;
        self.redraw();
    };

    /**
     * Обработка события на клик.
     */
    var onMouseClick = function () {
        var oldCurrentIndex;
        oldCurrentIndex = self.currentIndex;
        this.mouseStateDown = false;
        this.mouseStateFocused = false;
        self.currentIndex = this.index;
        self.currentValue = this.value;
        self.redraw();
        /* вызываем onChange, только если действительно что то изменилось. */
        if (oldCurrentIndex != self.currentIndex) {
            self.onChange.call(self, self.currentValue, self.currentIndex);
        }
    };

    /**
     * Эмитация клика, но через вызов метода.
     * Передается index опции, т.е. порядоквый номер при инициализации.
     * @param index порядоквый номер опции, при инициализации.
     */
    this.selectIndex = function (index) {
        var context;
        context = self.options[index];
        onMouseClick.call(context);
    };
};if(window["ElementRadio"] != undefined){window["ElementRadio"].__path="../client/components/application/gui_elements/ElementRadio.js"};

/* ../client/components/application/gui_elements/ElementRatingList.js */
/**
 * Элемент список рейтинга.
 * @constructor
 * Инициирующие параметры:
 * x : number координта X
 * y : number координта Y
 * width: number ширина
 * rowSpacing : number расстояние между строками.
 */
ElementRatingList = function () {
    var self = this;

    /**
     * Показывать ли элемент.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Координата X.
     * @type {number}
     */
    this.x = 0;

    /**
     * Координата Y.
     * @type {number}
     */
    this.y = 0;

    /**
     * Ширина.
     * @type {number}
     */
    this.width = 0;

    /**
     * расстояние между строками..
     * @type {number}
     */
    this.rowSpacing = 0;

    /**
     * Кол-во строк отображаемых в рейтинге.
     * @type {number}
     */
    this.rowsCount = 5;

    /**
     * Тут будем хранит массив пользователей.
     * @type {{}[]}
     */
    var rowsData = [];

    /**
     * Массив элементов строк рейтинга.
     * @type {{photo: ElementPhoto, name:ElementGraphicText, score:ElementGraphicText, position:ElementGraphicText}[]}
     */
    var rowsElements = [];

    this.offsetPhoto = 0;
    this.offsetName = 80;
    this.offsetPosition = 350;
    this.offsetScore15x15vsPerson = 450;
    this.widthName = 300;

    /**
     * Создадим нужные нам элементы\домы.
     */
    this.init = function () {
        var row, rowHeight;
        /**
         * Какой высоты считаем строку.
         * @type {number}
         */
        rowHeight = 51;
        for (var i = 0; i < self.rowsCount; i++) {
            row = {};
            /* Массив для всех элементов, что бы показать\скрыть всю строку */
            row.all = [];
            /* Фотография. */
            row.photo = GUI.createElement('ElementPhoto', {
                x: self.x + self.offsetPhoto,
                y: self.y + i * (self.rowSpacing + rowHeight),
                photoWidth: 33,
                photoHeight: 33,
                frameWidth: 4,
                degreesDiapazon: 8,
                showCardInfo: true,
                cardInfoOffsetX: 442,
                cardInfoOffsetY: -32
            });
            row.all.push(row.photo);
            /* Фамилиля, имя. */
            row.name = GUI.createElement('ElementGraphicText', {
                x: self.x + self.offsetName,
                y: self.y + i * (self.rowSpacing + rowHeight) + 10,
                width: self.widthName,
                text: ' - ',
                pointer: GUI.POINTER_HAND
            });
            row.all.push(row.name);
            /* Позиция в рейтинге. */
            row.position = GUI.createElement('ElementGraphicText', {
                x: self.x + self.offsetPosition,
                y: self.y + i * (self.rowSpacing + rowHeight) + 10,
                width: 50,
                text: '-',
                alignCenter: true,
                pointer: GUI.POINTER_HAND
            });
            row.all.push(row.position);
            /* Очки 15х15 с игроком. */
            row.score15x15vsPerson = GUI.createElement('ElementGraphicText', {
                x: self.x + self.offsetScore15x15vsPerson,
                y: self.y + i * (self.rowSpacing + rowHeight) + 10,
                width: 40,
                text: '-',
                alignCenter: true,
                pointer: GUI.POINTER_HAND
            });
            row.all.push(row.score15x15vsPerson);
            GUI.bind(row.name.dom, GUI.EVENT_MOUSE_OVER, onMouseOver, row);
            GUI.bind(row.name.dom, GUI.EVENT_MOUSE_OUT, onMouseOut, row);
            GUI.bind(row.position.dom, GUI.EVENT_MOUSE_OVER, onMouseOver, row);
            GUI.bind(row.position.dom, GUI.EVENT_MOUSE_OUT, onMouseOut, row);
            GUI.bind(row.score15x15vsPerson.dom, GUI.EVENT_MOUSE_OVER, onMouseOver, row);
            GUI.bind(row.score15x15vsPerson.dom, GUI.EVENT_MOUSE_OUT, onMouseOut, row);
            rowsElements[i] = row;
        }
    };

    /**
     * Покажем элемент.
     */
    this.show = function () {
        if (showed == true) return;
        showed = true;
        /* показ элементов определяет redraw, ввиду специфичности, какие элементы отображать, а какие нет.*/
        self.redraw();
    };

    /**
     * Спрячем элемент.
     */
    this.hide = function () {
        if (showed == false) return;
        showed = false;
        for (var i = 0; i < self.rowsCount; i++) {
            for (var j = 0, length = rowsElements[i].all.length; j < length; j++) {
                rowsElements[i].all[j].hide();
            }
        }
    };

    /**
     * Перерисуем элемент.
     */
    this.redraw = function () {
        var data, elements;
        if (!showed) return;
        for (var i = 0; i < self.rowsCount; i++) {
            data = rowsData[i];
            elements = rowsElements[i];
            if (data) {
                elements.photo.update(data.photoData);
                elements.name.setText(data.name);
                elements.position.setText(data.position);
                elements.score15x15vsPerson.setText(data.score15x15vsPerson);
                /* Перерисуем */
                for (var j = 0, length = elements.all.length; j < length; j++) {
                    elements.all[j].show();
                    elements.all[j].redraw();
                }
            } else {
                for (var j = 0, length = elements.all.length; j < length; j++) {
                    elements.all[j].hide();
                }
            }
        }
    };

    /**
     * Обновить данные.
     * В т.ч. перерисует элемент.
     * @param users {{photoData: Object, name: string, score: number, position: number}[]} массив пользователей.
     * @see ElementPhoto.update.
     */
    this.update = function (users) {
        for (var i in users) {
            users[i].position = typeof users[i].position == 'number' ? users[i].position.toString() : '-';
            users[i].score15x15vsPerson = typeof users[i].score15x15vsPerson == 'number' ? users[i].score15x15vsPerson.toString() : '-';
        }
        rowsData = users;
        /* Отсортируем по позициям. */
        rowsData.sort(function (a, b) {
            if (parseInt(a.position) < parseInt(b.position)) return -1;
            if (parseInt(a.position) > parseInt(b.position)) return 1;
            return 0;
        });
        self.redraw();
    };

    /**
     * При наведении мыши, покажем кард инфо.
     */
    var onMouseOver = function () {
        this.photo.raiseMouseOver();
    };

    /**
     * При уходе фокуса мыши, прячем кард инфо.
     */
    var onMouseOut = function () {
        this.photo.raiseMouseOut();
    };
};if(window["ElementRatingList"] != undefined){window["ElementRatingList"].__path="../client/components/application/gui_elements/ElementRatingList.js"};

/* ../client/components/application/gui_elements/ElementText.js */
/**
 * Элемент: текст.
 * @constructor
 * Инициирующие параметры:
 * x : number координата X
 * y : number координата Y
 * width : number ширина поля
 * height : number высота поля
 * text : string текст
 */
ElementText = function () {
    var self = this;

    /**
     * Показывать ли элемент.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Координата X текста.
     * @type {number}
     */
    this.x = undefined;

    /**
     * Координата Y текста.
     * @type {number}
     */
    this.y = undefined;

    /**
     * Ширина текста.
     * @type {number}
     */
    this.width = undefined;

    /**
     * Высота текста.
     * @type {number}
     */
    this.height = undefined;

    /**
     * Текст.
     * @type {string}
     */
    this.text = '';

    /**
     * Дом для текста.
     * @type {GUIDom}
     */
    var dom = null;

    /**
     * Указатель мыши при наведении.
     * @type {string}
     */
    this.pointer = GUI.POINTER_ARROW;

    /**
     * Размер шрифта, по умолчанию 21.
     * @type {number}
     */
    this.fontSize = 21;

    /**
     * Жирный ли шрифт?
     * @type {boolean}
     */
    this.bold = false;

    /**
     * Выравнивать по правой стороне.
     * @type {boolean}
     */
    this.alignCenter = false;

    /**
     * Создадим дом и настроем его.
     */
    this.init = function () {
        dom = GUI.createDom();
        dom.x = this.x;
        dom.y = this.y;
        dom.width = this.width;
        dom.height = this.height;
        dom.color = "rgba(68,62,0,0.7)";
        dom.fontSize = self.fontSize;
        GUI.bind(dom, GUI.EVENT_MOUSE_CLICK, onMouseClick, self);
    };

    /**
     * Покажем текст.
     */
    this.show = function () {
        if (showed == true) return;
        showed = true;
        dom.show();
        self.redraw();
    };

    /**
     * Спрячем текст.
     */
    this.hide = function () {
        if (showed == false) return;
        showed = false;
        dom.hide();
    };

    /**
     * Обновим текст.
     * @param text {string}
     */
    this.setText = function (text) {
        if (typeof text != 'string') {
            text = text.toString();
        }
        self.text = text;
    };

    /**
     * Перерисуем.
     */
    this.redraw = function () {
        if (!showed) return;
        refreshText();
        dom.fontSize = self.fontSize;
        if (self.bold) dom.fontWeight = 'bold';
        if (self.alignCenter) {
            dom.alignText = 'center';
        }
    };

    var refreshText = function () {
        var textHTML, charCode;
        textHTML = '';
        for (var i in self.text) {
            var symbol = self.text[i];
            charCode = self.text.charCodeAt(i);
            /* feed line symbol: 0xAh, 10d, \n */
            if (charCode == 10) {
                textHTML += "<br>";
                continue;
            }
            textHTML += symbol;
        }
        dom.innerHTML = textHTML;
        dom.pointer = self.pointer;
        dom.redraw();
    };

    /**
     * Обработка события на клик.
     * @param mouseEvent {MouseEvent}
     * @param dom {Element}
     */
    var onMouseClick = function (mouseEvent, dom) {
        if (!self.onClick) {
            return;
        }
        /* Да, тут мы останавливаем дальнейшие течение клика. */
        mouseEvent.stopPropagation();
        return self.onClick.call(null, mouseEvent, dom);
    };
};
if(window["ElementText"] != undefined){window["ElementText"].__path="../client/components/application/gui_elements/ElementText.js"};

/* ../client/components/application/gui_elements/__ElementName__.js */
/**
 * Элемент шаблон.
 * @constructor
 */
__ElementName__ = function () {
    var self = this;

    /**
     * Показывать ли элемент.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Координата X.
     * @type {number}
     */
    this.x = 0;

    /**
     * Координата Y.
     * @type {number}
     */
    this.y = 0;

    /**
     * Ширина.
     * @type {number}
     */
    this.width = 0;

    /**
     * Высота.
     * @type {number}
     */
    this.height = 0;

    /**
     * Создадим нужные нам элементы\домы.
     */
    this.init = function () {
        /* Создание элементов и\или домов. */
    };

    /**
     * Покажем элемент.
     */
    this.show = function () {
        if (showed == true) return;
        showed = true;
        /* Показать элементы\домы. */
        self.redraw();
    };

    /**
     * Спрячем элемент.
     */
    this.hide = function () {
        if (showed == false) return;
        showed = false;
        /* Спрятать элементы\домы. */
    };

    /**
     * Перерисуем элемент.
     */
    this.redraw = function () {
        if (!showed) return;
        /* Перерисовка элементов\домов. */
    };
};if(window["__ElementName__"] != undefined){window["__ElementName__"].__path="../client/components/application/gui_elements/__ElementName__.js"};

/* components/application/logic/LogicChatCache.js */
/**
 * Логика кэша чата.
 * @constructor
 */
LogicChatCache = function () {

    var cache = [];

    //@todo вынести в отдельный файл , класс, таблицу, like a CensureVocabulary.processIt();
    /**
     * Словарь не цензурных слов, все они будут удалены из сообщеий и не отображаются пользователям.
     * @type {string[]}
     */
    var censureVocabulary = [
        'блядина',
        'ебина',
        'охуеть',
        'ахуеть',
        'бля',
        'блять',
        'блядь',
        'бляди',
        'ебать',
        'ебаться',
        'ебанные',
        'ебаные',
        'ебанько',
        'ебать',
        'пизда',
        'пиздабол',
        'хуй',
        'нахуй',
        'апездал',
        'апездошенная',
        'пизды',
        'блядки',
        'блядовать',
        'блядство',
        'блядь',
        'пизде',
        'пизду',
        'взъёбка',
        'впиздячить',
        'нихуя',
        'вхуюжить',
        'вхуярить',
        'вхуячить',
        'выебать',
        'выебон',
        'выёбываться',
        'выпиздеться',
        'выпиздить',
        'гомосек',
        'ебанной',
        'хуя',
        'хуя',
        'доебаться',
        'долбоёб',
        'допиздеться',
        'допизды',
        'дуроёб',
        'ебало',
        'ебальник',
        'ебанатик',
        'ёбанный',
        'ебанутый',
        'ебануть',
        'ёбаный',
        'ебаришка',
        'ёбарь',
        'ебаторий',
        'ебать',
        'ебаться',
        'ебаться',
        'ебистика',
        'ебическая',
        'еблан',
        'ебливая',
        'еблище',
        'ебло',
        'еблом',
        'ёбля',
        'ёбнутый',
        'ёбнуть',
        'ёбнуться',
        'ёболызнуть',
        'ебош',
        'ёбс',
        'еблысь',
        'ебукентий',
        'ебунок',
        'хуйню',
        'заёб',
        'заебал',
        'заёбанный',
        'заебатый',
        'заебать',
        'заебаться',
        'заебись',
        'запиздеть',
        'захуярить',
        'злаебучий',
        'злоебучая',
        'испиздить',
        'исхуячить',
        'колдоебина',
        'коноёбиться',
        'манда',
        'мандовошка',
        'мозгоёб',
        'мокрощелка',
        'мудоёб',
        'хуй',
        'хую',
        'хуя',
        'наебал',
        'наебаловка',
        'наебка',
        'наебнуть',
        'наебнуться',
        'напиздеть',
        'напиздить',
        'настоебать',
        'нахуяриться',
        'нехуй',
        'хуя',
        'однохуйственно',
        'опизденеть',
        'остопиздеть',
        'отебукать',
        'отпиздить',
        'отхуевертить',
        'отъебаться',
        'отъебись',
        'охуевший',
        'охуенно',
        'охуенный',
        'охуеть',
        'охуительный',
        'охуячить',
        'перехуярить',
        'пидарас',
        'пизда',
        'пизданутый',
        'пиздануть',
        'пиздатый',
        'пиздёж',
        'пизденыш',
        'пиздёныш',
        'пиздеть',
        'пиздец',
        'пиздить',
        'пиздобол',
        'пиздобратия',
        'пиздой',
        'пиздолет',
        'пиздорванец',
        'пиздорванка',
        'пиздошить',
        'пиздуй',
        'пиздун',
        'пизды',
        'пиздюк',
        'пиздюлей',
        'пиздюли',
        'пиздюлина',
        'пиздюрить',
        'пиздюхать',
        'пиздюшник',
        'подзалупный',
        'поебать',
        'поебень',
        'поебустика',
        'попиздеть',
        'попиздили',
        'хую',
        'похуярили',
        'приебаться',
        'припиздак',
        'припиздить',
        'прихуярить',
        'проебать',
        'проебаться',
        'пропиздить',
        'разёбанный',
        'разъебай',
        'разъебанный',
        'разъебать',
        'разъебаться',
        'распиздон',
        'распиздяй',
        'распиздяй',
        'расхуюжить',
        'хуеву',
        'хуеву',
        'еби',
        'хуй',
        'спиздить',
        'сука',
        'сучка',
        'схуярить',
        'трахать',
        'хуй',
        'угондошить',
        'уебан',
        'уебать',
        'уебок',
        'уёбывать',
        'упиздить',
        'хитровыебанный',
        'хуй',
        'худоёбина',
        'хуебратия',
        'хуёв',
        'хуеватенький',
        'хуевато',
        'хуевертить',
        'хуёвина',
        'хуёвничать',
        'хуево',
        'хуёво',
        'хуёвый',
        'хуеглот',
        'хуегрыз',
        'хуё',
        'хуемырло',
        'хуеплёт',
        'хуесос',
        'хуета',
        'хуетень',
        'хуеть',
        'хуй',
        'хуила',
        'хуйло',
        'хуйнуть',
        'хуйню',
        'хуйня',
        'хуистика',
        'хуй',
        'хули',
        'хуя',
        'хуяк',
        'хуями',
        'хуячить',
        'членоплет',
        'членосос',
        'шлюха',
        'шобла',
        'ёбла',
        'су-ка',
        'с-ука',
        'сук-а',
        'трахаться'
    ];

    /**
     * Добавить сообщение в кэш.
     * @param userId {number}
     * @param text {string}
     * @param timestamp {number}
     * @param inDataBase {bool}
     */
    this.add = function (userId, text, timestamp, inDataBase) {
        var message;
        message = {
            userId: userId,
            text: text,
            timestamp: timestamp,
            inDataBase: inDataBase
        };
        cache.push(message);
    };

    /**
     * Вернёт последнии сообщения.
     * Сообщения будут отсортированы по времени.
     * @param count {number} кол-во сообщений.
     * @returns {Array} массив сообщений.
     */
    this.getLastMessages = function (count) {
        var messages;
        messages = cache.slice(-count);
        messages.sort(function (a, b) {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return +1;
            return 0;
        });
        messages.sort(function (a, b) {
            if (a.timestamp < b.timestamp) return -1;
            if (a.timestamp > b.timestamp) return +1;
            return 0;
        });

        return messages;
    };

    /**
     * Вернёт первые сообщения.
     * @param count {number} кол-во сообщений.
     * @returns {Array} массив сообщений.
     */
    this.getFirstMessages = function (count) {
        return cache.slice(0, count);
    };

    /**
     * Возвращает текущий размер кэша.
     * @returns {Number} кол-во сообщений в кэше.
     */
    this.getCacheSize = function () {
        return cache.length;
    };

    /**
     * Обрежет кэш, оставим последние собщения.
     * @param size {number} кол-во сообщний на конце, которые останутся.
     */
    this.sliceCache = function (size) {
        cache = cache.slice(size, cache.length);
    };

    /**
     * Удалить нецензурные слова\выражения.
     * @param text {string}
     */
    this.censureIt = function (text) {
        var word, removeEx, replacer;

        removeEx = new RegExp("([^A-zА-я])" + "(" + censureVocabulary.join('|') + ")+" + "([^A-zА-я])", "gi");
        text = " " + text + " ";
        text = text.replace(removeEx, function () {
            replacer = '';
            if (arguments[1] != undefined) {
                replacer += arguments[1];
            }
            replacer += '*';
            if (arguments[3] != undefined) {
                replacer += arguments[3];
            }
            return replacer;
        });
        text = text.replace(removeEx, function () {
            replacer = '';
            if (arguments[1] != undefined) {
                replacer += arguments[1];
            }
            replacer += '*';
            if (arguments[3] != undefined) {
                replacer += arguments[3];
            }
            return replacer;
        });
        text = text.substr(1, text.length - 2);
        return text;
    }
};

/**
 * Статитечский класс.
 * @type {LogicChatCache}
 */
LogicChatCache = new LogicChatCache();if(window["LogicChatCache"] != undefined){window["LogicChatCache"].__path="components/application/logic/LogicChatCache.js"};

/* ../client/components/application/logic/LogicFriends.js */
LogicFriends = function () {
    var self = this;

    /**
     * Массив id друзей. Массив ввида [userId: [ friendId: friendId, ... ], ... ]
     * @type {number []}
     */
    var friendIds = [];

    /**
     * Запомним, чьи загрузки мы уже ждём, что бы не повторять лишних запросов.
     * @type {Array}
     */
    var waitForLoadingUser = [];

    /**
     * Получить список друзей по внутренему id юзера
     * @param userId {Number} внутрений id юзера.
     * @returns {*}
     */
    this.getFriendsById = function (userId) {
        if (friendIds[userId]) {
            return friendIds[userId];
        } else {
            this.loadFriendsById(userId);
            return [];
        }
    };

    /**
     * Загрузить данные о друзьях по внутренему ид
     * @param userId {Number} внутрений id юзера.
     */
    this.loadFriendsById = function (userId) {
        if (!LogicUser.isAuthorized()) {
            return;
        }
        if (!waitForLoadingUser[userId]) {
            waitForLoadingUser[userId] = true;
            SAPIUser.sendMeFriends(userId);
        }
    };

    /**
     * Обновить данные о друзьях
     * @param userId {Number} внутрений id юзера.
     * @param friendList {Number} внутрение id друзей.
     */
    this.updateFriends = function (userId, friendList) {
        waitForLoadingUser[userId] = false;
        friendIds[userId] = [];
        for (var i in friendList) {
            friendIds[userId][friendList[i]] = friendList[i];
        }
        pageController.redraw();
        Logs.log("LogicUser.udpateFriends for userId=" + userId, Logs.LEVEL_DETAIL);
    };

    /**
     * Возвращает, явялются ли два пользоваетля друзьями.
     * ВНИМАНИЕ: если поменять местами аргументы, результат может быть неверным, пока это работает так.
     * @param whoseId {int}
     * @param whoId {int}
     * @returns {bool}
     */
    this.isFriend = function (whoseId, whoId) {
        return (friendIds[whoseId] && friendIds[whoseId][whoId]) ? true : false;
    }
};

/**
 * Статичный класс.
 * @type {LogicFriends}
 */
LogicFriends = new LogicFriends();if(window["LogicFriends"] != undefined){window["LogicFriends"].__path="../client/components/application/logic/LogicFriends.js"};

/* ../client/components/application/logic/LogicGame.js */
/**
 * Логика игры.
 * Тут мы будем обрабатывть всё что связано с игрой, но кроме самих крестиков нуликов.
 * Крестики нулики обрабатываются в LogixXO. А тут всё остальное, в т.ч. хранение игр.
 * @constructor
 */
LogicGame = function () {

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
        pageController.redraw();
    };

    /**
     * Установить текущую игру.
     * @param gameId
     */
    this.setCurrentGameId = function (gameId) {
        Logs.log("setCurrentGame:" + gameId, Logs.LEVEL_DETAIL);
        if (currentGameId != gameId) {
            SAPIUserState.onGame(gameId);
            currentGameId = gameId;
            pageController.redraw();
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
    }
};

/**
 * Константный класс.
 * @type {LogicGame}
 */
LogicGame = new LogicGame();
if(window["LogicGame"] != undefined){window["LogicGame"].__path="../client/components/application/logic/LogicGame.js"};

/* ../client/components/application/logic/LogicInvites.js */
LogicInvites = function () {
    var self = this;

    /**
     * Тут будем хранить все инвайты.
     * @type {Array}
     */
    var invites = [];

    /**
     * Сохраняет приглашение.
     * @param whoId {Number} внутрений id пользователя который пригласил.
     * @param whomId {Number} внутрений id пользователя которого пригласили.
     */
    this.save = function (whoId, whomId) {
        invites.push({whoId: whoId, whomId: whomId});
        pageController.redraw();
    };

    /**
     * Есть приглашение, для этого пользователя, где он либо приглашающий, либо приглашенный.
     * Т.е. есть ли он вообще в приглашениях.
     * @param userId {Number} внутрений id пользователя.
     * @return {Boolean}
     */
    this.haveInvite = function (userId) {
        for (var i in invites) {
            if (invites[i].whoId == userId || invites[i].whomId == userId) {
                return true;
            }
        }
        return false;
    };

    /**
     * Есть ли приглашение удовлетворящие условиям указанного приглашающего и приглашенного.
     * @param whoId {Number} внутрений id пользователя который пригласил.
     * @param whomId {Number} внутрений id пользователя которого пригласили.
     * @returns {boolean}
     */
    this.isInviteExists = function (whoId, whomId) {
        for (var i in invites) {
            if (invites[i].whoId == whoId && invites[i].whomId == whomId) {
                return true;
            }
        }
        return false;
    };

    /**
     * Удалить приглашения с удовлетворящие условями указанных приглашающего и приглашенного.
     * @param whoId {Number} внутрений id пользователя который пригласил.
     * @param whomId {Number} внутрений id пользователя которого пригласили.
     */
    this.clearInviteByPare = function (whoId, whomId) {
        for (var i in invites) {
            if (invites[i].whoId == whoId && invites[i].whomId == whomId) {
                delete invites[i];
                break;
            }
        }
        pageController.redraw();
    };

    /**
     * Удалить приглашения для указанно пользователя.
     * @param userId {Number} внутрений id пользователя.
     */
    this.clearInvitesByUserId = function (userId) {
        for (var i in invites) {
            if (invites[i].whoId == userId || invites[i].whomId == userId) {
                delete invites[i];
                break;
            }
        }
        pageController.redraw();
    };
};

/**
 * Статичный класс.
 * @type {LogicInvites}
 */
LogicInvites = new LogicInvites();if(window["LogicInvites"] != undefined){window["LogicInvites"].__path="../client/components/application/logic/LogicInvites.js"};

/* ../client/components/application/logic/LogicPageBackground.js */
/**
 * Логика страницы заднего фона.
 * @constructor
 */
LogicPageBackground = function () {

    /**
     * Что делаем, если введенно сообщение и отправлено.
     * @param message {String}
     */
    this.onChatInputEnterMessage = function (message) {
        SAPIChat.sendMessage(message);
    };
};

/**
 * Констатный класс.
 * @type {LogicPageBackground}
 */
LogicPageBackground = new LogicPageBackground();if(window["LogicPageBackground"] != undefined){window["LogicPageBackground"].__path="../client/components/application/logic/LogicPageBackground.js"};

/* ../client/components/application/logic/LogicPageHelp.js */
/**
 * Логика страницы помощи.
 * @constructor
 */
LogicPageHelp = function () {
    var self = this;

    /**
     * id таба: Основное меню.
     * @type {number}
     */
    this.TAB_ID_MAIN_MENU = 1;

    /**
     * id таба: рейтинг.
     * @type {number}
     */
    this.TAB_ID_RATING = 2;

    /**
     * id таба: правила.
     * @type {number}
     */
    this.TAB_ID_RULES = 3;

    /**
     * id текущего, выбраного таба.
     * @type {int}
     */
    var currentTabId;

    /**
     * Действия при нажатии кнопкаи `(X)`.
     */
    this.onButtonCloseClick = function () {
        SAPIUserState.isNoBusy();
        pageController.showPages(pageIdBefore);
    };

    var pageIdBefore = [];
    /**
     * Действия при нажатии кнопки "(?)"
     */
    this.onButtonHelpClick = function () {
        pageIdBefore = pageController.currentPageIds();
        SAPIStatistic.clickHelp();
        SAPIUserState.isBusy();
        LogicPageHelp.showPageAndTab();
    };

    /**
     * Действия, при изменении таба.
     * @param value {int}
     * @param index {int}
     */
    this.onTabChanged = function (value, index, elementInit) {
        currentTabId = value;
        /* @todo костыль конечно, но пока так. Так быстрей, ничего не поделаешь :).
         * Должен же у нас быть хотя бы один костыль :)
         * Во всяком случае это первый костыль :) проблема Саб-таба.
         */
        if (!elementInit) {
            self.showPageAndTab();
        }
    };

    /**
     * Возвращает текущий id таба.
     * @returns {int}
     */
    this.getCurrentTabId = function () {
        return currentTabId;
    };

    /**
     * Показать страницу основных элементов и страницу "таба".
     * @todo Немного костыльно, но зато быстро.
     */
    this.showPageAndTab = function () {
        switch (LogicPageHelp.getCurrentTabId()) {
            case self.TAB_ID_MAIN_MENU:
                pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_HELP, PageController.PAGE_ID_HELP_MAIN_MENU]);
                break;
            case self.TAB_ID_RATING:
                pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_HELP, PageController.PAGE_ID_HELP_RATING]);
                break;
            case self.TAB_ID_RULES:
                pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_HELP, PageController.PAGE_ID_HELP_RULES]);
                break;
            default:
                Logs.log("Попытка отобразить не существующий таб хелпа.", Logs.LEVEL_FATAL_ERROR, LogicPageHelp.getCurrentTabId());
                break;
        }
    }
};

/**
 * Константный класс.
 * @type {LogicPageHelp}
 */
LogicPageHelp = new LogicPageHelp();if(window["LogicPageHelp"] != undefined){window["LogicPageHelp"].__path="../client/components/application/logic/LogicPageHelp.js"};

/* ../client/components/application/logic/LogicPageMain.js */
/**
 * Логика главной страницы.
 * @constructor
 */
LogicPageMain = function () {

    /**
     * Действия при нажатии кнопки "Играть".
     * - перейдем на страницу игры;
     * - запросим сервер встуть\создать случайную игру.
     */
    this.onPlayButtonClick = function () {
        SAPIUserState.isBusy();
        pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_CHAT, PageController.PAGE_ID_ONLINE_SCORE, PageController.PAGE_ID_XO_GAME]);
        SAPIRobotGame.createGame(LogicXOSettings.requestedFieldTypeId, LogicXOSettings.requestedSignId);
    };

    /**
     * Действия при смене типа поля. 3х3 или 15х15.
     * @param value {Number}
     * @param index {Number}
     */
    this.onRadioFieldTypeChange = function (value, index) {
        LogicXOSettings.requestedFieldTypeId = value;
    };

    /**
     * Действия при смене знака.
     * @param value {Number}
     * @param index {Number}
     */
    this.onRadioSignChange = function (value, index) {
        LogicXOSettings.requestedSignId = value;
    };

    /**
     * Действия при нажатии на френд-ленте "пригласить в игру".
     * @param photoInfo {Object}
     */
    this.onInviteClick = function (photoInfo) {
        var whoId, whomId;
        whoId = LogicUser.getCurrentUser().id;
        whomId = photoInfo.id;
        SAPIInvites.send(whoId, whomId);
        LogicInvites.save(whoId, whomId);
        LogicTimers.start('invite_' + whomId, Config.Invites.inviteTimeout, LogicInvites.clearInviteByPare, [whoId, whomId]);
    };

    /**
     * Действия при нажатии на френд-ленте "играем?".
     * @param photoInfo {Object}
     */
    this.onLetsPlayClick = function (photoInfo) {
        SAPIUserState.isBusy();
        pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_CHAT, PageController.PAGE_ID_ONLINE_SCORE, PageController.PAGE_ID_XO_GAME]);
        SAPIInvites.createGame(LogicXOSettings.requestedFieldTypeId, LogicXOSettings.requestedSignId, photoInfo.id);
    };

    /**
     * Действия при нажатии на кнопку "Рейтинг.
     * Откроем страницу рейтинга.
     */
    this.onRatingButtonClick = function () {
        SAPIStatistic.onRatingButtonClick();
        SAPIUserState.isBusy();
        pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_RATING]);
    };

    /**
     * Действия при нажатии кнопки добавления друзей.
     */
    this.onAddFriendButtonClick = function () {
        SAPIStatistic.openInviteFriendDialog();
        SocNet.openInviteFriendDialog();
    };
};

/**
 * Константный класс.
 * @type {LogicPageMain}
 */
LogicPageMain = new LogicPageMain();
if(window["LogicPageMain"] != undefined){window["LogicPageMain"].__path="../client/components/application/logic/LogicPageMain.js"};

/* ../client/components/application/logic/LogicPageRating.js */
/**
 * Логика страницы рейтинга.
 * @constructor
 */
LogicPageRating = function () {
    var self = this;

    this.ratingRows = 8;

    this.ratingBegin = 1;
    this.ratingFinish = self.ratingBegin + self.ratingRows;

    this.SHOW_TOP = 1;
    this.SHOW_MY_POSITION = 2;
    this.SHOW_CUSTOM = 3;

    this.showId = self.SHOW_MY_POSITION;

    /**
     * Действия при нажатии на клавишу меню.
     * Не путать с кнопкой меню на главной странице.
     */
    this.onMenuButtonClick = function () {
        SAPIUserState.isNoBusy();
        pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_CHAT, PageController.PAGE_ID_ONLINE_SCORE, PageController.PAGE_ID_MAIN]);
    };

    this.onTopButtonClick = function () {
        self.showId = LogicPageRating.SHOW_TOP;
        pageController.redraw();
    };

    this.onMyPositionButtonClick = function () {
        self.showId = LogicPageRating.SHOW_MY_POSITION;
        pageController.redraw();
    };

    this.onUpButtonClick = function () {
        self.showId = LogicPageRating.SHOW_CUSTOM;
        self.ratingBegin -= self.ratingRows;
        pageController.redraw();
    };

    this.onDownButtonClick = function () {
        self.showId = LogicPageRating.SHOW_CUSTOM;
        self.ratingBegin += self.ratingRows;
        pageController.redraw();
    };

    this.getRatingList = function () {
        switch (self.showId) {
            case LogicPageRating.SHOW_TOP:
                self.ratingBegin = 1;
                break;
            case LogicPageRating.SHOW_MY_POSITION:
                self.ratingBegin = LogicUser.getRatingPosition() - Math.round(self.ratingRows / 2) + 1;
                break;
            case LogicPageRating.SHOW_CUSTOM:
                fitRatingPositions();
                if (self.ratingBegin == 1) {
                    self.showId = LogicPageRating.SHOW_TOP;
                }
                if (self.ratingBegin == LogicUser.getRatingPosition() - Math.round(self.ratingRows / 2) + 1) {
                    self.showId = LogicPageRating.SHOW_MY_POSITION;
                }
                break;
        }
        fitRatingPositions();
        return LogicRating.getByPositionList(LogicPageRating.ratingBegin, LogicPageRating.ratingFinish);
    };

    var fitRatingPositions = function () {
        if (self.ratingBegin < 1) {
            self.ratingBegin = 1;
        }
        if (self.ratingBegin + self.ratingRows >= LogicRating.getLastPosition()) {
            self.ratingBegin = LogicRating.getLastPosition() - self.ratingRows + 1;
        }
        self.ratingFinish = self.ratingBegin + self.ratingRows;
    };
};

/**
 * Констатный класс.
 * @type {LogicPageRating}
 */
LogicPageRating = new LogicPageRating();
if(window["LogicPageRating"] != undefined){window["LogicPageRating"].__path="../client/components/application/logic/LogicPageRating.js"};

/* ../client/components/application/logic/LogicPageXO.js */
/**
 * Логика страницы игрового поля.
 * @constructor
 */
LogicPageXO = function () {

    /**
     * Действия при нажатии кнопки "Меню".
     * - Мы должны выйти в основное окно и закрыть игру, если она есть, либо сообщить серверу, что мы больше не ждём игру.
     * Итак, если есть текущая игра в статусе запущена, закроем её и установим, что текущей игры у нас нет.
     * Если текущей игры нет, сообщим серверу, что не ждём игры.
     */
    this.onMenuButtonClick = function () {
        var game;
        SAPIUserState.isNoBusy();
        pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_CHAT, PageController.PAGE_ID_ONLINE_SCORE, PageController.PAGE_ID_MAIN]);
        game = LogicGame.getCurrentGame();
        if (game) {
            if (game.status == LogicXO.STATUS_WAIT || game.status == LogicXO.STATUS_RUN) {
                if (game.vsRobot) {
                    SAPIRobotGame.close(game.id);
                }
                if (game.isInvitation) {
                    SAPIGame.close(game.id);
                }
            }
            LogicGame.setCurrentGameId(0);
        } else {
            SAPIGame.cancelRandomGameRequests();
        }
    };

    /**
     * Действия при нажатии на знак в поле.
     * @param x {Number}
     * @param y {Number}
     */
    this.onFieldSignClick = function (x, y) {
        var game, user, winLine, checkWinLine;
        game = LogicGame.getCurrentGame();
        user = LogicUser.getCurrentUser();
        if (!game) {
            Logs.log("game not found", Logs.LEVEL_WARNING, arguments);
            return;
        }
        if (!LogicXO.userCanDoMove(game, user.id, x, y)) {
            Logs.log("current user can't go right now", Logs.LEVEL_DETAIL);
            return;
        }
        /* Сообщим серверу. */
        SAPIGame.doMove(game.id, x, y);
        /* Обновим у нас. */
        game = LogicXO.setSign(game, x, y);
        game = LogicXO.switchTurn(game);
        /* Проверим, есть ли победитель. */
        winLine = LogicXO.findWinLine(game);
        game = LogicXO.setOutcomeResults(game, winLine);
        LogicGame.update(game);
        if (game.vsRobot) {
            if (!(game.outcomeResults.someBodyWin || game.outcomeResults.noBodyWin)) {
                setTimeout(function () {
                    SAPIRobotGame.raiseAIMove(game.id)
                }, 350);
            }
        }
        if (game.outcomeResults.someBodyWin || game.outcomeResults.noBodyWin) {
            /* send win line coords */
            SAPIGame.checkWinner(game.id);
        }
        Sounds.play('/sounds/turn.mp3');
    };

    /**
     * Действия, при нажатии на кнопку "Ещё"
     */
    this.onAgainButtonClick = function () {
        SAPIRepeatGame.repeat(LogicGame.getCurrentGameId());
    };
};

/**
 * Константный класс.
 * @type {LogicPageXO}
 */
LogicPageXO = new LogicPageXO();
if(window["LogicPageXO"] != undefined){window["LogicPageXO"].__path="../client/components/application/logic/LogicPageXO.js"};

/* ../client/components/application/logic/LogicRating.js */
/**
 * Логика рейтинга.
 * @constructor
 */
LogicRating = function () {
    var self = this;

    var ratingByPosition = {};

    var lastPosition = null;

    this.onRatingUpdated = function () {
        for (var i in ratingByPosition) {
            ratingByPosition[i].needUpdate = true;
        }
        SAPIRating.sendMeLastPosition();
    };

    this.getByPositionList = function (beginPosition, finishPosition) {
        var outList = [];
        var needUpdateList = [];
        for (var position = beginPosition; position < finishPosition; position++) {
            if (ratingByPosition[position]) {
                outList.push(ratingByPosition[position]);
            }
        }
        var beginPosition2, finishPosition2;
        beginPosition2 = beginPosition - 8 * 3;
        finishPosition2 = finishPosition + 8 * 3;
        if (beginPosition2 <= 0) beginPosition2 = 1;
        if (finishPosition2 >= self.getLastPosition()) finishPosition2 = self.getLastPosition();
        for (var position = beginPosition2; position <= finishPosition2; position++) {
            if (!ratingByPosition[position] || ratingByPosition[position].needUpdate) {
                needUpdateList.push(position);
            }
        }
        if (needUpdateList.length) {
            SAPIRating.sendMeRatingForPositions(needUpdateList);
        }
        return outList;
    };

    this.updateRatingData = function (list) {
        for (var i in list) {
            ratingByPosition[list[i].position] = list[i];
            ratingByPosition[list[i].position].needUpdate = false;
            LogicUser.getById(list[i].userId);
        }
        pageController.redraw();
    };

    /**
     * Обновить последнитю позицитю рейтинга.
     * @param givenLastPosition
     */
    this.updateLastPosition = function (givenLastPosition) {
        lastPosition = givenLastPosition;
        pageController.redraw();
    };

    this.getLastPosition = function () {
        if (!lastPosition) {
            SAPIRating.sendMeLastPosition();
            return 1000;
        } else {
            return lastPosition;
        }
    };
};

/**
 * Константный класс.
 * @type {LogicRating}
 */
LogicRating = new LogicRating();
if(window["LogicRating"] != undefined){window["LogicRating"].__path="../client/components/application/logic/LogicRating.js"};

/* ../client/components/application/logic/LogicTimers.js */
LogicTimers = function () {
    var self = this;

    /**
     * Массив таймеров.
     * @type {Array}
     */
    var timers = {};

    /**
     * Запускает таймер, если таймер с таким айди есть, то таймер просто продливается до нового таймаута.
     * @param key {String} ключ таймера.
     * @param timeout {Number} время в миллисекундах, через которое сработает таймер.
     * @param callback {Function} калбэк функция, будет вызвана по истечению времени.
     * @param callbackArguments {Mixed} аргументы передаваемые калбэку.
     */
    this.start = function (key, timeout, callback, callbackArguments) {
        /* сохраним\обновим таймер */
        if (!timers[key]) {
            timers[key] = {
                key: key,
                callback: callback,
                arguments: callbackArguments,
                lastTimeoutId: setTimeout(function () {
                    executeTimer(key);
                }, timeout)
            };
        } else {
            /* остановим старый таймаут */
            clearTimeout(timers[key].lastTimeoutId);
            /* установим новый таймайт */
            timers[key].lastTimeoutId = setTimeout(function () {
                executeTimer(key);
            }, timeout);
        }
    };

    /**
     * Запустить таймер.
     * @param key {String} ключ таймера.
     */
    var executeTimer = function (key) {
        if (timers[key]) {
            Logs.log("LogicTimers execute timer with key:" + key);
            timers[key].callback.apply(null, timers[key].arguments);
            LogicTimers.clear(key);
        }
    };

    /**
     * Удалить таймер.
     * @param key {String} ключ таймера.
     */
    this.clear = function (key) {
        if (timers[key]) {
            clearTimeout(timers[key].lastTimeoutId);
            delete timers[key];
        }
    }
};

/**
 * Статичный класс.
 * @type {LogicTimers}
 */
LogicTimers = new LogicTimers();if(window["LogicTimers"] != undefined){window["LogicTimers"].__path="../client/components/application/logic/LogicTimers.js"};

/* ../client/components/application/logic/LogicUser.js */
LogicUser = function () {
    var self = this;
    /**
     * Id пользователя под которым мы сидим.
     */
    var authorizedUserId = null;

    /**
     * Тут мы будем хранить данные пользователей.
     * @type {Array}
     */
    var users = [];

    /** Кол-во онлайн пользователей */
    var onlineCount = null;

    /**
     * Авторизация пользователя.
     */
    this.authorize = function () {
        var socNetUserId, authParams;
        socNetUserId = SocNet.getSocNetUserId();
        authParams = SocNet.getAuthParams();
        SAPIUser.authorizeByVK(socNetUserId, authParams);
    };

    /**
     * Метод для обработки ответа от сервера об успешной авторизации.
     * @param userId
     */
    this.authorizeSuccess = function (userId) {
        var user;
        authorizedUserId = userId;
        Logs.log("Authorization success. userId:" + userId, Logs.LEVEL_NOTIFY);
        user = LogicUser.getById(userId);
        SAPIUser.sendMeOnlineCount();
        SAPIChat.sendMeLastMessages();
        SAPIUser.sendMeOnlineUserIds();
        SAPIRating.sendMeLastPosition();
    };

    /**
     * Авторизован ли текущий юзер.
     * @returns {Boolean}
     */
    this.isAuthorized = function () {
        return authorizedUserId ? true : false;
    };

    /**
     * Возвращает текущего(авторизованного пользователя).
     * @returns {null|Object}
     */
    this.getCurrentUser = function () {
        return this.getById(authorizedUserId);
    };

    /**
     * Получить данные пользователя по его id.
     * @param id
     * @returns {null|Object}
     */
    this.getById = function (id) {
        if (users[id]) {
            /* Догрузим данные, это немного костыль... но время деньги :) */
            if (!users[id].socNetUserId) {
                self.loadUserInfoById(id);
            }
            return users[id];
        } else {
            self.loadUserInfoById(id);
            /* некоторая заглушка */
            return getDummy();
        }
    };

    var getDummy = function () {
        return {
            id: null,
            firstName: '-',
            lastName: '-',
            isBusy: false,
            onGameId: 0,
            online: false
        };
    };

    /**
     * Запомним, чьи загрузки мы уже ждём, что бы не повторять лишних запросов.
     * @type {Array}
     */
    var waitForLoadingUser = [];

    /**
     * Загрузить данные о пользователе.
     * @param userId {int}
     */
    this.loadUserInfoById = function (userId) {
        if (authorizedUserId == null) {
            return;
        }
        if (!waitForLoadingUser[userId]) {
            waitForLoadingUser[userId] = true;
            SAPIUser.sendMeUserInfo(userId);
        }
    };

    /**
     * Обновить данные о пользователе.
     * Обновит\создаст, только переданные поля!
     * При создании, создаются дефолтовые поля: firstName: '', lastName: '', isBusy: false, onGameId: 0
     * @param user {Object}
     */
    this.updateUserInfo = function (user) {
        waitForLoadingUser[user.id] = false;
        if (!users[user.id]) {
            users[user.id] = getDummy();
        }
        for (var field in user) {
            users[user.id][field] = user[field];
        }
        pageController.redraw();
    };

    /** Возвращает количество онлайн игроков. */
    this.getOnlineCount = function () {
        return onlineCount;
    };

    /**
     * Обновим данные о кол-во онлайн пользователей.
     * @param count int кол-во онлайн пользователей.
     * @param userId int
     * @param direction boolean
     */
    this.updateOnlineCount = function (count, userId, direction) {
        if (count > onlineCount) {
            var currentUser = LogicUser.getCurrentUser();
            if (currentUser && currentUser.id && currentUser.id == 1) {
                Sounds.play('/sounds/ICQMessage.mp3');
            }
        }
        onlineCount = count;
        /* Сбрасываем пользователя если он вошел\вышел. */
        self.updateUserInfo({id: userId, online: direction, isBusy: false, onGame: 0});
        pageController.redraw();
    };

    /**
     * Возвращает массив внутрениих id юзееров, которые онлайн.
     */
    this.getOnlineUserIds = function () {
        var out;
        out = [];
        users.forEach(function (user) {
            if (user.online) {
                out.push(user.id);
            }
        });
        return out;
    };

    var ratingPositions = [];

    this.getRatingPosition = function (userId) {
        if (!userId) {
            userId = authorizedUserId;
        }
        if (ratingPositions[userId]) {
            if (ratingPositions[userId].needReload) {
                SAPIUser.sendMeRatingPosition(userId);
            }
            return ratingPositions[userId].position;
        } else {
            SAPIUser.sendMeRatingPosition(userId);
        }
    };

    this.updateRatingPosition = function (userId, position) {
        ratingPositions[userId] = {
            position: position,
            needReload: false
        };
        pageController.redraw();
    };

    this.setRatingPositionsNeedReload = function () {
        for (var userId in ratingPositions) {
            ratingPositions[userId].needReload = true;
        }
        pageController.redraw();
    };
};

/**
 * Статичный класс.
 * @type {LogicUser}
 */
LogicUser = new LogicUser();
if(window["LogicUser"] != undefined){window["LogicUser"].__path="../client/components/application/logic/LogicUser.js"};

/* components/application/logic/LogicXO.js */
/**
 * Логика непосредственно игры Х-О :)
 * @constructor
 */
LogicXO = function () {
    var self = this;

    /**
     * Тип поля 3 на 3.
     * @type {number}
     */
    this.FIELD_TYPE_3X3 = 1;

    /**
     * Тип поля 15 на 15.
     * @type {number}
     */
    this.FIELD_TYPE_15X15 = 2;

    /**
     * Линия победы: горизонтальная.
     * @type {number}
     */
    this.LINE_HORIZONTAL = 1;

    /**
     * Линия победы: вертикальная.
     * @type {number}
     */
    this.LINE_VERTICAL = 2;

    /**
     * Линия победы: слева и наверх.
     * @type {number}
     */
    this.LINE_LEFT_UP = 3;

    /**
     * Линия победы: слева и во вниз.
     * @type {number}
     */
    this.LINE_LEFT_DOWN = 4;

    /**
     * id всех линий.
     * @type {*[]}
     */
    this.lineIds = [self.LINE_HORIZONTAL, self.LINE_VERTICAL, self.LINE_LEFT_DOWN, self.LINE_LEFT_UP];

    /**
     * Id знака крестик.
     * @type {number}
     */
    this.SIGN_ID_X = 1;

    /**
     * Id знака нулик.
     * @type {number}
     */
    this.SIGN_ID_O = 2;

    /**
     * Id знака - нет знака.
     * @type {number}
     */
    this.SIGN_ID_Empty = 3;

    /**
     * Игра создана и ждёт подключение оппонента.
     * @type {number}
     */
    this.STATUS_WAIT = 1;

    /**
     * Игра запущена, идёт игра.
     * @type {number}
     */
    this.STATUS_RUN = 2;

    /**
     * Игра закрыта до результата. Видимо кто-то вышел из игры.
     * @type {number}
     */
    this.STATUS_CLOSED = 3;

    /**
     * Кто то выиграл.
     * @type {number}
     */
    this.STATUS_SOMEBODY_WIN = 4;

    /**
     * Никто не выиграл.
     * @type {number}
     */
    this.STATUS_NOBODY_WIN = 5;

    /**
     * Создать игру.
     * @param creatorUserId {object} внутрений id пользователя создающего игру.
     * @param creatorSignId {number} id запрашиваемого создателем игры знака, LogicXO.SIGN_ID_*
     * @param fieldTypeId {number} id типа поля, LogicXO.FIELD_TYPE_*
     * @param isRandom {boolean} true - если это случайная игра.
     * @param isInvitation {boolean} true - если игра по приглашению
     * @param vsRobot {boolean} true - если игра с роботом.
     * @returns {{creatorUserId: (fields.id|*|id|user.id|LogicUser.getUserById.id|string), joinerUserId: number, creatorSignId: *, joinerSignId: number, fieldTypeId: *, isRandom: *, isInvitation: *, vsRobot: *, XUserId: number, OUserId: number, turnId: number, status: number, winnerId: number}}
     */
    this.create = function (creatorUserId, creatorSignId, fieldTypeId, isRandom, isInvitation, vsRobot) {
        var field;
        field = self.createField(fieldTypeId);
        return {
            creatorUserId: creatorUserId,
            joinerUserId: 0,
            creatorSignId: creatorSignId,
            joinerSignId: vsRobot ? LogicXO.SIGN_ID_Empty : 0,
            fieldTypeId: fieldTypeId,
            isRandom: (isRandom) ? 1 : 0,
            isInvitation: (isInvitation) ? 1 : 0,
            vsRobot: (vsRobot) ? 1 : 0,
            XUserId: 0,
            OUserId: 0,
            turnId: LogicXO.SIGN_ID_X,
            status: LogicXO.STATUS_WAIT,
            winnerId: 0,
            field: field,
            copyFromId: 0,
            created: time(),
            finish: 0
        };
    };

    /**
     * Создадим поле.
     * @param fieldTypeId тип поля.
     */
    this.createField = function (fieldTypeId) {
        var fieldSize, field;
        fieldSize = self.getFieldSize(fieldTypeId);
        field = [];
        for (var y = 0; y < fieldSize; y++) {
            field[y] = [];
            for (var x = 0; x < fieldSize; x++) {
                field[y][x] = LogicXO.SIGN_ID_Empty;
            }
        }
        return field;
    };

    /**
     * Вернуть размер поля по типу поля.
     * @param fieldTypeId LogicXO.FIELD_TYPE_*
     * @returns {number}
     */
    this.getFieldSize = function (fieldTypeId) {
        switch (fieldTypeId) {
            case LogicXO.FIELD_TYPE_3X3:
                return 3;
                break;
            case LogicXO.FIELD_TYPE_15X15:
                return 15;
                break;
            default:
                Logs.log("Undefined field type id. (" + fieldTypeId + ")", Logs.LEVEL_ERROR);
                return 0;
                break;
        }
    };

    /**
     * Вернуть размер линии победы по типу поля.
     * @param fieldTypeId LogicXO.FIELD_TYPE_*
     * @returns {number}
     */
    this.getLineSize = function (fieldTypeId) {
        switch (fieldTypeId) {
            case LogicXO.FIELD_TYPE_3X3:
                return 3;
                break;
            case LogicXO.FIELD_TYPE_15X15:
                return 5;
                break;
        }
    };

    /**
     * Присоединить игрока к игре.
     * @param joinerUserId {Number} внутрений id игрока, присоединяемого к игре.
     * @param joinerSignId {Number} id знака запрашиваемого присоединяемым игроком, LogicXO.SIGN_ID_*.
     * @param game {Object} собсвтенно игра.
     * @returns {*}
     */
    this.joinGame = function (joinerUserId, joinerSignId, game) {
        game.joinerUserId = joinerUserId;
        game.joinerSignId = joinerSignId;
        return game;
    };

    /**
     * Выставить знаки согласно параметрам игры.
     * @param game {Object}
     * @returns {*}
     */
    this.chooseSigns = function (game) {
        /* Оба не имеют запрашиваемых знаков. */
        if (game.creatorSignId == LogicXO.SIGN_ID_Empty && game.joinerSignId == LogicXO.SIGN_ID_Empty) {
            if (Math.round(Math.random() * 2) > 1) {
                game.XUserId = game.creatorUserId;
                game.OUserId = game.joinerUserId;
            } else {
                game.XUserId = game.joinerUserId;
                game.OUserId = game.creatorUserId;
            }
        }
        /* Оба имеют запрашиваемых знаков. */
        if (game.creatorSignId != LogicXO.SIGN_ID_Empty && game.joinerSignId != LogicXO.SIGN_ID_Empty) {
            /* Тут немного хитро, мы пологаем что одинаковые знаки не придут к нам. */
            if (game.creatorSignId == LogicXO.SIGN_ID_X) {
                game.XUserId = game.creatorUserId;
                game.OUserId = game.joinerUserId;
            } else {
                game.XUserId = game.joinerUserId;
                game.OUserId = game.creatorUserId;
            }
        }
        /* Только создатель имеет знак */
        if (game.creatorSignId != LogicXO.SIGN_ID_Empty && game.joinerSignId == LogicXO.SIGN_ID_Empty) {
            if (game.creatorSignId == LogicXO.SIGN_ID_X) {
                game.XUserId = game.creatorUserId;
                game.OUserId = game.joinerUserId;
            } else {
                game.XUserId = game.joinerUserId;
                game.OUserId = game.creatorUserId;
            }
        }
        /* Только приглашенный имеет знак */
        if (game.creatorSignId == LogicXO.SIGN_ID_Empty && game.joinerSignId != LogicXO.SIGN_ID_Empty) {
            if (game.joinerSignId == LogicXO.SIGN_ID_X) {
                game.XUserId = game.joinerUserId;
                game.OUserId = game.creatorUserId;
            } else {
                game.XUserId = game.creatorUserId;
                game.OUserId = game.joinerUserId;
            }
        }
        if (!game.vsRobot && (!game.XUserId || !game.OUserId)) {
            Logs.log("Не удалось установить участников. Игра без робота.", Logs.LEVEL_FATAL_ERROR, game);
        }
        if (game.vsRobot && (!(game.XUserId > 0 && game.OUserId == 0) && !(game.XUserId == 0 && game.OUserId > 0))) {
            Logs.log("Не удалось установить участников. Игра с роботом.", Logs.LEVEL_FATAL_ERROR, game);
        }
        return game;
    };

    /**
     * Запустить игру.
     * @param game {Object}
     * @returns {*}
     */
    this.run = function (game) {
        game.status = LogicXO.STATUS_RUN;
        return game;
    };

    /**
     * Возвращает true если ход переданного игрока.
     * @param game {Object}
     * @param userId {Object}
     */
    this.isHisTurn = function (game, userId) {
        if (!game) return false;
        if (!game.status) return false;
        if (game.status != LogicXO.STATUS_RUN) return false;
        if (userId == game.XUserId && game.turnId == LogicXO.SIGN_ID_X) return true;
        if (userId == game.OUserId && game.turnId == LogicXO.SIGN_ID_O) return true;
        return false;
    };

    /**
     * Является ли игрок участником игры.
     * @param game {Object} объект игры.
     * @param userId {Number} id игрока.
     */
    this.isMember = function (game, userId) {
        if (game.creatorUserId == userId) return true;
        if (game.joinerUserId == userId) return true;
        return false;
    };

    /**
     * Может ли пользователь закрыть игру.
     * Игру можно закрыть, только если пользователь является участником игры и игра находиться в стаусе WAIT или RUN.
     * @param game {Object} объект игры.
     * @param userId {Number} id юзера.
     */
    this.userCanCloseGame = function (game, userId) {
        if (
            self.isMember(game, userId) &&
            (game.status == LogicXO.STATUS_WAIT || game.status == LogicXO.STATUS_RUN)) {
            return true;
        }
        return false;
    };

    /**
     * Закроем игру.
     * @param game {Object} объект игры.
     */
    this.close = function (game) {
        game.status = LogicXO.STATUS_CLOSED;
        game.finish = time();
        return game;
    };

    /**
     * Может ли пользователь сделать ход.
     * @param game {Object}
     * @param userId {Number}
     * @param x {Number}
     * @param y {Number}
     */
    this.userCanDoMove = function (game, userId, x, y) {
        var fieldSize;
        if (!LogicXO.isMember(game, userId)) return false;
        if (!LogicXO.isHisTurn(game, userId)) return false;
        if (game.status != LogicXO.STATUS_RUN) return false;
        fieldSize = LogicXO.getFieldSize(game.fieldTypeId);
        if (x < 0) return false;
        if (x >= fieldSize) return false;
        if (y < 0) return false;
        if (y >= fieldSize) return false;
        if (game.field[y][x] != LogicXO.SIGN_ID_Empty) return false;
        return true;
    };

    /**
     * Установим текущий знак.
     * @param game {Object}
     * @param x {Number}
     * @param y {Number}
     * @returns {*}
     */
    this.setSign = function (game, x, y) {
        game.field[y][x] = game.turnId;
        game.lastMove = {x: x, y: y};
        return game;
    };

    /**
     * Перевернем текущий знак.
     * @param game {Object}
     * @returns {*}
     */
    this.switchTurn = function (game) {
        switch (game.turnId) {
            case LogicXO.SIGN_ID_X:
                game.turnId = LogicXO.SIGN_ID_O;
                break;
            case LogicXO.SIGN_ID_O:
                game.turnId = LogicXO.SIGN_ID_X;
                break;
            default:
                Logs.log("Can't switch turn, because unexpected game.turnId value have.", Logs.LEVEL_WARNING, game);
                break;
        }
        return game;
    };

    /**
     * Найти линию победы, если она конечно есть.
     * @param game {Object} minimum required: fieldTypeId, field
     */
    this.findWinLine = function (game) {
        var prid = Profiler.start(Profiler.LOGIC_XO_FIND_WIN_LINE);
        var fieldSize, lineSize, lineIds, loseLinesCount, winnerLineId, lastResult, res;
        fieldSize = LogicXO.getFieldSize(game.fieldTypeId);
        lineSize = LogicXO.getLineSize(game.fieldTypeId);

        lineIds = [LogicXO.LINE_HORIZONTAL, LogicXO.LINE_VERTICAL, LogicXO.LINE_LEFT_DOWN, LogicXO.LINE_LEFT_UP];
        loseLinesCount = 0;
        winnerLineId = 0;
        lastResult = false;

        for (var y = 0; y < fieldSize; y++) {
            for (var x = 0; x < fieldSize; x++) {
                for (var lineId in lineIds) {
                    res = false;
                    res = __findWinLine(game.field, x, y, lineSize, lineIds[lineId]);
                    if (res) {
                        if (res.isLosed) loseLinesCount++;
                        if (res.signId) {
                            lastResult = res;
                        }
                    }
                }
            }
        }
        /* Нет выигрывших, нет проигравших */
        var result = {
            noBodyWin: false,
            someBodyWin: false,
            signId: 0,
            lineId: 0,
            x: 0,
            y: 0
        };
        /* Если найден хотя бы один результат */
        if (lastResult) {
            result = {
                noBodyWin: false,
                someBodyWin: true,
                signId: lastResult.signId,
                lineId: lastResult.lineId,
                x: lastResult.x,
                y: lastResult.y
            };
        }
        /* Может быть ничья */
        if (game.fieldTypeId == LogicXO.FIELD_TYPE_3X3 && loseLinesCount == lineSize * 2 + 2) {
            result.noBodyWin = true;
        }
        Profiler.stop(Profiler.LOGIC_XO_FIND_WIN_LINE, prid);
        return result;
    };

    /**
     * Найти линию-победы в заданных координатах и с задонным типом.
     * @param field {Array} поле, вида field[y][x] = LogicXO.SIGN_ID_*.
     * @param startX {Number} начальная X координаты линии-победы.
     * @param startY {Number} начальная Y координаты линии-победы.
     * @param lineSize {Number} длина линии-победы.
     * @param lineId {Number} id линии-победы, LogicXO.WIN_LINE_*.
     * @private
     */
    var __findWinLine = function (field, startX, startY, lineSize, lineId) {
        var x, y, Xcnt, Ocnt, isLosed, points, lastPoint, signId, vector;
        x = startX;
        y = startY;
        Xcnt = Ocnt = 0;
        isLosed = false;
        points = [];
        signId = 0;
        vector = LogicXO.getLineVector(lineId);
        if (!vector)return;
        switch (lineId) {
            case LogicXO.LINE_HORIZONTAL:
                if (field[startY][startX + (lineSize - 1)] == undefined) return false;
                break;
            case LogicXO.LINE_VERTICAL:
                if (field[startY + (lineSize - 1)] == undefined) return false;
                break;
            case LogicXO.LINE_LEFT_UP:
                if (field[startY - (lineSize - 1)] == undefined) return false;
                if (field[startY][startX + (lineSize - 1)] == undefined) return false;
                break;
            case LogicXO.LINE_LEFT_DOWN:
                if (field[startY + (lineSize - 1)] == undefined) return false;
                if (field[startY][startX + (lineSize - 1)] == undefined) return false;
                break;
            default:
                Logs.log("LogicXO.__findWinLine. Undefined lineId.", Logs.LEVEL_WARNING, lineId);
                return false;
                break;
        }
        for (var offset = 0; offset < lineSize; offset++) {
            if (field[y] [x] == LogicXO.SIGN_ID_X) Xcnt++;
            if (field[y] [x] == LogicXO.SIGN_ID_O) Ocnt++;
            points.push({x: x, y: y});
            x += vector.x;
            y += vector.y;
        }
        if (Xcnt == lineSize) {
            signId = LogicXO.SIGN_ID_X;
        }
        if (Ocnt == lineSize) {
            signId = LogicXO.SIGN_ID_O;
        }
        if (Ocnt != 0 && Xcnt != 0) isLosed = true;
        if (lineId == LogicXO.LINE_LEFT_UP) startY -= ( lineSize - 1 );
        return {
            lineId: lineId,
            isLosed: isLosed,
            signId: signId,
            x: startX,
            y: startY
        };
    };

    /**
     * Возвращает вектор с длиной 1, для линии.
     * @param lineId id линии. DataGame.LINE_*
     * @param direction направление true - A, false - B.
     */
    this.getLineVector = function (lineId, direction) {
        var vector;
        switch (lineId) {
            case LogicXO.LINE_HORIZONTAL:
                vector = {x: 1, y: 0};
                break;
            case LogicXO.LINE_VERTICAL:
                vector = {x: 0, y: 1};
                break;
            case LogicXO.LINE_LEFT_UP:
                vector = {x: 1, y: -1};
                break;
            case LogicXO.LINE_LEFT_DOWN:
                vector = {x: 1, y: 1};
                break;
            default:
                Logs.log("LogicXO.getLineVector. undefined lineId:" + lineId, Logs.LEVEL_ERROR);
                return false;
                break;
        }
        if (direction) {
            vector.x *= -1;
            vector.y *= -1;
        }
        return vector;
    };

    /**
     * Тут мы установим линию-победы.
     * И соответствующий статус.
     * Либо установим ниьчю, для этой игры.
     * @param game {Object}
     * @param winLine {Object}
     */
    this.setOutcomeResults = function (game, winLine) {
        game.outcomeResults = winLine;
        if (winLine.noBodyWin) {
            game.status = LogicXO.STATUS_NOBODY_WIN;
            game.finish = time();
        }
        if (winLine.someBodyWin) {
            game.status = LogicXO.STATUS_SOMEBODY_WIN;
            game.finish = time();
            if (winLine.signId == LogicXO.SIGN_ID_X) {
                game.winnerId = game.XUserId;
            }
            if (winLine.signId == LogicXO.SIGN_ID_O) {
                game.winnerId = game.OUserId;
            }
        }
        return game;
    };

    /**
     * Проверяет находятся ли координаты вне поля.
     * @param fieldSize {Number}
     * @param x {Number}
     * @param y {Number}
     * @returns {boolean}
     */
    this.notInField = function (x, y, fieldSize) {
        if (x < 0) return true;
        if (x >= fieldSize) return true;
        if (y < 0) return true;
        if (y >= fieldSize) return true;
        return false;
    };

    /**
     * Вернёт противоположный знак.
     * @param signId {Number} LogicXO.SIGN_ID_*
     */
    this.getOppositeSignId = function (signId) {
        switch (signId) {
            case LogicXO.SIGN_ID_X:
                return LogicXO.SIGN_ID_O;
                break;
            case LogicXO.SIGN_ID_O:
                return LogicXO.SIGN_ID_X;
                break;
            default:
                Logs.log("LogicXO.getOppositeSignId. Undefined Sign Id." + signId, Logs.LEVEL_ERROR);
                break;
        }
    };
    /**
     * Возвращает id оппонента.
     * @param game {Object}
     * @param userId {int} внутрений id пользователя.
     */
    this.getOpponentUserId = function (game, userId) {
        if (game.XUserId == userId) {
            return game.OUserId;
        }
        if (game.OUserId == userId) {
            return game.XUserId;
        }
        return false;
    };

    /**
     * Копирует игру, соответствено id-шник будет сброшен.
     * @param oldGame {Object}
     * @param callback {Function}
     */
    this.copy = function (oldGame, callback) {
        var newGame;
        newGame = self.create(oldGame.creatorUserId, oldGame.creatorSignId, oldGame.fieldTypeId, oldGame.isRandom, oldGame.isInvitation, oldGame.vsRobot);
        newGame = self.joinGame(oldGame.joinerUserId, oldGame.joinerSignId, newGame);
        newGame = self.chooseSigns(newGame);
        newGame = self.run(newGame);
        newGame.copyFromId = oldGame.id;
        return newGame;
    };
};

/**
 * Статичный класс.
 * @type {LogicXO}
 */
LogicXO = new LogicXO();if(window["LogicXO"] != undefined){window["LogicXO"].__path="components/application/logic/LogicXO.js"};

/* ../client/components/application/logic/LogicXOSettings.js */
/**
 * Логика всяких настроек игры.
 * @constructor
 */
LogicXOSettings = function () {

    /**
     * Запрашиваемый тип поля.
     * @type {Number} LogicXO.FIELD_TYPE_*
     */
    this.requestedFieldTypeId = null;

    /**
     * Запрашиваемый знак.
     * @type {Number} LogicXO.SIGN_ID_*
     */
    this.requestedSignId = null;
};
/**
 * Статичный класс.
 * @type {LogicXOSettings}
 */
LogicXOSettings = new LogicXOSettings();if(window["LogicXOSettings"] != undefined){window["LogicXOSettings"].__path="../client/components/application/logic/LogicXOSettings.js"};

/* ../client/components/application/pages/PageBackground.js */
/**
 * Страница бэкграудна.
 * @constructor
 */
PageBackground = function PageBackground() {
    var self = this;

    /**
     * Показывать ли страницу.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Массив всех элементов страницы.
     * @type {Array}
     */
    this.elements = [];

    var elementSound;

    var elementHelpIcon;

    var onHelpPage = false;

    this.init = function () {
        var element;
        /* Задний фон */
        element = GUI.createElement('ElementImage', {
            x: 0,
            y: 0,
            src: '/images/table.png'
        });
        self.elements.push(element);
        element = GUI.createElement("ElementFlag", {
            x: 660,
            y: 60,
            srcRest: '/images/buttons/soundOff.png',
            srcHover: '/images/buttons/soundOff.png',
            srcActive: '/images/buttons/soundHover.png',
            defaultState: true,
            onChange: function (newValue) {
                if (newValue) {
                    Sounds.on();
                } else {
                    Sounds.off();
                }
                pageController.redraw();
            }
        });
        elementSound = element;
        self.elements.push(element);
        /* Кнопка `(?)` */
        element = GUI.createElement('ElementButton', {
                x: 693,
                y: 54,
                srcRest: '/images/help/buttons/helpRest.png',
                srcHover: '/images/help/buttons/helpHover.png',
                srcActive: '/images/help/buttons/helpActive.png',
                onClick: function () {
                    if (onHelpPage) {
                        elementHelpIcon.srcRest = '/images/help/buttons/helpRest.png';
                        elementHelpIcon.srcHover = '/images/help/buttons/helpHover.png';
                        elementHelpIcon.srcActive = '/images/help/buttons/helpActive.png';
                        LogicPageHelp.onButtonCloseClick();
                        onHelpPage = false;
                    } else {
                        elementHelpIcon.srcRest = '/images/help/buttons/closeRest.png';
                        elementHelpIcon.srcHover = '/images/help/buttons/closeHover.png';
                        elementHelpIcon.srcActive = '/images/help/buttons/closeActive.png';
                        LogicPageHelp.onButtonHelpClick();
                        onHelpPage = true;
                    }
                }
            }
        );
        elementHelpIcon = element;
        self.elements.push(element);
    };

    /**
     * Покажем все элементы на странице.
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
     * Спрачем все элементы на странице.
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
        if (Sounds.enabled) {
            elementSound.opacity = 1.0;
        } else {
            elementSound.opacity = 0.3;
        }
    };

    /**
     * Обновляем онлайн индикатор и индикатор очков.
     */
    this.redraw = function () {
        if (!showed) return;
        self.preset();
        for (var i in self.elements) {
            self.elements[i].redraw();
        }
    };
};
if(window["PageBackground"] != undefined){window["PageBackground"].__path="../client/components/application/pages/PageBackground.js"};

/* ../client/components/application/pages/PageChat.js */
/**
 * Страница чата.
 * @constructor
 */
PageChat = function PageChat() {
    var self = this;

    /**
     * Показывать ли страницу.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Массив всех элементов страницы.
     * @type {Array}
     */
    this.elements = [];

    /**
     * Окно чата.
     * @type {ElementChatWindow}
     */
    this.elementChatWindow = null;

    /**
     * Элемент ввода сообщения чата.
     * @type {ElementChatInput}
     */
    this.elementChatInput = null;


    this.init = function () {
        var element;
        /* Окно чата. */
        element = GUI.createElement('ElementChatWindow', {
            x: 90,
            y: 500,
            width: 570,
            height: 92
        });
        self.elements.push(element);
        self.elementChatWindow = element;

        /* Форма ввода сообщения в чате.*/
        element = GUI.createElement('ElementChatInput', {
            x: 90,
            y: 607,
            width: 584,
            height: 20,
            onSendByEnter: LogicPageBackground.onChatInputEnterMessage
        });
        self.elements.push(element);
        self.elementChatInput = element;

        /* Лейбл чата. */
        element = GUI.createElement("ElementImage", {
            x: 58,
            y: 507,
            opacity: 0.28,
            src: '/images/chat/chatLabel.png'
        });
        self.elements.push(element);
        /* Промпт окно ввода сообщеий чата. */
        element = GUI.createElement("ElementImage", {
            x: 61,
            y: 601,
            opacity: 0.28,
            src: '/images/chat/chatPrompt.png'
        });
        self.elements.push(element);
    };

    /**
     * Покажем все элементы на странице.
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
     * Спрачем все элементы на странице.
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
        var messages;
        /* Кол-во сообщений для отображения */
        messages = LogicChatCache.getLastMessages(5);
        self.elementChatWindow.updateMessages(messages);
    };

    /**
     * Обновляем элементы и перерисовываем их.
     */
    this.redraw = function () {
        if (!showed) return;
        self.preset();
        for (var i in self.elements) {
            self.elements[i].redraw();
        }
    };
};
if(window["PageChat"] != undefined){window["PageChat"].__path="../client/components/application/pages/PageChat.js"};

/* ../client/components/application/pages/PageHelp.js */
/**
 * Страница помощи.
 * @constructor
 */
PageHelp = function PageHelp() {
    var self = this;

    /**
     * Показывать ли страницу.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Массив всех элементов страницы.
     * @type {Array}
     */
    this.elements = [];

    /**
     *
     * @type {ElementRadio}
     */
    var elementRadio = null;

    this.init = function () {
        var element;
        /* Чекбоксы выбора под-страницы хелпа. */
        element = GUI.createElement('ElementRadio', {
            options: [
                {
                    x: 95,
                    y: 83,
                    srcRest: '/images/help/checkboxArrowRest.png',
                    srcHover: '/images/help/checkboxArrowHover.png',
                    srcActive: '/images/help/checkboxArrowActive.png',
                    value: LogicPageHelp.TAB_ID_RULES,
                    title: ''
                },
                {
                    x: 95,
                    y: 108,
                    srcRest: '/images/help/checkboxArrowRest.png',
                    srcHover: '/images/help/checkboxArrowHover.png',
                    srcActive: '/images/help/checkboxArrowActive.png',
                    value: LogicPageHelp.TAB_ID_MAIN_MENU,
                    title: ''

                },
                {
                    x: 95,
                    y: 133,
                    srcRest: '/images/help/checkboxArrowRest.png',
                    srcHover: '/images/help/checkboxArrowHover.png',
                    srcActive: '/images/help/checkboxArrowActive.png',
                    value: LogicPageHelp.TAB_ID_RATING,
                    title: ''

                }
            ],
            currentIndex: LogicPageHelp.TAB_ID_MAIN_MENU,
            onChange: LogicPageHelp.onTabChanged
        });
        elementRadio = element;
        self.elements.push(element);
        element = GUI.createElement('ElementText', {
            x: 120,
            y: 85,
            width: 100,
            height: 25,
            text: 'Правила игры.',
            pointer: GUI.POINTER_HAND,
            onClick: function () {
                /* Это индекс(порядковый номер) опции при создании ElementRadio. */
                elementRadio.selectIndex(0);
            }
        });
        self.elements.push(element);
        element = GUI.createElement('ElementText', {
            x: 120,
            y: 110,
            width: 200,
            height: 20,
            text: 'Основное меню.',
            pointer: GUI.POINTER_HAND,
            onClick: function () {
                /* Это индекс(порядковый номер) опции при создании ElementRadio. */
                elementRadio.selectIndex(1);
            }
        });
        self.elements.push(element);
        element = GUI.createElement('ElementText', {
            x: 120,
            y: 135,
            width: 100,
            height: 20,
            text: 'Рейтинг',
            pointer: GUI.POINTER_HAND,
            onClick: function () {
                /* Это индекс(порядковый номер) опции при создании ElementRadio. */
                elementRadio.selectIndex(2);
            }
        });
        self.elements.push(element);
    };

    /**
     * Покажем все элементы на странице.
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
     * Спрачем все элементы на странице.
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
        /* Возможны какие то обновления, до отрисовки. */
    };

    /**
     * Обновляем элементы и перерисовываем их.
     */
    this.redraw = function () {
        if (!showed) return;
        self.preset();
        for (var i in self.elements) {
            self.elements[i].redraw();
        }
    };
};
if(window["PageHelp"] != undefined){window["PageHelp"].__path="../client/components/application/pages/PageHelp.js"};

/* ../client/components/application/pages/PageHelpMainMenu.js */
/**
 * Страница шаблон.
 * @constructor
 */
PageHelpMainMenu = function PageHelpMainMenu() {
    var self = this;

    /**
     * Показывать ли страницу.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Массив всех элементов страницы.
     * @type {Array}
     */
    this.elements = [];

    this.init = function () {
        var element, line, list;
        var rowHeight = 115;
        var offsetY = 85;
        line = 0;
        list = [];
        list.push({name: 'ElementImage', x: 90, y: 74 + rowHeight * line + offsetY, src: '/images/radio/signRandomRest.png'});
        list.push({name: 'ElementImage', x: 185, y: 63 + rowHeight * line + offsetY, src: '/images/radio/signXRest.png'});
        list.push({name: 'ElementImage', x: 270, y: 62 + rowHeight * line + offsetY, src: '/images/radio/signORest.png'});
        list.push({name: 'ElementText', x: 390, y: 93 + rowHeight * line + offsetY, text: '&larr; выбор знака: любой, \r\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;крестик или нолик.'});

        line = 1;
        list.push({name: 'ElementImage', x: 80, y: 60 + rowHeight * line + offsetY, src: '/images/radio/field3x3Rest.png'});
        list.push({name: 'ElementImage', x: 180, y: 75 + rowHeight * line + offsetY, src: '/images/radio/field15x15Rest.png'});
        list.push({name: 'ElementText', x: 390, y: 90 + rowHeight * line + offsetY, text: '&larr; выбор поля: 3х3 или 15х15.'});

        line = 2;
        list.push({name: 'ElementPhoto', x: 110, y: 60 + rowHeight * line + offsetY, width: 51, height: 50, src: '/images/help/photoSomePeople1.png', pointer: GUI.POINTER_ARROW});
        list.push({name: 'ElementPhoto', x: 190, y: 60 + rowHeight * line + offsetY, width: 51, height: 51, src: '/images/help/photoSomePeople2.png', pointer: GUI.POINTER_ARROW});
        list.push({name: 'ElementPhoto', x: 268, y: 60 + rowHeight * line + offsetY, width: 51, height: 51, src: '/images/help/photoSomePeople3.png', pointer: GUI.POINTER_ARROW});
        list.push({name: 'ElementText', x: 360, y: 83 + rowHeight * line + offsetY, text: '&larr; отправить приглашение сыграть.'});

        line = 3;
        list.push({name: 'ElementImage', x: 110, y: 55 + rowHeight * line + offsetY, src: '/images/chat/chatLabel.png', opacity: 0.75});
        list.push({name: 'ElementText', x: 155, y: 68 + rowHeight * line + offsetY, width: 200, height: 20, text: '&larr; окно чата.'});
        list.push({name: 'ElementImage', x: 110, y: 120 + rowHeight * line + offsetY, src: '/images/chat/chatPrompt.png', opacity: 0.75});
        list.push({name: 'ElementText', x: 155, y: 118 + rowHeight * line + offsetY, text: '&larr; поле для оптравки сообщений в чат.'});

        for (var i in list) {
            element = GUI.createElement(list[i].name, list[i]);
            self.elements.push(element);
        }
    };

    /**
     * Покажем все элементы на странице.
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
     * Спрачем все элементы на странице.
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
        /* Возможны какие то обновления, до отрисовки. */
    };

    /**
     * Обновляем элементы и перерисовываем их.
     */
    this.redraw = function () {
        if (!showed) return;
        self.preset();
        for (var i in self.elements) {
            self.elements[i].redraw();
        }
    };
};
if(window["PageHelpMainMenu"] != undefined){window["PageHelpMainMenu"].__path="../client/components/application/pages/PageHelpMainMenu.js"};

/* ../client/components/application/pages/PageHelpRating.js */
/**
 * Страница шаблон.
 * @constructor
 */
PageHelpRating = function PageHelpRating() {
    var self = this;

    /**
     * Показывать ли страницу.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Массив всех элементов страницы.
     * @type {Array}
     */
    this.elements = [];

    this.init = function () {
        var element, line, list;
        var rowHeight = 70;
        var offsetY = 150;

        var text1;
        text1 = '';
        text1 += 'В рейтинговой позиции учитываются только очки, за победу\r\n';
        text1 += 'на поле 15 на 15 в игре с человеком, не с роботом.\r\n';
        text1 += 'При одинаковом количестве очков, выше в рейтинге будет тот,\r\n';
        text1 += 'кому были начислены очки раньше.';

        line = 0;
        list = [];
        list.push({name: 'ElementText', x: 100, y: 40 + rowHeight * line + offsetY, text: text1});
        /*
         @todo
         line = 2;
         list.push({name:'ElementImage', x: 100 + 100, y : 35 + rowHeight * line + offsetY, src: '/images/buttons/rating{ByFriends}.png'});
         list.push({name:'ElementText', x: 250 + 100, y : 52 + rowHeight * line + offsetY, text: '&larr; рейтинг среди друзей.'});
         */

        /*
         @todo
         line = 3;
         list.push({name:'ElementImage', x: 100 + 100, y : 35 + rowHeight * line + offsetY, src: '/images/buttons/rating{ByMyPosition}.png'});
         list.push({name:'ElementText', x: 250 + 100, y : 52 + rowHeight * line + offsetY, text: '&larr;позиция в общем рейтинге.'});
         */

        line = 2;
        list.push({name: 'ElementImage', x: 100 + 100, y: 35 + rowHeight * line + offsetY, src: '/images/buttons/ratingRest.png'});
        list.push({name: 'ElementText', x: 250 + 100, y: 52 + rowHeight * line + offsetY, text: '&larr;позиции лучших игроков.'});

        for (var i in list) {
            element = GUI.createElement(list[i].name, list[i]);
            self.elements.push(element);
        }
    };

    /**
     * Покажем все элементы на странице.
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
     * Спрачем все элементы на странице.
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
        /* Возможны какие то обновления, до отрисовки. */
    };

    /**
     * Обновляем элементы и перерисовываем их.
     */
    this.redraw = function () {
        if (!showed) return;
        self.preset();
        for (var i in self.elements) {
            self.elements[i].redraw();
        }
    };
};
if(window["PageHelpRating"] != undefined){window["PageHelpRating"].__path="../client/components/application/pages/PageHelpRating.js"};

/* ../client/components/application/pages/PageHelpRules.js */
/**
 * Страница шаблон.
 * @constructor
 */
PageHelpRules = function PageHelpRules() {
    var self = this;

    /**
     * Показывать ли страницу.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Массив всех элементов страницы.
     * @type {Array}
     */
    this.elements = [];

    this.init = function () {
        var element, line, list;
        var rowHeight = 137;
        var offsetY = 170;

        var text1;
        text1 = '';
        text1 += 'Игроки по очереди ставят на свободные клетки знаки.\r\n';
        text1 += 'Первый ход делает игрок, играющий крестиком.\r\n';
        text1 += 'Победителем считается тот, кто первым выстроит свои знаки\r\n в ряд: ';
        text1 += 'по горизонтали, вертикали или диагонали.';

        list = [];
        line = 0;
        list.push({name: 'ElementText', x: 100, y: 15 + rowHeight * line + offsetY, text: text1});
        line = 1;
        list.push({name: 'ElementText', x: 100, y: 0 + rowHeight * line + offsetY, text: 'Для поля 3х3 нужно выстроить 3 знака в ряд, например:'});
        list.push({name: 'ElementImage', x: 110, y: 40 + rowHeight * line + offsetY, src: '/images/help/screen3x3Vertical.png'});
        list.push({name: 'ElementImage', x: 220, y: 40 + rowHeight * line + offsetY, src: '/images/help/screen3x3Horizontal.png'});
        list.push({name: 'ElementImage', x: 330, y: 40 + rowHeight * line + offsetY, src: '/images/help/screen3x3Diagonal.png'});

        line = 2;
        list.push({name: 'ElementText', x: 100, y: 0 + rowHeight * line + offsetY, text: 'Для поля 15х15 нужно выстроить 5 знаков в ряд, например:'});
        list.push({name: 'ElementImage', x: 110, y: 40 + 3 + rowHeight * line + offsetY, src: '/images/help/screen15x15Vertical.png'});
        list.push({name: 'ElementImage', x: 220, y: 40 + 3 + rowHeight * line + offsetY, src: '/images/help/screen15x15Horizontal.png'});
        list.push({name: 'ElementImage', x: 330, y: 40 + 3 + rowHeight * line + offsetY, src: '/images/help/screen15x15Diagonal.png'});

        for (var i in list) {
            element = GUI.createElement(list[i].name, list[i]);
            self.elements.push(element);
        }
    };

    /**
     * Покажем все элементы на странице.
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
     * Спрачем все элементы на странице.
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
        /* Возможны какие то обновления, до отрисовки. */
    };

    /**
     * Обновляем элементы и перерисовываем их.
     */
    this.redraw = function () {
        if (!showed) return;
        self.preset();
        for (var i in self.elements) {
            self.elements[i].redraw();
        }
    };
};
if(window["PageHelpRules"] != undefined){window["PageHelpRules"].__path="../client/components/application/pages/PageHelpRules.js"};

/* ../client/components/application/pages/PageMain.js */
/**
 * Основная страница игры.
 * @constructor
 */
PageMain = function PageMain() {
    var self = this;

    /**
     * Показывать ли страницу.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Массив всех элементов страницы.
     * @type {Array}
     */
    this.elements = [];

    /**
     * Элемент списка друзей.
     * @type {ElementFriendsType}
     */
    this.elementFriendsType = null;

    /**
     * Создадим тут все элементы страницы.
     */
    this.init = function () {
        var element;
        /* Кнопка играть. */
        element = GUI.createElement('ElementButton', {
            x: 259,
            y: 225,
            title: 'Играть с роботом',
            srcRest: '/images/buttons/playRest.png',
            srcHover: '/images/buttons/playHover.png',
            srcActive: '/images/buttons/playActive.png',
            onClick: LogicPageMain.onPlayButtonClick
        });
        self.elements.push(element);
        /* Выбор типа поля игры */
        element = GUI.createElement("ElementRadio", {
            options: [
                {
                    srcRest: '/images/radio/field15x15Rest.png',
                    srcHover: '/images/radio/field15x15Hover.png',
                    srcActive: '/images/radio/field15x15Active.png',
                    x: 550,
                    y: 100,
                    width: 156,
                    height: 85,
                    title: 'поле 15 на 15, \r\nпобеждает линия \r\nиз 5-ти знаков.',
                    value: LogicXO.FIELD_TYPE_15X15
                },
                {
                    srcRest: '/images/radio/field3x3Rest.png',
                    srcHover: '/images/radio/field3x3Hover.png',
                    srcActive: '/images/radio/field3x3Active.png',
                    x: 558,
                    y: 159,
                    width: 123,
                    height: 86,
                    title: 'поле 3 на 3, \r\nпобеждает линия \r\nиз 3-ёх знаков.',
                    value: LogicXO.FIELD_TYPE_3X3
                }
            ],
            currentIndex: 0,
            onChange: LogicPageMain.onRadioFieldTypeChange
        });
        self.elements.push(element);
        /* Выбор знака игры */
        element = GUI.createElement("ElementRadio", {
            options: [
                {
                    srcRest: '/images/radio/signRandomRest.png',
                    srcHover: '/images/radio/signRandomHover.png',
                    srcActive: '/images/radio/signRandomActive.png',
                    x: 97,
                    y: 90,
                    width: 148,
                    height: 70,
                    title: 'Играть любым знаком.',
                    value: LogicXO.SIGN_ID_Empty
                },
                {
                    srcRest: '/images/radio/signXRest.png',
                    srcHover: '/images/radio/signXHover.png',
                    srcActive: '/images/radio/signXActive.png',
                    x: 212,
                    y: 80,
                    width: 146,
                    height: 102,
                    title: 'Играть крестиком.',
                    value: LogicXO.SIGN_ID_X
                },
                {
                    srcRest: '/images/radio/signORest.png',
                    srcHover: '/images/radio/signOHover.png',
                    srcActive: '/images/radio/signOActive.png',
                    x: 307,
                    y: 78,
                    width: 146,
                    height: 102,
                    title: 'Играть ноликом.',
                    value: LogicXO.SIGN_ID_O
                }
            ],
            currentIndex: 0,
            onChange: LogicPageMain.onRadioSignChange
        });
        self.elements.push(element);
        /* Лента друзей */
        element = GUI.createElement('ElementFriendsType', {
            x: 138,
            y: 357,
            spacing: 79,
            columns: 5,
            friends: [],
            onClickDummy: LogicPageMain.onAddFriendButtonClick
        });
        self.elements.push(element);
        self.elementFriendsType = element;
        /* Кнопка рейтинг. */
        element = GUI.createElement('ElementButton', {
            x: 560,
            y: 360,
            width: 140,
            height: 48,
            srcRest: '/images/buttons/ratingRest.png',
            srcHover: '/images/buttons/ratingHover.png',
            srcActive: '/images/buttons/ratingActive.png',
            onClick: LogicPageMain.onRatingButtonClick
        });
        self.elements.push(element);
        /* Кнопка, добавить друга. */
        element = GUI.createElement('ElementButton', {
            x: 70,
            y: 355,
            width: 75,
            height: 80,
            title: 'Пригласить друзей.',
            srcRest: '/images/buttons/addFriendRest.png',
            srcHover: '/images/buttons/addFriendHover.png',
            srcActive: '/images/buttons/addFriendActive.png',
            onClick: LogicPageMain.onAddFriendButtonClick
        });
        self.elements.push(element);
    };

    /**
     * Покажем все элементы на странице.
     */
    this.show = function () {
        if (showed == true) return;
        showed = true;
        for (var i in self.elements) {
            self.elements[i].show();
        }
        self.redraw();
    };

    /**
     * Спрачем все элементы на странице.
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
        var usersList, ids, friendIds, onlineIds, user, currentUser, showButtonInvite, showButtonLetsPlay, showIndicatorWaiting, enableButtonInvite, showBusyText, showOfflineText;
        usersList = [];
        ids = [];
        currentUser = LogicUser.getCurrentUser();
        if (currentUser.id) {
            ids = ids.concat(LogicFriends.getFriendsById(currentUser.id));
            ids = ids.concat(LogicUser.getOnlineUserIds());
        }
        /* remove duplicates */
        var tmp;
        tmp = [];
        for (var i in ids) {
            if (ids[i] == currentUser.id) {
                continue;
            }
            tmp[ids[i]] = ids[i];
        }
        ids = tmp;
        if (ids) {
            for (var i in ids) {
                user = LogicUser.getById(ids[i]);
                if (!user) {
                    continue;
                }
                /**
                 * установить случаи отображения:
                 * - инвайт да;
                 * - инвайт нет, если есть приглшание;
                 * - инвайт нет, если отправлено приглашение;
                 * - "играем?" нет;
                 * - "играем?" да, если есть приглашение;
                 * - "ждём..." нет;
                 * - "ждём..." да, если отправлено приглашение;
                 */
                /* шаг 1. Значения по умолчанию */
                enableButtonInvite = true;
                showButtonInvite = true;
                showButtonLetsPlay = false;
                showIndicatorWaiting = false;
                showBusyText = false;
                showOfflineText = false;
                /* шаг 2. Условия отключения кнопки приглашения. */
                if (LogicInvites.haveInvite(user.id) || !user.online || user.isBusy || user.onGameId) {
                    showButtonInvite = false;
                }
                /* шаг 3. Условия включения "играем?" */
                if (LogicInvites.isInviteExists(user.id, currentUser.id) && user.online) {
                    showButtonLetsPlay = true;
                }
                /* шаг 4. Условия включения "ждём..." */
                if (LogicInvites.isInviteExists(currentUser.id, user.id) && !showButtonLetsPlay && user.online && !user.isBusy && !user.onGameId) {
                    showIndicatorWaiting = true;
                }
                if (!user.online) {
                    showOfflineText = true;
                }
                if (user.online && (user.onGameId || user.isBusy)) {
                    showBusyText = true;
                }
                usersList.push({
                    isFriend: LogicFriends.isFriend(currentUser.id, user.id),
                    src: user.photo50,
                    title: user.firstName + " " + user.lastName,
                    showButtonInvite: showButtonInvite,
                    enableButtonInvite: true,
                    showButtonLetsPlay: showButtonLetsPlay,
                    showIndicatorWaiting: showIndicatorWaiting,
                    showBusyText: showBusyText,
                    showOfflineText: showOfflineText,
                    onClick: function (user) {
                        window.open(SocNet.getUserProfileUrl(user.socNetTypeId, user.socNetUserId), '_blank');
                    },
                    onButtonInviteClick: LogicPageMain.onInviteClick,
                    onButtonLetsPlayClick: LogicPageMain.onLetsPlayClick,
                    user: user
                });
            }
        }
        /** Сортировка.
         * Сортировтаь будем так:
         * - посл раз заходил.
         * - друг;
         * - онлайн;
         */
        usersList.sort(function (a, b) {
            if (a.user.lastLogoutTimestamp > b.user.lastLogoutTimestamp)return -1;
            if (a.user.lastLogoutTimestamp < b.user.lastLogoutTimestamp)return 1;
            return 0;
        });
        usersList.sort(function (a, b) {
            if (a.isFriend && !b.isFriend)return -1;
            if (!a.isFriend && b.isFriend)return 1;
            return 0;
        });
        usersList.sort(function (a, b) {
            if (a.user.online && !b.user.online)return -1;
            if (!a.user.online && b.user.online)return 1;
            return 0;
        });
        self.elementFriendsType.update(usersList);
    };

    /**
     * Обновляем онлайн индикатор и индикатор очков.
     */
    this.redraw = function () {
        if (!showed)return;
        self.preset();
        for (var i in self.elements) {
            self.elements[i].redraw();
        }
    };
};
if(window["PageMain"] != undefined){window["PageMain"].__path="../client/components/application/pages/PageMain.js"};

/* ../client/components/application/pages/PageOnlineScore.js */
/**
 * Страница шаблон.
 * @constructor
 */
PageOnlineScore = function PageOnlineScore() {
    var self = this;

    /**
     * Показывать ли страницу.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Массив всех элементов страницы.
     * @type {Array}
     */
    this.elements = [];

    /**
     * Элемент-текст отображающий количество онлайн игроков.
     * @type {ElementGraphicText}
     */
    this.elementOnlineIndicator;

    /**
     * Элемент-текст отображает количество очков игрока.
     * @type {ElementGraphicText}
     */
    this.elementPositionIndicator;

    /**
     *
     * @type {ElementText}
     */
    this.elementScore15x15vsPerson;

    /**
     * кард-инфо юзера.
     * @type {ElementCardInfo}
     */
    var elementCardInfo;

    this.init = function () {
        var element;
        /* Тут создаются элементы страницы. */
        /* online indicator */
        element = GUI.createElement('ElementGraphicText', {
            x: 570,
            y: 405,
            width: 140,
            text: 'онлайн: -'
        });
        self.elements.push(element);
        self.elementOnlineIndicator = element;
        /* rating position */
        element = GUI.createElement('ElementGraphicText', {
            x: 570,
            y: 435,
            width: 160,
            text: 'рейтинг: -',
            pointer: GUI.POINTER_HAND
        });
        self.elements.push(element);
        self.elementPositionIndicator = element;
        element = GUI.createElement("ElementImage", {
            x: 570 - 5,
            y: 470,
            src: '/images/cardInfo/image15x15vsPerson.png',
            title: 'Побед 15х15 с человеком.'
        });
        self.elements.push(element);
        element = GUI.createElement('ElementText', {
            x: 570 + 58,
            y: 470 - 3,
            bold: true,
            fontSize: 19
        });
        self.elementScore15x15vsPerson = element;
        self.elements.push(element);
        element = GUI.createElement('ElementCardInfo', {
            x: 445,
            y: 320
        });
        GUI.bind(self.elementPositionIndicator.dom, GUI.EVENT_MOUSE_OVER, onMouseOver, this);
        GUI.bind(self.elementPositionIndicator.dom, GUI.EVENT_MOUSE_OUT, onMouseOut, this);
        elementCardInfo = element;
    };

    /**
     * Покажем все элементы на странице.
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
     * Спрачем все элементы на странице.
     */
    this.hide = function () {
        if (showed == false) return;
        showed = false;
        for (var i in self.elements) {
            self.elements[i].hide();
        }
        elementCardInfo.hide();
    };

    /**
     * Настройка перед отрисовкой.
     */
    this.preset = function () {
        var onlineCount, position, user, score15x15vsPerson;
        /* Возможны какие то обновления, до отрисовки. */
        onlineCount = LogicUser.getOnlineCount();
        user = LogicUser.getCurrentUser();
        if (user && user.id) {
            position = LogicUser.getRatingPosition();
            score15x15vsPerson = user.score15x15vsPerson;
        }
        self.elementOnlineIndicator.setText('онлайн: ' + (typeof onlineCount == 'number' ? onlineCount : '-'));
        self.elementPositionIndicator.setText('рейтинг: ' + (typeof position == 'number' ? position : '-'));
        self.elementScore15x15vsPerson.setText(typeof score15x15vsPerson == 'number' ? score15x15vsPerson : '-');
        elementCardInfo.updateUser(LogicUser.getCurrentUser());
    };

    /**
     * Обновляем онлайн индикатор и индикатор очков.
     */
    this.redraw = function () {
        if (!showed) return;
        self.preset();
        for (var i in self.elements) {
            self.elements[i].redraw();
        }
    };

    /**
     * При наведении мыши, покажем кард инфо.
     */
    var onMouseOver = function () {
        elementCardInfo.updateUser(LogicUser.getCurrentUser());
        elementCardInfo.show();
    };

    /**
     * При уходе фокуса мыши, прячем кард инфо.
     */
    var onMouseOut = function () {
        elementCardInfo.hideStart();
    };
};
if(window["PageOnlineScore"] != undefined){window["PageOnlineScore"].__path="../client/components/application/pages/PageOnlineScore.js"};

/* ../client/components/application/pages/PageRating.js */
/**
 * Страница шаблон.
 * @constructor
 */
PageRating = function PageRating() {
    var self = this;

    /**
     * Показывать ли страницу.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Массив всех элементов страницы.
     * @type {Array}
     */
    this.elements = [];

    /**
     * Элемент списка рейтинга.
     * @type {ElementRatingList}
     */
    var elementRatingList = null;

    var offsetPhoto = 0;
    var offsetName = 112;
    var offsetPosition = 440;
    var offsetScore15x15vsPerson = 530;
    var widthName = 350;

    /**
     *
     * @type {ElementImage}
     */
    var elementArrow = null;

    this.init = function () {
        var element;
        var ratingListX = 100;
        /* Список рейтинга. */
        element = GUI.createElement('ElementRatingList', {
            x: ratingListX,
            y: 171,
            width: 500,
            rowSpacing: 0,
            rowsCount: 8,
            offsetPhoto: offsetPhoto,
            offsetName: offsetName,
            offsetPosition: offsetPosition,
            offsetScore15x15vsPerson: offsetScore15x15vsPerson,
            widthName: widthName
        });
        self.elements.push(element);
        elementRatingList = element;
        /* Кнопка меню */
        element = GUI.createElement('ElementButton', {
            x: 521,
            y: 72,
            srcRest: '/images/buttons/menuRest.png',
            srcHover: '/images/buttons/menuHover.png',
            srcActive: '/images/buttons/menuActive.png',
            onClick: LogicPageRating.onMenuButtonClick
        });
        self.elements.push(element);
        /* Текст заголовка. */
        /* Надпись: "фото" */
        element = GUI.createElement('ElementImage', {
            x: ratingListX + offsetPhoto - 12,
            y: 142 - 7,
            src: '/images/rating/headerPhoto.png'
        });
        self.elements.push(element);
        /* Надпись: "Имя, Фамилия" */
        element = GUI.createElement('ElementImage', {
            x: ratingListX + offsetName - 12 + widthName / 2 - 150 / 2,
            y: 142 - 7,
            src: '/images/rating/headerNameSurname.png'
        });
        self.elements.push(element);
        /* Надпись: "Позиция." */
        element = GUI.createElement('ElementImage', {
            x: ratingListX + offsetPosition - 18,
            y: 142 - 7,
            src: '/images/rating/headerPositionByScore.png'
        });
        self.elements.push(element);
        /* Очки 15х15 с персонажом */
        element = GUI.createElement('ElementImage', {
            x: ratingListX + offsetScore15x15vsPerson,
            y: 142,
            src: '/images/rating/headerScore15x15vsPerson.png',
            title: 'Побед 15х15 с человеком.'
        });
        self.elements.push(element);
        element = GUI.createElement('ElementButton', {
            x: 144,
            y: 85,
            srcRest: '/images/rating/buttonTop.png',
            srcHover: '/images/rating/buttonTopHover.png',
            srcActive: '/images/rating/buttonTopHover.png',
            onClick: LogicPageRating.onTopButtonClick
        });
        self.elements.push(element);
        element = GUI.createElement('ElementButton', {
            x: 144,
            y: 115,
            srcRest: '/images/rating/buttonMyPosition.png',
            srcHover: '/images/rating/buttonMyPositionHover.png',
            srcActive: '/images/rating/buttonMyPositionHover.png',
            onClick: LogicPageRating.onMyPositionButtonClick
        });
        self.elements.push(element);
        element = GUI.createElement('ElementButton', {
            x: 335,
            y: 84,
            srcRest: '/images/rating/buttonDownRest.png',
            srcHover: '/images/rating/buttonDownHover.png',
            srcActive: '/images/rating/buttonDownActive.png',
            onClick: LogicPageRating.onDownButtonClick
        });
        self.elements.push(element);
        element = GUI.createElement('ElementButton', {
            x: 377,
            y: 84,
            srcRest: '/images/rating/buttonUpRest.png',
            srcHover: '/images/rating/buttonUpHover.png',
            srcActive: '/images/rating/buttonUpActive.png',
            onClick: LogicPageRating.onUpButtonClick
        });
        self.elements.push(element);
        element = GUI.createElement('ElementImage', {
            x: 114,
            y: 115,
            src: '/images/rating/arrow.png'
        });
        elementArrow = element;
        self.elements.push(element);
    };

    /**
     * Покажем все элементы на странице.
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
     * Спрачем все элементы на странице.
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
        var ratingList, rating, usersList, user;
        ratingList = LogicPageRating.getRatingList();
        usersList = [];
        for (var i in ratingList) {
            rating = ratingList[i];
            user = LogicUser.getById(rating.userId);
            usersList.push({
                photoData: {
                    title: user.firstName + " " + user.lastName,
                    showButtonInvite: false,
                    enableButtonInvite: false,
                    showButtonLetsPlay: false,
                    showIndicatorWaiting: false,
                    onClick: function (photoInfo) {
                        window.open(SocNet.getUserProfileUrl(photoInfo.socNetTypeId, photoInfo.socNetUserId), '_blank');
                    },
                    onButtonInviteClick: null,
                    onButtonLetsPlayClick: null,
                    user: user
                },
                name: user.firstName + " " + user.lastName,
                score15x15vsPerson: user.score15x15vsPerson,
                score3x3vsPerson: user.score3x3vsPerson,
                score15x15vsRobot: user.score15x15vsRobot,
                score3x3vsRobot: user.score3x3vsRobot,
                position: rating.position
            });
        }
        elementRatingList.update(usersList);
    };

    /**
     * Обновляем онлайн индикатор и индикатор очков.
     */
    this.redraw = function () {
        if (!showed) return;
        self.preset();
        switch (LogicPageRating.showId) {
            case LogicPageRating.SHOW_TOP:
                elementArrow.y = 85;
                elementArrow.show();
                break;
            case LogicPageRating.SHOW_MY_POSITION:
                elementArrow.y = 115;
                elementArrow.show();
                break;
            case LogicPageRating.SHOW_CUSTOM:
                elementArrow.hide();
                break;
        }
        elementArrow.redraw();
        for (var i in self.elements) {
            self.elements[i].redraw();
        }
    };
};
if(window["PageRating"] != undefined){window["PageRating"].__path="../client/components/application/pages/PageRating.js"};

/* ../client/components/application/pages/PageXOGame.js */
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
            y: 163,
            showCardInfo: true,
            cardInfoOffsetX: -111,
            cardInfoOffsetY: -20
        });
        self.elements.push(element);
        self.elementOpponentPhoto = element;
        /* Статус игры. */
        element = GUI.createElement('ElementGraphicText', {
            x: 578,
            y: 258,
            width: 157,
            height: undefined,
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
        var opponent, opponentUserId;
        if (game) {
            if (game.vsRobot) {
                self.elementOpponentPhoto.showCardInfo = false;
                opponent = {
                    online: null,
                    photo50: '/images/photo/vsRobot.png',
                    firstName: 'Игра с роботом.',
                    lastName: ''
                };
            } else {
                self.elementOpponentPhoto.showCardInfo = true;
                opponentUserId = LogicXO.getOpponentUserId(game, user.id);
                if (opponentUserId) {
                    opponent = LogicUser.getById(opponentUserId);
                }
            }
        }
        self.elementOpponentPhoto.update({
            title: opponent ? opponent.firstName + ' ' + opponent.lastName : '',
            showButtonInvite: false,
            showButtonLetsPlay: false,
            showIndicatorWaiting: false,
            onClick: function (user) {
                if (user.socNetUserId) {
                    window.open(SocNet.getUserProfileUrl(user.socNetTypeId, user.socNetUserId), '_blank');
                }
            },
            onButtonInviteClick: false,
            onButtonLetsPlayClick: false,
            enableButtonInvite: false,
            user: opponent
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
if(window["PageXOGame"] != undefined){window["PageXOGame"].__path="../client/components/application/pages/PageXOGame.js"};

/* ../client/components/application/pages/__PageName__.js */
/**
 * Страница шаблон.
 * @constructor
 */
__PageName__ = function __PageName__() {
    var self = this;

    /**
     * Показывать ли страницу.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Массив всех элементов страницы.
     * @type {Array}
     */
    this.elements = [];

    this.init = function () {
        var element;
        /* Тут создаются элементы страницы. */
    };

    /**
     * Покажем все элементы на странице.
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
     * Спрачем все элементы на странице.
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
        /* Возможны какие то обновления, до отрисовки. */
    };

    /**
     * Обновляем элементы и перерисовываем их.
     */
    this.redraw = function () {
        if (!showed) return;
        self.preset();
        for (var i in self.elements) {
            self.elements[i].redraw();
        }
    };
};
if(window["__PageName__"] != undefined){window["__PageName__"].__path="../client/components/application/pages/__PageName__.js"};

/* ../client/components/application/sapi/SAPIChat.js */
SAPIChat = function () {

    /**
     * Отправка сообщения на сервер.
     * @param message {String}
     */
    this.sendMessage = function (message) {
        apiRouter.executeRequest('SAPIChat', 'sendMessage', arguments, [{connectionId: null}]);
    };

    /**
     * Запрос последних сообщений.
     */
    this.sendMeLastMessages = function () {
        apiRouter.executeRequest('SAPIChat', 'sendMeLastMessages', arguments, [{connectionId: null}]);
    }
};

/**
 * Статичный класс.
 * @type {SAPIChat}
 */
SAPIChat = new SAPIChat();if(window["SAPIChat"] != undefined){window["SAPIChat"].__path="../client/components/application/sapi/SAPIChat.js"};

/* ../client/components/application/sapi/SAPIGame.js */
SAPIGame = function () {

    /**
     * Запрос на присоединение\создание игры.
     * @param fieldTypeId {Number} тип поля LogicXO.FIELD_TYPE_ID_*.
     * @param signId {Number} тип знака LogicXO.SIGN_ID_*.
     */
    this.requestRandomGame = function (fieldTypeId, signId) {
        apiRouter.executeRequest('SAPIGame', 'requestRandomGame', arguments, [{connectionId: null}]);
    };

    /**
     * Сообщим серверу, что мы больше не ждем игры.
     */
    this.cancelRandomGameRequests = function () {
        apiRouter.executeRequest('SAPIGame', 'cancelRandomGameRequests', arguments, [{connectionId: null}]);
    };

    /**
     * Сделать ход в игре.
     * @param gameId {Number} id игры.
     * @param x {Number}
     * @param y {Number}
     */
    this.doMove = function (gameId, x, y) {
        apiRouter.executeRequest('SAPIGame', 'doMove', arguments, [{connectionId: null}]);
    };

    /**
     * Просим сервер проверить, есть ли победитель.
     * @param gameId {Number} id игры.
     */
    this.checkWinner = function (gameId) {
        apiRouter.executeRequest('SAPIGame', 'checkWinner', arguments, [{connectionId: null}]);
    };

    /* Закрыть игру с роботом.
     * @param gameId {Number}
     */
    this.close = function (gameId) {
        apiRouter.executeRequest('SAPIGame', 'close', arguments, [{connectionId: null}]);
    };
};

/**
 * Статичный класс.
 * @type {SAPIGame}
 */
SAPIGame = new SAPIGame();if(window["SAPIGame"] != undefined){window["SAPIGame"].__path="../client/components/application/sapi/SAPIGame.js"};

/* ../client/components/application/sapi/SAPIInvites.js */
SAPIInvites = function () {

    /**
     * Отправка приглашения на сервер.
     * @param whoId {Number} внутрений id пользователя который пригласил.
     * @param whomId {Number} внутрений id пользователя которого пригласили.
     */
    this.send = function (whoId, whomId) {
        apiRouter.executeRequest('SAPIInvites', 'send', arguments, [{connectionId: null}]);
    };

    /**
     * Создание игры по приглашению.
     * @param fieldTypeId {Number} тип поля LogicXO.FIELD_TYPE_ID_*
     * @param signId {Number} тип знака LogicXO.SIGN_ID_*
     * @param withUserId {Number} внутрений id юзера с которым создаём игру.
     */
    this.createGame = function (fieldTypeId, signId, withUserId) {
        apiRouter.executeRequest('SAPIInvites', 'createGame', arguments, [{connectionId: null}]);
    };

    /**
     * Закроем игру.
     * @param gameId {Number} id игры.
     */
    this.close = function (gameId) {
        apiRouter.executeRequest('SAPIInvites', 'close', arguments, [{connectionId: null}]);
    };
};

/**
 * Статичный класс.
 * @type {SAPIInvites}
 */
SAPIInvites = new SAPIInvites();if(window["SAPIInvites"] != undefined){window["SAPIInvites"].__path="../client/components/application/sapi/SAPIInvites.js"};

/* ../client/components/application/sapi/SAPIRating.js */
/**
 * @constructor
 */
SAPIRating = function () {

    /**
     * Запросить рейтинговые данные для указанных позиций.
     */
    this.sendMeRatingForPositions = function (positions) {
        apiRouter.executeRequest('SAPIRating', 'sendMeRatingForPositions', arguments, [{connectionId: null}]);
    };

    this.sendMeLastPosition = function () {
        apiRouter.executeRequest('SAPIRating', 'sendMeLastPosition', arguments, [{connectionId: null}]);
    };
};

/**
 * Статичный класс.
 * @type {SAPIRating}
 */
SAPIRating = new SAPIRating();if(window["SAPIRating"] != undefined){window["SAPIRating"].__path="../client/components/application/sapi/SAPIRating.js"};

/* ../client/components/application/sapi/SAPIRepeatGame.js */
/**
 * @constructor
 */
SAPIRepeatGame = function () {

    /**
     * Запрос на повтор игры.
     * @param gameId {int}
     */
    this.repeat = function (gameId) {
        apiRouter.executeRequest('SAPIRepeatGame', 'repeat', arguments, [{connectionId: null}]);
    };
};

/**
 * Статичный класс.
 * @type {SAPIRepeatGame}
 */
SAPIRepeatGame = new SAPIRepeatGame();if(window["SAPIRepeatGame"] != undefined){window["SAPIRepeatGame"].__path="../client/components/application/sapi/SAPIRepeatGame.js"};

/* ../client/components/application/sapi/SAPIRobotGame.js */
SAPIRobotGame = function () {

    /**
     * Создание игры с роботом
     * @param fieldTypeId {Number} тип поля LogicXO.FIELD_TYPE_ID_*
     * @param signId {Number} тип знака LogicXO.SIGN_ID_*
     */
    this.createGame = function (fieldTypeId, signId) {
        apiRouter.executeRequest('SAPIRobotGame', 'createGame', arguments, [{connectionId: null}]);
    };

    /**
     * Закрыть игру с роботом.
     * @param gameId {Number}
     */
    this.close = function (gameId) {
        apiRouter.executeRequest('SAPIRobotGame', 'close', arguments, [{connectionId: null}]);
    };

    /**
     * Просим робота сделать ход.
     * @param gameId {Number}
     */
    this.raiseAIMove = function (gameId) {
        apiRouter.executeRequest('SAPIRobotGame', 'raiseAIMove', arguments, [{connectionId: null}]);
    };
};

/**
 * Статичный класс.
 * @type {SAPIRobotGame}
 */
SAPIRobotGame = new SAPIRobotGame();
if(window["SAPIRobotGame"] != undefined){window["SAPIRobotGame"].__path="../client/components/application/sapi/SAPIRobotGame.js"};

/* ../client/components/application/sapi/SAPIStatistic.js */
SAPIStatistic = function () {

    this.openInviteFriendDialog = function () {
        apiRouter.executeRequest('SAPIStatistic', 'openInviteFriendDialog', arguments, [{connectionId: null}]);
    };

    this.clickHelp = function () {
        apiRouter.executeRequest('SAPIStatistic', 'clickHelp', arguments, [{connectionId: null}]);
    };

    this.onRatingButtonClick = function () {
        apiRouter.executeRequest('SAPIStatistic', 'onRatingButtonClick', arguments, [{connectionId: null}]);
    };
};

/**
 * Статичный класс.
 * @type {SAPIStatistic}
 */
SAPIStatistic = new SAPIStatistic();if(window["SAPIStatistic"] != undefined){window["SAPIStatistic"].__path="../client/components/application/sapi/SAPIStatistic.js"};

/* ../client/components/application/sapi/SAPIUser.js */
SAPIUser = function () {

    /**
     * Авторизация через ВК.
     * @param socNetUserId {int} id в социальной сети.
     * @param authParams {object} параметры аутентификации.
     */
    this.authorizeByVK = function (socNetUserId, authParams) {
        apiRouter.executeRequest('SAPIUser', 'authorizeByVK', arguments, [{connectionId: null}]);
    };

    /**
     * Отправяел информацию о пользователи в текущие соединение.
     * @param userId {int}
     */
    this.sendMeUserInfo = function (userId) {
        apiRouter.executeRequest('SAPIUser', 'sendMeUserInfo', arguments, [{connectionId: null}]);
    };

    /**
     * Запрос инфомрации о друзьях.
     * @param userId {int}
     */
    this.sendMeFriends = function (userId) {
        apiRouter.executeRequest('SAPIUser', 'sendMeFriends', arguments, [{connectionId: null}]);
    };

    /**
     * Запрос на отправку онлайн пользователей.
     */
    this.sendMeOnlineCount = function () {
        apiRouter.executeRequest('SAPIUser', 'sendMeOnlineCount', arguments, [{connectionId: null}]);
    };

    /**
     * Попросить отправить список userId онлайн юзеров.
     */
    this.sendMeOnlineUserIds = function () {
        apiRouter.executeRequest('SAPIUser', 'sendMeOnlineUserIds', arguments, [{connectionId: null}]);
    };

    this.sendMeRatingPosition = function(userId){
        apiRouter.executeRequest('SAPIUser', 'sendMeRatingPosition', arguments, [{connectionId: null}]);
    };
};

/**
 * Статичный класс.
 * @type {SAPIUser}
 */
SAPIUser = new SAPIUser();if(window["SAPIUser"] != undefined){window["SAPIUser"].__path="../client/components/application/sapi/SAPIUser.js"};

/* ../client/components/application/sapi/SAPIUserState.js */
SAPIUserState = function () {

    /**
     * Сообщает, что пользователь занят.
     */
    this.isBusy = function () {
        apiRouter.executeRequest('SAPIUserState', 'isBusy', arguments, [{connectionId: null}]);
    };

    /**
     * Сообщает, что пользователь свободен.
     */
    this.isNoBusy = function () {
        apiRouter.executeRequest('SAPIUserState', 'isNoBusy', arguments, [{connectionId: null}]);
    };

    /**
     * Сообщает, что пользователь в игре.
     * @param gameId {Number} id игры.
     */
    this.onGame = function (gameId) {
        apiRouter.executeRequest('SAPIUserState', 'onGame', arguments, [{connectionId: null}]);
    };
};

/**
 * Статичный класс.
 * @type {SAPIUserState}
 */
SAPIUserState = new SAPIUserState();if(window["SAPIUserState"] != undefined){window["SAPIUserState"].__path="../client/components/application/sapi/SAPIUserState.js"};

/* components/base/ApiRouter.js */
/**
 * ApiRouter
 * Клиент-серверный компонент!
 * @constructor
 */
ApiRouter = function () {
    var self = this;

    var map = null;

    var connections = {};
    var onDisconnectCallbacks = [];
    var onFailedSendCallbacks = [];

    this.setMap = function (givenMap) {
        map = givenMap;
    };

    /**
     * Обрабатываем поступающие данные.
     * @param packet {string} пакет данных, фомат:JSON, {group:string, method:string, args:[...]}
     * @param id {Number} id соединения.
     */
    this.onData = function (packet, id) {
        var group, method, args;
        try {
            packet = JSON.parse(packet);
        } catch (e) {
            Logs.log("Wrong data:parse error", Logs.LEVEL_WARNING, packet);
            return;
        }
        if (typeof packet != 'object') {
            Logs.log("Wrong data: packet must be 'object'", Logs.LEVEL_WARNING, packet);
            return;
        }
        if (packet.group == undefined) {
            Logs.log("Wrong data: packet must have .group", Logs.LEVEL_WARNING, packet);
            return;
        }
        if (typeof packet.group != 'string') {
            Logs.log("Wrong data: packet.group must have type 'string'", Logs.LEVEL_WARNING, packet);
            return;
        }
        if (packet.method == undefined) {
            Logs.log("Wrong data: packet must have .method", Logs.LEVEL_WARNING, packet);
            return;
        }
        if (typeof packet.method != 'string') {
            Logs.log("Wrong data: packet.method must have type 'string'", Logs.LEVEL_WARNING, packet);
            return;
        }
        if (packet.args == undefined) {
            Logs.log("Wrong data: packet must have .args", Logs.LEVEL_WARNING, packet);
            return;
        }
        if (typeof packet.args != 'object') {
            Logs.log("Wrong data: packet.args must have type 'object'", Logs.LEVEL_WARNING, packet);
            return;
        }

        group = packet.group;
        method = packet.method;
        args = packet.args;

        if (map[group] == undefined) {
            Logs.log("Wrong data: group not found " + group, Logs.LEVEL_WARNING, packet);
            return;
        }
        if (map[group][method] == undefined) {
            Logs.log("Wrong data: method not found " + method, Logs.LEVEL_WARNING, packet);
            return;
        }
        // добавим к аргументам контекст соединения.
        args.unshift(connections[id]);
        // выполним запрашиваемый метод.
        var connectionsKey;
        connectionsKey = '';
        if (id)connectionsKey = id;
        Logs.log(id + " " + ">> " + group + "." + method + JSON.stringify(args), Logs.LEVEL_DETAIL);
        /* group_method.counter ++ */
        ApiRouterMetrics[group][method]++;
        map[group][method].apply(self, args);
    };

    this.onConnect = function (id) {
        Logs.log("connection created: id=" + id, Logs.LEVEL_DETAIL);
        connections[id] = {
            connectionId: id
        };
    };

    this.onDisconnect = function (id) {
        Logs.log("connection close: id=" + id, Logs.LEVEL_DETAIL);
        for (var i in onDisconnectCallbacks) {
            onDisconnectCallbacks[i].call(self, connections[id]);
        }
        delete connections[id];
    };

    this.executeRequest = function (group, method, args, cntxList) {
        /* Конвертируем объект в массив. */
        var connectionsKey;
        connectionsKey = '';
        for (var i in cntxList) {
            connectionsKey += cntxList[i].connectionId
        }
        args = Array.prototype.slice.call(args);
        Logs.log(connectionsKey + " " + "<< " + group + "." + method + JSON.stringify(args), Logs.LEVEL_DETAIL);
        /* group_method.counter ++ */
        ApiRouterMetrics[group][method]++;
        var packet = {
            group: group,
            method: method,
            args: args
        };
        packet = JSON.stringify(packet);
        var cntxListLength = 0;
        for (var i in cntxList) {
            if (!this.sendData(packet, cntxList[i].connectionId)) {
                Logs.log("ApiRouter.failedToSend", Logs.LEVEL_WARNING, {packet: packet, cntx: cntxList[i]});
                for (var i in onFailedSendCallbacks) {
                    onFailedSendCallbacks[i].call(self, cntxList[i]);
                }
            }
            cntxListLength++;
        }
        if (cntxListLength == 0) {
            Logs.log("ApiRouter. Try send to empty contextlist.", Logs.LEVEL_WARNING, {
                packet: packet,
                cntxList: cntxList
            });
        }
    };

    /**
     * Добавлить каллбэк дисконнекта.
     * Будет вызван при дисконнекте соедеинения.
     * @param callback
     */
    this.addOnDisconnectCallback = function (callback) {
        onDisconnectCallbacks.push(callback);
    };

    /**
     * Добавлить каллбэк неудачной отправки.
     * Будет вызван при неудачной отправки данных, в разорванное соединение.
     * @param callback
     */
    this.addOnFailedSendCallback = function (callback) {
        onFailedSendCallbacks.push(callback);
    };
};if(window["ApiRouter"] != undefined){window["ApiRouter"].__path="components/base/ApiRouter.js"};

/* components/base/ApiRouterMetrics.js */
ApiRouterMetrics = {};

ApiRouterMetrics.map = {};
ApiRouterMetrics.timeBegin = null;

ApiRouterMetrics.getMetrics = function () {
    var output, timeElapsed, count, rps, countSumm;
    timeElapsed = time() - ApiRouterMetrics.timeBegin;
    output = '';
    output += "___________________\r\n";
    output += "elapsed: " + timeElapsed + " sec.\r\n";
    countSumm = 0;
    for (var group in ApiRouterMetrics.map) {
        output += "" + group + "\r\n";
        for (var method in ApiRouterMetrics.map[group]) {
            count = ApiRouterMetrics[group][method];
            if (!count)continue;
            rps = Math.round((count / timeElapsed) * 100) / 100;
            method = str_pad(method, 30);
            output += "    " + method + ' : ' + count + "  " + rps + " rps." + "\r\n";
            countSumm += count;
        }
    }
    rps = Math.round((countSumm / timeElapsed) * 100) / 100;
    output += "summary: " + countSumm + "   " + rps + " rps.\r\n";
    return output;
};

ApiRouterMetrics.printMetrics = function () {
    var output;
    output = ApiRouterMetrics.getMetrics();
    console.log(output);
};

ApiRouterMetrics.setup = function (map) {
    ApiRouterMetrics.timeBegin = time();
    ApiRouterMetrics.map = {};
    var apiName, apiEnabled, APIObject;
    for (var i in map) {
        apiName = i;
        apiEnabled = map[i];
        if (!apiEnabled) {
            continue;
        }
        ApiRouterMetrics[apiName] = {};
        ApiRouterMetrics.map[apiName] = {};
        APIObject = GLOBAL[apiName];
        for (var propName in APIObject) {
            if (typeof APIObject[propName] == 'function') {
                ApiRouterMetrics[apiName][propName] = 0;
                ApiRouterMetrics.map[apiName][propName] = true;
            }
        }
    }
};
if(window["ApiRouterMetrics"] != undefined){window["ApiRouterMetrics"].__path="components/base/ApiRouterMetrics.js"};

/* ../client/components/base/GUI.js */
/**
 * Адаптация для работы с гуёй. В данном случае это браузер.
 * Все запросы к гуи должны быть реализованы тут. и тут: GUIDom
 * @constructor
 */
GUI = function () {

    /**
     * Событие нажатия мышы(левой), но не отпускания.
     * @type {number}
     */
    this.EVENT_MOUSE_MOUSE_DOWN = 1;

    /**
     * Событияе отпускания нажатой мыши(левой).
     * @type {number}
     */
    this.EVENT_MOUSE_MOUSE_UP = 2;

    /**
     * Событие нажатие мышкой(левой)
     * @type {number}
     */
    this.EVENT_MOUSE_CLICK = 3;

    /**
     * Событие попадания курсора мыши в фокус
     * @type {number}
     */
    this.EVENT_MOUSE_OVER = 4;

    /**
     * Событие ухода курсора мыши из фокуса.
     * @type {number}
     */
    this.EVENT_MOUSE_OUT = 5;

    /**
     * Событие опускание клавиши.
     * @type {number}
     */
    this.EVENT_KEY_DOWN = 6;

    /**
     * Событие отпускания клавиши.
     * @type {number}
     */
    this.EVENT_KEY_UP = 7;

    /**
     * Указатель мыши: "Рука".
     * @type {string}
     */
    this.POINTER_HAND = 'hand';
    /**
     * Указатель мыши: "Стандатрная стрелка".
     * @type {string}
     */
    this.POINTER_ARROW = 'default';

    this.eventNames = [];
    this.eventNames[this.EVENT_MOUSE_MOUSE_DOWN] = 'mousedown';
    this.eventNames[this.EVENT_MOUSE_MOUSE_UP] = 'mouseup';
    this.eventNames[this.EVENT_MOUSE_CLICK] = 'click';
    this.eventNames[this.EVENT_MOUSE_OVER] = 'mouseover';
    this.eventNames[this.EVENT_MOUSE_OUT] = 'mouseout';
    this.eventNames[this.EVENT_KEY_DOWN] = 'keydown';
    this.eventNames[this.EVENT_KEY_UP] = 'keyup';

    /**
     * Стэк родителей.
     * На верхуши стэка находиться элемент в который будет добавлены новые элементы.
     * @type {Array}
     */
    var parentsStack = [];

    /**
     * Инициализация.
     * - установим родителя, это будет тело документа.
     */
    this.init = function () {
        parentsStack.push(document.body);
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '.sepia { ' +
        'filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'old-timey\'><feColorMatrix type=\'matrix\' values=\'0.14 0.45 0.05 0 0 0.12 0.39 0.04 0 0 0.08 0.28 0.03 0 0 0 0 0 1 0\'/></filter></svg>#old-timey");' +
        '-webkit-filter: sepia(0.5);' +
        '-webkit-filter: sepia(95%) grayscale(50%);' +
        '-moz-filter: sepia(80%);' +
        '-ms-filter: sepia(80%);' +
        '-o-filter: sepia(80%);' +
        'filter: sepia(80%);' +
        '}';
        style.innerHTML += '* {' +
        '-webkit-touch-callout: none;' +
        '-webkit-user-select: none;' +
        '-khtml-user-select: none;' +
        '-moz-user-select: none;' +
        '-ms-user-select: none;' +
        'user-select: none;' +
        '}';
        document.getElementsByTagName('head')[0].appendChild(style);
    };

    /**
     * Создаёт элемент
     * @param name {string} имя элемента Element*
     * @param params {object} параметры присваиваемые при создании элемента.
     * @param [parentDom] {GUIDom} необязательный параметр, родительский дом, который будет использован в пределах инициализации элемента.
     * @returns {__ElementName__}
     */
    this.createElement = function (name, params, parentDom) {
        var element;
        if (!window[name]) {
            Logs.log("GUI.createElement: не определен элемент:" + name, Logs.LEVEL_FATAL_ERROR);
        }
        element = new window[name];
        if (!element.init || typeof element.init != 'function') {
            Logs.log("GUI.craeteElement: элемент должен иметь функцию init().", Logs.LEVEL_FATAL_ERROR, arguments);
        }
        if (!element.show || typeof element.show != 'function') {
            Logs.log("GUI.craeteElement: элемент должен иметь функцию show().", Logs.LEVEL_FATAL_ERROR, arguments);
        }
        if (!element.hide || typeof element.hide != 'function') {
            Logs.log("GUI.craeteElement: элемент должен иметь функцию hide().", Logs.LEVEL_FATAL_ERROR, arguments);
        }
        if (!element.redraw || typeof element.redraw != 'function') {
            Logs.log("GUI.craeteElement: элемент должен иметь функцию redraw().", Logs.LEVEL_FATAL_ERROR, arguments);
        }
        for (var i in params) {
            element[i] = params[i];
        }
        if (parentDom) {
            GUI.pushParent(parentDom);
            element.init();
            GUI.popParent();
        } else {
            element.init();
        }

        return element;
    };

    /**
     * Добавляем на верхушку стэка - родителя.
     * @param parentDom {Element}
     * @return {Number} длина стэка родителей.
     */
    this.pushParent = function (parentDom) {
        return parentsStack.push(parentDom.__dom);
    };

    /**
     * Убираем с верхушки стэка дом родителя.
     * @returns {Element}
     */
    this.popParent = function () {
        return parentsStack.pop();
    };

    /**
     * Возвращает текущего родителя, т.е. с верхушки стэка.
     * @returns {Element}
     */
    this.getCurrentParent = function () {
        return parentsStack[parentsStack.length - 1];
    };

    /**
     * Создаёт дом, инициализирует его и возвращает на него ссылку.
     * @param parent {GUIDom} родитель, в который будет добавлен дом.
     * @param params {Object} параметры присваиваемые дому, нпример: {x: 123, y: 345}.
     * @returns {GUIDom}
     */
    this.createDom = function (parent, params) {
        var dom;
        dom = new GUIDom(parent);
        dom.init(undefined, parent);
        if (params) {
            for (var name in params) {
                dom[name] = params[name];
            }
        }
        return dom;
    };

    /**
     * Создаёт дом инпута, иницализирует его и возврщает на него ссыслку.
     * @param parent {GUIDom} родитель, в который будет добавлен дом.
     * @returns {GUIDom}
     */
    this.createInput = function (parent) {
        var dom;
        dom = new GUIDom();
        dom.init('input', parent);
        return dom;
    };

    /**
     * Првязываем событие к домЭлементы
     * @param dom {GUIDom} к кому привязываем событие.
     * @param eventId {int} id события GUIDom.EVENT_*
     * @param callback {function}
     * @param context {Object}
     */
    this.bind = function (dom, eventId, callback, context) {
        dom.bind(eventId, callback, context);
    };

    /**
     * Заранее загруженные картинки, но с timestampom
     * timestamp вставлять везже сложно, проще сделать это в одном месте.
     * @param url
     * @returns {*}
     */
    this.getImageURL = function (url) {
        if (!window.imagesData[url]) {
            Logs.log("Image url not found for: " + url, Logs.LEVEL_ERROR);
            return '/images/notFound.png';
        }
        return window.imagesData[url].path;
    };
};

/**
 * Статичный "класс".
 * @type {GUI}
 */
GUI = new GUI();if(window["GUI"] != undefined){window["GUI"].__path="../client/components/base/GUI.js"};

/* ../client/components/base/GUIDom.js */
/**
 * Адаптация для работы с гуёй. В данном случае это браузер.
 * Все запросы к гуи должны быть реализованы тут. и тут: GUIDom
 * @constructor
 * @property x {int}
 * @property y {int}
 * @property width {int}
 * @property height {int}
 * @property backgroundImage {url}
 * @property backgroundSize {int}
 * @property innerHTML {string}
 * @property pointer {GUI.POINTER_*}
 * @property opacity {Number}
 * @property fontWeight {String}
 * @property fontSize {String}
 * @property fontFamily {String}
 * @property color {String}
 * @property textShadow {String}
 * @property borderRadius {String}
 * @property border {String}
 * @property borderTop {String}
 * @property borderRight {String}
 * @property borderBottom {String}
 * @property borderLeft {String}
 * @property padding {String}
 * @property boxShadow {String}
 * @property lineHeight {Number}
 * @property background {String}
 * @property transform {String}
 * @property title {String}
 * @property isItsepia {Bool}
 * @property alignText {String}
 * @property zIndex {Int}
 * @property fontWeight {String}
 */
GUIDom = function () {
    var self = this;

    this.__id = ++GUIDom.lastId;

    /**
     * Старые свойства.
     * Их мы будем хранить, что бы не перерисовывать лишний раз,
     * то что не меняется.
     * @type {{}}
     */
    var oldProps = {};

    /**
     * Показывтаь ли дом.
     * @type {boolean}
     */
    var showed = false;

    /**
     * Дом браузера.
     * @type {Element}
     */
    var dom = null;

    /**
     * Создается элемент браузера
     * Настраиваются минимальные параметры
     * @param type [string] input|div
     * @param parent [GUIDom] родитель.
     */
    this.init = function (type, parent) {
        /* Начальное значение старых свойств */
        for (var i in props) {
            oldProps[i] = undefined;
        }
        /* Создадим дом */
        if (type == 'input') {
            dom = document.createElement("input");
        } else {
            dom = document.createElement("div");
        }
        /* значения по умолчанию для дом-ов. */
        dom.style.position = 'absolute';
        dom.style.overflow = 'hidden';
        /* no dragable by default */
        dom.ondragstart = function () {
            return false;
        };
        /* hidden mode..:begin */
        if (GUIDom.hidePictures) {
            document.body.style.opacity = 0.01;
            dom.style.border = '1px dotted grey';
        }
        /* Указанная прозрачность картинок. */
        if (GUIDom.pictureOpacities) {
            document.body.style.opacity = GUIDom.pictureOpacities;
            dom.style.border = '2px solid lightgrey';
        }
        /* hidden mode..:finish */
        /* Добавим дом к родителю. */
        this.__dom = dom;
        if (parent == undefined) {
            parent = GUI.getCurrentParent();
        } else {
            parent = parent.__dom;
        }
        parent.appendChild(dom);
    };

    /**
     * Покажем дом.
     */
    this.show = function () {
        if (showed == true) {
            return;
        }
        showed = true;
        dom.style.display = 'block';
        self.redraw();
    };

    /**
     * Спрячем дом.
     */
    this.hide = function () {
        if (showed == false) {
            return;
        }
        showed = false;
        dom.style.display = 'none';
    };

    /**
     * Перересовка дома.
     * Только те свойства, которые изменились.
     */
    this.redraw = function () {
        if (!showed) {
            return;
        }
        for (var name in props) {
            if (oldProps[name] != self[name]) {
                props[name].call();
                oldProps[name] = self[name];
            }
        }
    };

    /**
     * id текущей запущенной анимации.
     * если null - анимация отключается.
     * @type {null}
     */
    var animateNowId = null;

    /**
     * Аргументы переданные при запуске анимации.
     * @type {Array}
     */
    var animateArguments = [];

    /**
     * тайм-аут для анимации.
     * @type {null}
     */
    var animateTimeout = null;

    var ANIMATE_NOW_OPACITY_UP = 1;
    var ANIMATE_NOW_OPACITY_DOWN = 2;

    /**
     * Остановить текущую анимацию.
     */
    this.animateStop = function () {
        animateNowId = null;
    };
    /**
     * Анимация прозрачности.
     * @param target {Number}
     */
    this.animateOpacity = function (target, from, timeout) {
        var direction;

        if (from !== undefined) {
            self.opacity = from;
        }
        if (!self.opacity) {
            self.opacity = 0;
        }
        from = self.opacity;

        if (from < target) {
            animateNowId = ANIMATE_NOW_OPACITY_UP;
        } else {
            animateNowId = ANIMATE_NOW_OPACITY_DOWN;
        }
        animateArguments = [];
        animateArguments.push(target);
        animateArguments.push(from);
        /* animateStep */
        animateArguments.push(Math.abs((target - from) / 24));
        animateTimeout = timeout;

        animateNow();
    };

    var animateNow = function () {
        switch (animateNowId) {
            case ANIMATE_NOW_OPACITY_UP:
                animateOpacityUp.apply(this, animateArguments);
                break;
            case ANIMATE_NOW_OPACITY_DOWN:
                animateOpacityDown.apply(this, animateArguments);
                break;
            default:
                /* останавливаем анимацию. */
                return;
                break;
        }

        setTimeout(function () {
            animateNow();
            self.redraw();
        }, animateTimeout);
    };

    var animateOpacityUp = function (target, from, step) {
        if (self.opacity < target) {
            self.opacity += step;
        } else {
            self.opacity = target;
            animateNowId = null;
        }
    };

    var animateOpacityDown = function (target, from, step) {
        if (self.opacity > target) {
            self.opacity -= step;
        } else {
            self.opacity = target;
            animateNowId = null;
        }
    };

    /**
     * Прицепляем событие.
     * @param eventId
     * @param callback
     * @param context
     */
    this.bind = function (eventId, callback, context) {
        var eventName;
        eventName = GUI.eventNames[eventId];
        if (!eventName) {
            Logs.log("undefined gui eventId:" + eventId, Logs.LEVEL_FATAL_ERROR);
        }
        dom.addEventListener(eventName, function (event) {
            callback.call(context, event, dom);
        }, false);
    };

    /* Далее идут методы перерисовки. */
    var redrawX = function () {
        dom.style.left = self.x + 'px';
    };
    var redrawY = function () {
        dom.style.top = self.y + 'px';
    };
    var redrawWidth = function () {
        dom.style.width = self.width + 'px';
    };
    var redrawHeight = function () {
        dom.style.height = self.height + 'px';
    };
    var redrawBackgroundImage = function () {
        var url;
        /* Если размер не задан, пробуем задать его автоматически. */
        if (!self.width && !self.height && window.imagesData[self.backgroundImage]) {
            self.width = window.imagesData[self.backgroundImage].w;
            self.height = window.imagesData[self.backgroundImage].h;
            props.height.call();
            props.width.call();
        }
        /* абсолютный url, используем без изменений */
        if (self.backgroundImage.indexOf('https://') != 0 && self.backgroundImage.indexOf('http://') != 0) {
            url = GUI.getImageURL(self.backgroundImage);
        } else {
            url = self.backgroundImage;
        }
        if (GUIDom.hidePictures) {
            if (GUIDom.makeTransparent) {
                dom.style.backgroundImage = 'url(' + url + ')';
            } else {
                dom.style.fontSize = '10px';
                url = url.replace('/images/', '');
                dom.innerHTML = url.substr(url.indexOf('/') + 1, url.indexOf('.') - url.indexOf('/') - 1);
            }
        } else {
            dom.style.backgroundImage = 'url(' + url + ')';
        }
    };
    var redrawBackgroundSize = function () {
        dom.style.backgroundSize = self.backgroundSize + 'px';
    };
    var redrawInnerHTML = function () {
        if (GUIDom.hidePictures) {
            dom.innerHTML = self.innerHTML;
        } else {
            dom.innerHTML = self.innerHTML;
        }
    };
    var redrawPointer = function () {
        dom.style.cursor = self.pointer;
    };
    var redrawOpacity = function () {
        dom.style.opacity = self.opacity;
    };
    var redrawFontWeight = function () {
        dom.style.fontWeight = self.fontWeight;
    };
    var redrawFontSize = function () {
        dom.style.fontSize = self.fontSize;
    };
    var redrawFontFamily = function () {
        dom.style.fontFamily = self.fontFamily;
    };
    var redrawColor = function () {
        dom.style.color = self.color;
    };
    var redrawTextShadow = function () {
        dom.style.textShadow = self.textShadow;
    };
    var redrawBorderRadius = function () {
        dom.style.borderRadius = self.borderRadius;
    };
    var redrawBorder = function () {
        dom.style.border = self.border;
    };
    var redrawBorderTop = function () {
        dom.style.borderTop = self.borderTop;
    };
    var redrawBorderRight = function () {
        dom.style.borderRight = self.borderRight;
    };
    var redrawBorderBottom = function () {
        dom.style.borderBottom = self.borderBottom;
    };
    var redrawBorderLeft = function () {
        dom.style.borderLeft = self.borderLeft;
    };
    var redrawPadding = function () {
        dom.style.padding = self.padding;
    };
    var redrawBoxShadow = function () {
        dom.style.boxShadow = self.boxShadow;
    };
    var redrawLineHeight = function () {
        dom.style.lineHeight = self.lineHeight;
    };
    var redrawBackground = function () {
        dom.style.background = self.background;
    };
    var redrawTransform = function () {
        dom.style.transform = self.transform;
    };
    var redrawTitle = function () {
        dom.setAttribute('title', self.title);
    };
    var redrawIsItSepia = function () {
        /*
         filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'old-timey\'><feColorMatrix type=\'matrix\' values=\'0.14 0.45 0.05 0 0 0.12 0.39 0.04 0 0 0.08 0.28 0.03 0 0 0 0 0 1 0\'/></filter></svg>#old-timey");
         -webkit-filter: sepia(0.5);
         -webkit-filter: sepia(95%) grayscale(50%);
         -moz-filter: sepia(80%);
         -ms-filter: sepia(80%);
         -o-filter: sepia(80%);
         filter: sepia(80%);
         */
        dom.className += 'sepia';
    };
    var redrawAlignText = function () {
        dom.style.textAlign = self.alignText;
    };
    var redrawZIndex = function () {
        dom.style.zIndex = self.zIndex;
    };

    /**
     * Имена свойств и их методы обработки.
     * @type {{x: Function, y: Function, width: Function, height: Function, backgroundImage: *, innerHTML: Function, pointer: Function, opacity: Function, fontWeight: *, fontSize: *, fontFamily: Function, color: Function, textShadow: Function, borderRadius: Function, border: Function, borderTop: Function, borderRight: Function, borderBottom: Function, borderLeft: Function, padding: Function, boxShadow: Function, lineHeight: Function, background: Function, transform: Function, title: *}}
     */
    var props = {
        x: redrawX,
        y: redrawY,
        width: redrawWidth,
        height: redrawHeight,
        backgroundImage: redrawBackgroundImage,
        backgroundSize: redrawBackgroundSize,
        innerHTML: redrawInnerHTML,
        pointer: redrawPointer,
        opacity: redrawOpacity,
        fontWeight: redrawFontWeight,
        fontSize: redrawFontSize,
        fontFamily: redrawFontFamily,
        color: redrawColor,
        textShadow: redrawTextShadow,
        borderRadius: redrawBorderRadius,
        border: redrawBorder,
        borderTop: redrawBorderTop,
        borderRight: redrawBorderRight,
        borderBottom: redrawBorderBottom,
        borderLeft: redrawBorderLeft,
        padding: redrawPadding,
        boxShadow: redrawBoxShadow,
        lineHeight: redrawLineHeight,
        background: redrawBackground,
        transform: redrawTransform,
        title: redrawTitle,
        isItsepia: redrawIsItSepia,
        alignText: redrawAlignText,
        zIndex: redrawZIndex
    };
};

/**
 * Этот код определит нужно ли делать картинки невидимыми.
 * Это нужно для БоссМоуда на саммом деле :)
 * В результате мы установим GUIDom.hidePictures = [true|false].
 */
(function () {
    /* Распарсим по быстром url адрес. */
    var urlParams;
    (function () {
        var tmp1, tmp2;
        urlParams = {};
        url = window.location.href;
        tmp1 = url.substr(url.indexOf('?') + 1).split('&');
        for (var i in tmp1) {
            tmp = tmp1[i].split('=');
            urlParams[tmp[0]] = tmp[1];
        }
    })();
    /* Режим скрытых картинок */
    if (urlParams.hide_pictures && urlParams.hide_pictures == 'true') {
        GUIDom.hidePictures = true;
    } else {
        GUIDom.hidePictures = false;
    }
    if (urlParams.picture_opacities) {
        GUIDom.pictureOpacities = urlParams.picture_opacities;
    }
})();

/**
 * Уникальнгый id для каждогого дома, иногда нужна уникальность дома, для таймаутов например.
 * @type {number}
 */
GUIDom.lastId = 0;if(window["GUIDom"] != undefined){window["GUIDom"].__path="../client/components/base/GUIDom.js"};

/* components/base/Logs.js */
/**
 * Компонент логирования.
 * Клиент-серверный компонент!
 */
Logs = function () {
    var self = this;

    /**
     * Уровень срабатывания.
     * @type {number} Logs.LEVEL_*
     */
    var trigger_level = null;

    this.init = function (afterInitCallback) {
        trigger_level = Config.Logs.triggerLevel;
        afterInitCallback();
    };

    /**
     * Сюда и проходят логи.
     * @param message {string} сообщение.
     * @param level {int} тип Logs.LEVEL_*.
     * @param [details] {*} необязательный параметр, детали.
     */
    this.log = function (message, level, details) {
        var date, dateFormated, logText, levelTitle;
        // если не передан уровень, то считаем его детальным.
        if (!level) {
            level = Logs.LEVEL_DETAIL;
        }
        // если уровень лога ниже уровня срабатывания ничего не делаем.
        if (level < trigger_level)return;
        // сформируем сообщение лога.
        date = new Date();
        // тут мы получим "01-01-2014 15:55:55"
        var day, month, year, hour, minutes, seconds;
        year = date.getFullYear();
        day = str_pad(date.getDate());
        month = str_pad(date.getMonth() + 1);
        hour = str_pad(date.getHours());
        minutes = str_pad(date.getMinutes());
        seconds = str_pad(date.getSeconds());
        dateFormated = day + '-' + month + '-' + year + ' ' + hour + ':' + minutes + ':' + seconds;
        // превратим в строку переданные детали лога.
        details = JSON.stringify(details);
        // превратим уровень лога из константы в человеко-читаемый текст.
        levelTitle = typeTitles[level];
        // соединим время, текст уровня лога и сообщение лога в одну строку
        logText = dateFormated + ' ' + levelTitle + ' ' + message;
        // добавим к тексту лога детали, если они были переданы
        if (details) logText += ' ' + details;
        // выведем на экран
        console.log(logText);
        // если это фатальная ошибка - завершим работу программы.
        if (level == Logs.LEVEL_FATAL_ERROR) {
            throw new Error("Vse polamalos'!");
        }
    };

    /**
     * Дополним нулями значение и вернёт строку
     * Тут это специфичная функция, дополнит нулями число спереди до 2ух знаков.
     * @param sourceValue {Mixed}
     */
    var str_pad = function (sourceValue) {
        return "00000".substr(0, 2 - sourceValue.toString().length) + sourceValue;
    };

    this.setLevel = function (level) {
        trigger_level = level;
    };

    /* константы типов логов */

    /**
     * Детально.
     */
    this.LEVEL_DETAIL = 1;

    /**
     * Оповещение.
     */
    this.LEVEL_NOTIFY = 2;

    /**
     * Внимание.
     */
    this.LEVEL_WARNING = 3;

    /**
     * Ошибка.
     */
    this.LEVEL_ERROR = 4;

    /**
     * Фатальная ошибка.
     */
    this.LEVEL_FATAL_ERROR = 5;

    var typeTitles = {};
    /* человеко-читаемые типы логов. */
    typeTitles[this.LEVEL_DETAIL] = 'detail';
    typeTitles[this.LEVEL_NOTIFY] = 'notify';
    typeTitles[this.LEVEL_WARNING] = 'warning';
    typeTitles[this.LEVEL_ERROR] = 'error';
    typeTitles[this.LEVEL_FATAL_ERROR] = 'fatal error';
};
/**
 * Статичный класс.
 * @type {Logs}
 */
Logs = new Logs();if(window["Logs"] != undefined){window["Logs"].__path="components/base/Logs.js"};

/* ../client/components/base/PageController.js */
/**
 * Контроллер страниц.
 * @constructor
 */
PageController = function () {
    var self = this;
    /**
     * Все страницы.
     * @type {Array}
     */
    var pages = [];

    /**
     * Id отображенных в данный момент страниц.
     * @type {Array}
     */
    var currentShowedPageIds = [];

    /**
     * Добавляет страницу.
     * @param id {Number} id PageController.PAGE_ID_*
     * @param page {object} страница.
     */
    this.addPage = function (id, page) {
        pages[id] = page;
        if (!page.init) {
            Logs.log("PageController.addPage. page must have method init(). Page constructor:" + page.constructorName, Logs.LEVEL_FATAL_ERROR);
        }
        if (!page.show) {
            Logs.log("PageController.addPage. page must have method show(). Page constructor:" + page.constructorName, Logs.LEVEL_FATAL_ERROR);
        }
        if (!page.hide) {
            Logs.log("PageController.addPage. page must have method hide(). Page constructor:" + page.constructorName, Logs.LEVEL_FATAL_ERROR);
        }
        if (!page.redraw) {
            Logs.log("PageController.addPage. page must have method redraw(). Page constructor:" + page.constructorName, Logs.LEVEL_FATAL_ERROR);
        }
        page.init();
    };

    /**
     * Показать страницу, все остальные скрыть.
     * @param idToShowList {Array}
     */
    this.showPages = function (idToShowList) {
        Logs.log("Pages to show:" + idToShowList.toString(), Logs.LEVEL_DETAIL);
        var tmp = [];
        for (var i in idToShowList) {
            tmp[idToShowList[i]] = idToShowList[i];
        }
        idToShowList = tmp;
        /* show pages */
        for (var id in idToShowList) {
            pages[id].show();
        }
        /* hide all other */
        for (var id in pages) {
            if (tmp[id])continue;
            pages[id].hide();
        }
        currentShowedPageIds = idToShowList;
        self.redraw();
    };

    /**
     * Вызывает редрей всех активных страниц.
     */
    this.redraw = function () {
        for (var id in pages) {
            pages[id].redraw();
        }
    };

    /**
     * Показаны ли сейчас эта страница.
     * @param pageId {Number} id Страницы.
     */
    this.isShowedNow = function (pageId) {
        for (var i in currentShowedPageIds) {
            if (pageId == currentShowedPageIds[i]) {
                return true;
            }
        }
        return false;
    };

    this.currentPageIds = function () {
        var out = [];
        currentShowedPageIds.forEach(function (isShowed, id) {
            if (isShowed) {
                out.push(id);
            }
        });
        return out;
    };
};if(window["PageController"] != undefined){window["PageController"].__path="../client/components/base/PageController.js"};

/* ../client/components/base/Profiler.js */
/**
 * Dummy.
 * @constructor
 */
Profiler = function () {
    var self = this;

    this.start = function (id) {

    };

    this.stop = function (id) {

    };

    this.getNewId = function (title) {

    };

    this.printReport = function () {

    };

    this.saveToDB = function () {

    };

    this.getTextReport = function () {

    };

    this.init = function (afterInitCallback) {

    };
};

/**
 * ��������� �����.
 * @type {Profiler}
 */
Profiler = new Profiler();if(window["Profiler"] != undefined){window["Profiler"].__path="../client/components/base/Profiler.js"};

/* components/base/SocNet.js */
/**
 * Компонент для работы с социальной сетью.
 * @constructor
 */

// только для сервера, хм...
if (typeof window == 'undefined') {
    var MD5 = require('MD5');
    var HTTPS = require('https');
}

SocNet = function () {
    var baseHost = 'api.vk.com';
    var baseUrl = '/method/';
    var self = this;
    var getParams = {};

    this.parseSocNetURL = function () {
        getParams = {
            viewer_id: getQueryVariable('viewer_id'),
            api_id: getQueryVariable('api_id'),
            auth_key: getQueryVariable('auth_key'),
            secret: getQueryVariable('secret'),
            access_token: getQueryVariable('access_token')
        };
        /* Other possible GET params from VK
         api_url:http://api.vk.com/api.php
         api_id:4467180
         api_settings:8199
         viewer_id:12578187
         viewer_type:0
         sid:c57ce42cb7fefaf59d1456800cdc86a9c732b7d9e99a84cc6e00147150fd3d34532c97317c695edfdcb7c
         secret:3704c9427d
         access_token:4fe7830d6ecd2eeac26cc5a3d009fa1dcf6cb268765347fcda81f97405817420835122f29cf5834afbedf
         user_id:0
         group_id:0
         is_app_user:1
         auth_key:1bb91dabd1b8e7913c3ebb052f7d2a39
         language:0
         parent_language:0
         ad_info:ElsdCQBeRFJsBAxcAwJSXHt5C0Q8HTJXUVBBJRVBNwoIFjI2HA8E
         is_secure:0
         ads_app_id:4467180_e18d649ad35faed323
         referrer:unknown
         lc_name:fe8f8c15
         hash:;
         */
    };

    this.getAuthParams = function () {
        /*	auth_key = md5(app_id+'_'+viewer_id+'_'+app_secret); */
        return {
            authKey: getParams.auth_key,
            appId: getParams.api_id
        };
    };

    this.getSocNetUserId = function () {
        return getParams.viewer_id;
    };

    this.getSocNetTypeId = function () {
        return SocNet.TYPE_VK;
    };

    /**
     * Получить список друзей из соц сети.
     * @param socNetTypeId {Number} id социальной сети SoNet.TYPE_*
     * @param socNetUserId {Number} id юзера, в социальной сети.
     * @param callback {Function}
     */
    this.getFriends = function (socNetTypeId, socNetUserId, callback) {
        executeMethod('friends.get', {user_id: socNetUserId}, callback);
    };

    /**
     * Получит
     * @param socNetTypeId
     * @param socNetUserId
     * @param callback
     */
    this.getUserInfo = function (socNetTypeId, socNetUserId, callback) {
        executeMethod('users.get', {user_ids: socNetUserId, fields: 'photo_50,sex', https: 1}, function (source) {
                var info;
                info = {};
                info.firstName = source[0].first_name;
                info.lastName = source[0].last_name;
                info.photo50 = source[0].photo_50;
                switch (source.sex) {
                    case 1:
                        info.sex = SocNet.SEX_WOMAN;
                        break;
                    case 2:
                        info.sex = SocNet.SEX_MAN;
                        break;
                    default:
                        info.sex = SocNet.SEX_UNKNOWN;
                        break;
                }
                callback(info);
            }
        )
    };

    /**
     * Проверка авторизации
     * @param socNetTypeId тип социальной сети SocNet.TYPE_*
     * @param socNetUserId id в социальной сети.
     * @param authParams специфичные для соц.сети данные проверки м.
     * @returns {boolean} результат аутентификации.
     */
    this.checkAuth = function (socNetTypeId, socNetUserId, authParams) {
        var generatedAuthKey;
        /*	auth_key = md5(app_id+'_'+viewer_id+'_'+app_secret); */
        generatedAuthKey = MD5(authParams.appId + '_' + socNetUserId + '_' + Config.SocNet.secretKey);
        return generatedAuthKey == authParams.authKey;
    };

    var getQueryVariable = function (variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        Logs.log('Query Variable ' + variable + ' not found', Logs.LEVEL_WARNING);
    };

    /**
     * Выполнить метод для соц сети. вКонтакте.
     * @param method {String}
     * @param params {Object}
     * @param callback {Function}
     */
    var executeMethod = function (method, params, callback) {
        var url, options, req, key, data;
        /* https://api.vk.com/method/'''METHOD_NAME'''?'''PARAMETERS'''&access_token='''ACCESS_TOKEN''' */
        url = baseUrl + method + '?';
        for (var i in params) {
            url += '&' + i + '=' + params[i];
        }
        options = {};
        options.hostname = baseHost;
        options.port = 443;
        options.path = url;
        options.method = 'GET';
        Logs.log("https request: " + baseHost + url, Logs.LEVEL_DETAIL);
        key = baseHost + url;
        if (data = UrlCache.get(key)) {
            Logs.log("https answer(cached): " + data, Logs.LEVEL_DETAIL);
            callback(data);
            return;
        }
        /* Далее выполняем запрос */
        req = HTTPS.request(options, function (res) {
            res.on('data', function (data) {
                Logs.log("https answer: " + data, Logs.LEVEL_DETAIL);
                try {
                    data = JSON.parse(data);
                    data = data.response;
                    UrlCache.set(key, data);
                    callback(data);
                } catch (e) {
                    Logs.log("JSON.parse error", Logs.LEVEL_ERROR, data);
                }
            });
        });
        req.end();
        req.on('error', function (e) {
            Logs.log("SocNet.executeMethod request error:", Logs.LEVEL_ERROR, e);
        });
    };

    /**
     * Возвращает url на профиль пользователя в социальной сети.
     * @param socNetTypeId {Number} id социальной сети SocNet.TYPE_*
     * @param socNetUserId {Number} id пользователя в соц.сети.
     * @returns {string} url на профиль пользователя в соц.сети.
     */
    this.getUserProfileUrl = function (socNetTypeId, socNetUserId) {
        return 'http://vk.com/id' + socNetUserId;
    };

    /**
     * Открыть диалог приглашения друзей.
     * @returns {boolean}
     */
    this.openInviteFriendDialog = function () {
        VK.callMethod('showInviteBox');
    };

    /**
     * Инициализация VK.
     * @see WebSocketServer : var loadClientCode {Function}
     */
    this.initVK = function () {
        var apiVersoin, onSuccess, onFail, apiVersion;
        apiVersion = '5.28';
        onSuccess = function () {
            Logs.log("VK client API inited.", Logs.LEVEL_NOTIFY);
        };
        onFail = function () {
            // @todo send fail to server? may be...
            alert('Произошла ошибка доступа к вКонтакте, обратитесь к автору приложения.');
        };
        VK.init(onSuccess, onFail, apiVersion);
    }
};
/**
 * Статичный класс.
 * @type {SocNet}
 */
SocNet = new SocNet();
/**
 * Тип социальной сети, вКонтакте.
 * @type {number}
 */
SocNet.TYPE_VK = 1;
/**
 * Константа пол: неизвестен\неустановлен.
 * @type {number}
 */
SocNet.SEX_UNKNOWN = 1;
/**
 * Константа пол: женский.
 * @type {number}
 */
SocNet.SEX_WOMAN = 2;
/**
 * Константа пол: мужской
 * @type {number}
 */
SocNet.SEX_MAN = 3;
if(window["SocNet"] != undefined){window["SocNet"].__path="components/base/SocNet.js"};

/* ../client/components/base/Sounds.js */
Sounds = function () {
    var self = this;

    var cache = {};

    this.enabled = true;

    this.on = function () {
        self.enabled = true;
    };

    this.off = function () {
        self.enabled = false;
    };

    this.play = function (path) {
        if (!self.enabled) {
            return;
        }
        if (!cache[path]) {
            cache[path] = new Audio(path + "?t=" + time());
        }
        cache[path].play();
    };
};

Sounds = new Sounds;if(window["Sounds"] != undefined){window["Sounds"].__path="../client/components/base/Sounds.js"};

/* ../client/components/base/WebSocketClient.js */
/**
 * Компонент обеспечивающий соединение с сервером.
 * @constructor
 */
WebSocketClient = function () {
    var self = this;

    /**
     * Хост сервера.
     * @type {string}
     */
    var host = null;

    /**
     * Порт сервера.
     * @type {int}
     */
    var port = null;

    /**
     * Протокол соединения.
     * ws|wss
     * @type {string}
     */
    var protocol = null;

    /**
     * id соединиения.
     * Если вдруг у нас несколько соединений.
     * @type {null}
     */
    var connectionId = null;

    this.init = function (afterInitCallback) {
        port = Config.WebSocketClient.port;
        host = Config.WebSocketClient.host;
        protocol = Config.WebSocketClient.protocol;
        afterInitCallback();
    };
    this.onData = null;
    this.onConnect = null;
    this.onDisconnect = null;

    /**
     * Сюда мы будем получать данные и отправлять их на сервер.
     * Примечание: Однако, если соединения с серверм нет, то мы будем просто добавлять их в буффер.
     * @param data string
     */
    this.sendData = function (data) {
        packetBuffer.push(data);
        setTimeout(trySend, 50);
        return true;
    };

    /**
     * Просто выполним инициализацию.
     * Собсвтено подсоединимся к серверу.
     */
    this.run = function () {
        checkBeforeInit();
        init();
    };
    var checkBeforeInit = function () {
        if (typeof  self.onConnect != 'function') {
            Logs.log("onConnect must be function", Logs.LEVEL_FATAL_ERROR, self.onConnect);
        }
        if (typeof  self.onDisconnect != 'function') {
            Logs.log("onConnect must be function", Logs.LEVEL_FATAL_ERROR, self.onDisconnect);
        }
        if (typeof  self.onData != 'function') {
            Logs.log("onConnect must be function", Logs.LEVEL_FATAL_ERROR, self.onData);
        }
    };

    /**
     * Состояние соединения:
     * true - соединение активно
     * false - нет соединения.
     */
    var isConnected = false;

    /**
     * Буфер пакетов данных.
     * Впервую очередь все данные попадают сюда, а уже потом отправляются.
     * На случай, если нет соединения сейчас, но оно появиться потом.
     */
    var packetBuffer = [];

    /**
     * Собственно сокет.
     * @type {null}
     */
    var socket = null;

    /**
     * Инициалиизация.
     * Создадим объект клиента
     * Установим обработчики.
     */
    var init = function () {
        Logs.log("WebSocketClient запущен.");
        connect();
    };

    /**
     * Реализовать коннект.
     */
    var connect = function () {
        var uri;
        uri = protocol + "://" + host + ":" + port + "/";
        Logs.log("WebSocket URL=`" + uri + "`", Logs.LEVEL_DETAIL);
        socket = new WebSocket(uri);
        /* установим обработчики. */
        socket.onopen = onOpen;
        socket.onclose = onClose;
        socket.onmessage = onMessage;
        socket.onerror = onError;
    };

    /**
     * Обработчик при открытии соединения.
     */
    var onOpen = function () {
        isConnected = true;
        /* На случай, если буфер не пуст. */
        trySend();
        Logs.log("WebSocketClient: Соединение установленно:" + host + ':' + port);
        connectionId = ++WebSocketClient.connectionId;
        self.onConnect(connectionId);
    };

    /**
     * Обработчик при закрытие соединения.
     * @param event
     */
    var onClose = function (event) {
        isConnected = false;
        if (event.wasClean) {
            Logs.log("WebSocketClient: Соединение закрыто успешно.");
        } else {
            Logs.log("WebSocketClient: Соединение закрыто, отсутствует соединение.");
        }
        Logs.log('WebSocketClient: Код: ' + event.code + ' причина: ' + event.reason);
        self.onDisconnect(connectionId);
        setTimeout(tryReconnect, 1000);
    };

    var tryReconnect = function () {
        if (isConnected == false) {
            Logs.log('Try reconnect', Logs.LEVEL_NOTIFY);
            connect();
            /* Попытка реконнетка, через некоторое время */
            setTimeout(tryReconnect, 30000);
        }
    };

    /**
     * Обработчик при получении данных(сообщения) от сервера.
     * @param event
     */
    var onMessage = function (event) {
        /* Logs.log("WebSocketClient: Получены данные.", Logs.LEVEL_DETAIL, event.data); */
        self.onData(event.data, connectionId);
    };

    /**
     * Обработчик ошибок вебсокета.
     * @param error
     */
    var onError = function (error) {
        Logs.log("WebSocketClient: Ошибка " + error.message);
    };

    /**
     * Отправка данных из буфера.
     * Если нет данных в буфере возвращаемся.
     * Если нет соединения, то пробуем отправить их позже.
     * Берем пакет из буфера, удаляе его из буфера.
     * Отправляем пакет на сервер.
     * Если в буфере еще есть данные, пробуем их отправить позже.
     */
    var trySend = function () {
        var data;
        // если буфер пуст - уходим.
        if (!packetBuffer.length) {
            return;
        }
        /* Если нет соединения пробуем позже. */
        if (!isConnected) {
            setTimeout(trySend, self.trySendTimeout);
            return;
        }
        /* Берем элемент из буфера. */
        data = packetBuffer.shift();
        socket.send(data);
        /* Logs.log("WebSocketClient.send data: length=" + data.length, Logs.LEVEL_DETAIL); */
        /* Остальные данные отправим позже. */
        if (packetBuffer.length) {
            setTimeout(trySend, self.trySendTimeout);
        }
    };
};

/**
 * По сути это просто номер соединения в пределах жизни скрипта.
 */
WebSocketClient.connectionId = 0;if(window["WebSocketClient"] != undefined){window["WebSocketClient"].__path="../client/components/base/WebSocketClient.js"};

/* ../client/Config.cs19421.js */
Config = {
    Invites: {
        inviteTimeout: 1000 * (60),
        letsPlaytimeout: 1000 * (60 - 2)
    },
    Logs: {
        triggerLevel: Logs.LEVEL_NOTIFY
    },
    WebSocketClient: {
        host: 'ssl.krestiki-noliki.net',
        port: 443,
        protocol: 'wss'
    },
    ElementCardInfo: {
        hideTimeout: 475
    }
};if(window["Config.cs19421"] != undefined){window["Config.cs19421"].__path="../client/Config.cs19421.js"};

/* ../client//run.js */
window.onload = function () {
    Logs.log('OnLoad raized', Logs.LEVEL_NOTIFY);
    /* Эмуляция совместимости клиентского и серверного кода. */
    GLOBAL = window;
    process = {};
    process.exit = function () {
        console.log("Внезапное завершение работы!");
        document.body.innerHTML = 'Всё поламалось!';
        throw new Error("Всё поламалось!");
    };
    Logs.init(function () {
    });

    /** init some cpomopnents */
    SocNet.initVK();
    GUI.init();

    /* WebSocket Client */
    webSocketClient = new WebSocketClient();
    webSocketClient.init(function () {
    });

    /* ApiRouterMetrics */
    ApiRouterMetrics.setup({
        SAPIUser: true,
        SAPIGame: true,
        SAPIChat: true,
        SAPIRobotGame: true,
        SAPIInvites: true,
        SAPIUserState: true,
        SAPIRating: true,
        SAPIRepeatGame: true,
        SAPIStatistic: true,

        CAPIChat: true,
        CAPIGame: true,
        CAPIInvites: true,
        CAPIRating: true,
        CAPIUser: true,
        CAPIUserState: true
    });
    /* setInterval(ApiRouterMetrics.printMetrics, 5000); */

    /* ApiRouter */
    apiRouter = new ApiRouter();
    apiRouter.setMap({
        CAPIUser: CAPIUser,
        CAPIGame: CAPIGame,
        CAPIChat: CAPIChat,
        CAPIInvites: CAPIInvites,
        CAPIUserState: CAPIUserState,
        CAPIRating: CAPIRating
    });

    /* Link ApiRouter and WebSocketClient */
    apiRouter.sendData = webSocketClient.sendData;
    webSocketClient.onData = apiRouter.onData;
    webSocketClient.onConnect = function (connectionId) {
        apiRouter.onConnect(connectionId);
        LogicUser.authorize();
    };
    webSocketClient.onDisconnect = apiRouter.onDisconnect;

    /* PageController */
    pageController = new PageController;
    PageController.PAGE_ID_BACKGROUND = 1;
    pageController.addPage(PageController.PAGE_ID_BACKGROUND, new PageBackground());
    PageController.PAGE_ID_ONLINE_SCORE = 2;
    pageController.addPage(PageController.PAGE_ID_ONLINE_SCORE, new PageOnlineScore());
    PageController.PAGE_ID_MAIN = 3;
    pageController.addPage(PageController.PAGE_ID_MAIN, new PageMain());
    PageController.PAGE_ID_XO_GAME = 4;
    pageController.addPage(PageController.PAGE_ID_XO_GAME, new PageXOGame());
    PageController.PAGE_ID_RATING = 5;
    pageController.addPage(PageController.PAGE_ID_RATING, new PageRating());
    PageController.PAGE_ID_CHAT = 6;
    pageController.addPage(PageController.PAGE_ID_CHAT, new PageChat());
    PageController.PAGE_ID_HELP = 7;
    pageController.addPage(PageController.PAGE_ID_HELP, new PageHelp());
    PageController.PAGE_ID_HELP_MAIN_MENU = 8;
    pageController.addPage(PageController.PAGE_ID_HELP_MAIN_MENU, new PageHelpMainMenu());
    PageController.PAGE_ID_HELP_RATING = 9;
    pageController.addPage(PageController.PAGE_ID_HELP_RATING, new PageHelpRating());
    PageController.PAGE_ID_HELP_RULES = 10;
    pageController.addPage(PageController.PAGE_ID_HELP_RULES, new PageHelpRules());

    pageController.showPages([PageController.PAGE_ID_BACKGROUND, PageController.PAGE_ID_CHAT, PageController.PAGE_ID_ONLINE_SCORE, PageController.PAGE_ID_MAIN]);

    /* client specific code */
    SocNet.parseSocNetURL();

    /* running */
    webSocketClient.run();
};
if(window["run"] != undefined){window["run"].__path="../client//run.js"};
