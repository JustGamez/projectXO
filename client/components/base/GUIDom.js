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
 */
GUIDom = function () {
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
        this.showed = false;
        dom.style.position = 'absolute';
        /* hidden mode..:begin*/
        if (GUIDom.hidePictures) {
            dom.style.opacity = 0.05;
            dom.style.border = '1px solid black';
        }
        /* hidden mode..:finish*/
        /* no dragable by default */
        dom.ondragstart = function () {
            return false;
        };
        document.body.appendChild(dom);
    };

    this.show = function () {
        this.showed = true;
    };

    this.hide = function () {
        this.showed = false;
    };

    this.redraw = function () {
        if (!this.showed) {
            dom.style.display = 'none';
        } else {
            if (this.x)dom.style.left = this.x + 'px';
            if (this.y)dom.style.top = this.y + 'px';
            if (this.width)dom.style.width = this.width + 'px';
            if (this.height)dom.style.height = this.height + 'px';
            if (this.backgroundImage)dom.style.backgroundImage = 'url(' + GUI.getImageURL(this.backgroundImage) + ')';
            if (this.innerHTML)dom.innerHTML = this.innerHTML;
            dom.style.display = 'block';
        }
    };
    /**
     * Прицепляем событие.
     * @param eventId
     * @param callback
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