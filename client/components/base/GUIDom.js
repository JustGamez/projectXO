/**
 * Адаптация для работы с гуёй. В данном случае это браузер.
 * Все запросы к гуи должны быть реализованы тут. и тут: GUIDom
 * @constructor
 * @property x {int}
 * @property y {int}
 * @property width {int}
 * @property height {int}
 * @property backgroundImage {url}
 * @property innerHTML {string}
 * @property pointer {GUI.POINTER_*}
 */
GUIDom = function () {
    var self = this;

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
     */
    this.init = function () {
        dom = document.createElement("div");
        dom.style.position = 'absolute';
        /* hidden mode..:begin*/
        if (GUIDom.hidePictures) {
            dom.style.opacity = 0.035;
            dom.style.border = '1px dotted grey';
        }
        /* hidden mode..:finish*/
        /* no dragable by default */
        dom.ondragstart = function () {
            return false;
        };
        this.__dom = dom;
        document.body.appendChild(dom);
    };

    /**
     * Покажем дом.
     */
    this.show = function () {
        if (showed == true)return;
        showed = true;
        dom.style.display = 'block';
        self.redraw();
    };

    /**
     * Спрячем дом.
     */
    this.hide = function () {
        if (showed == false)return;
        showed = false;
        dom.style.display = 'none';
    };

    /**
     * Перересовка дома.
     */
    this.redraw = function () {
        if (!showed)return;
        if (this.x)dom.style.left = this.x + 'px';
        if (this.y)dom.style.top = this.y + 'px';
        if (this.width)dom.style.width = this.width + 'px';
        if (this.height)dom.style.height = this.height + 'px';
        if (this.backgroundImage)dom.style.backgroundImage = 'url(' + GUI.getImageURL(this.backgroundImage) + ')';
        if (this.innerHTML)dom.innerHTML = this.innerHTML;
        if (this.pointer)dom.style.cursor = this.pointer;
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
        dom.addEventListener(eventName, function () {
            callback.call(context);
        }, false);
    };
};

/**
 * Этот код определит нужно ли делать картинки невидимыми.
 * Это нужно для БоссМоуда на саммом деле :)
 * В результате мы установим GUIDom.hidePictures = [true|false].
 */
(function () {
    if (window.location.href.indexOf("hide_pictures=true") != -1) {
        GUIDom.hidePictures = true;
    } else {
        GUIDom.hidePictures = false;
    }
})();