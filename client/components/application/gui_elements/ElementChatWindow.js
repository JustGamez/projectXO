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
        dom.lineHeight = 0.945;
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
        var isAdmin;
        Config.admin.ids.forEach(function (id) {
            if (LogicUser.getCurrentUser().id == id) isAdmin = true;
        });
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
                if (isAdmin) {
                    text += "<b style='cursor:hand;' onclick='LogicPageChat.onChatDelete(" + message.id + ")'> x </b>";
                }
                text += message.timeHours + ":" + message.timeMinutes + ":" + message.timeSeconds + " ";
                text += "</b>";
                text += "<b onclick='LogicPageChat.onNameClick(" + message.userId + ");' style='cursor:hand;font-size:13px;letter-spacing:-2px;font-weight:normal;opacity:0.78;' title='" + user.firstName + " " + user.lastName + "' >";
                text += user.firstName;
                text += " " + user.lastName.charAt(0) + ".";
                text += " ";
                text += "</b>";
                text += " " + message.text;
                text += "<br>";
            }
        }
        if (messages.length == 0) {
            text += "<br><br>";
            text += "<div style='text-align: center;'>";
            text += "<b style='font-size:12pt;letter-spacing:-2px;font-weight:normal;opacity:0.71;'>Здесь будет выводиться переписка.</b>";
            text += "</div>";
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
            inMessages[i].timeHours = new Date(inMessages[i].timestamp).getHours();
            inMessages[i].timeMinutes = new Date(inMessages[i].timestamp).getMinutes();
            inMessages[i].timeSeconds = new Date(inMessages[i].timestamp).getSeconds();
        }
        messages = inMessages;
        self.redraw();
    }
};