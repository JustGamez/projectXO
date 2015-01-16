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

    /**
     * Создадим нужные нам элементы\домы.
     */
    this.init = function () {
        var row, rowHeight;
        /**
         * Какой высоты считаем строку.
         * @type {number}
         */
        rowHeight = 80;
        for (var i = 0; i < self.rowsCount; i++) {
            row = {};
            row.photo = GUI.createElement('ElementPhoto', {
                x: self.x + 1,
                y: self.y + i * (self.rowSpacing + rowHeight)
            });
            row.name = GUI.createElement('ElementGraphicText', {
                x: self.x + 131,
                y: self.y + i * (self.rowSpacing + rowHeight) + 25,
                width: 220,
                height: 40,
                text: ' - '
            });
            row.score = GUI.createElement('ElementGraphicText', {
                x: self.x + 450,
                y: self.y + i * (self.rowSpacing + rowHeight) + 25,
                width: 50,
                height: 40,
                text: '-'
            });
            row.position = GUI.createElement('ElementGraphicText', {
                x: self.x + 550,
                y: self.y + i * (self.rowSpacing + rowHeight) + 25,
                width: 50,
                height: 40,
                text: '-'
            });
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
            rowsElements[i].photo.hide();
            rowsElements[i].name.hide();
            rowsElements[i].score.hide();
            rowsElements[i].position.hide();
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
                elements.score.setText(data.score);
                elements.position.setText(data.position);
                /* Перерисуем */
                elements.photo.show();
                elements.name.show();
                elements.score.show();
                elements.position.show();
                elements.photo.redraw();
                elements.name.redraw();
                elements.score.redraw();
                elements.position.redraw();
            } else {
                elements.photo.hide();
                elements.name.hide();
                elements.score.hide();
                elements.position.hide();
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
            users[i].score = users[i].score ? users[i].score.toString() : '-';
            users[i].position = users[i].position ? users[i].position.toString() : '-';
        }
        rowsData = users;
        self.redraw();
    };
};