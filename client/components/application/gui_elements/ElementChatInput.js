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
        dom.setFocus();
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
};