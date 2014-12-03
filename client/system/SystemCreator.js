/**
 * Системный компонент.
 * Клиент-серверный компонент!
 */
SystemCreator = function () {
    /**
     * Плата, тут будут элементы.
     */
    var board = {
        elements: {}
    };
    /**
     * Согласно схеме:
     * - создадим элементы;
     * - спаяем элементы;
     * - настроем элементы;
     * - и включим питание.
     */
    this.run = function () {
        // создадим компоненты
        createElements();
        // настроим компоненты
        setupElements();
        // спаяем элементы
        solderElements();
        // включим питание элементов
        switchOnElements();
    };
    /**
     * Запускаем тестовый режим.
     */
    this.runTest = function () {
        this.run();

    };
    /**
     * Создадим все элементы согласно схеме.
     */
    var createElements = function () {
        var params, element;
        log("Создание элементов.");
        // создаем элементы.
        for (var n in BoardScheme) {
            var elementDescription = BoardScheme[n];
            validateElementDescription(elementDescription);
            // создаём элемент.
            element = new GLOBAL[elementDescription.component](elementDescription.configure);
            if (element.__name) {
                error("Элемент не должен иметь .__name. Элемент: ", elementDescription.name);
            }
            if (element.__component) {
                error("Элемент не должен иметь .__name. Элемент: ", elementDescription.name);
            }
            element.__name = elementDescription.name;
            element.__component = elementDescription.component;

            validateElement(element);

            board.elements[elementDescription.name] = element;
        }
    };
    /**
     * Проверяем элемент.
     * @param element
     */
    var validateElement = function (element) {
        var logDescription =
            "элемент:" + element.__name + "\r\n" +
            "компонент:" + element.__component + "\r\n" +
            "файл:" + GLOBAL[element.__component].__path;

        for (var name in element) {
            if (name == '__name' && typeof element[name] == 'string')continue;
            if (name == '__component')continue;

            if (name.indexOf('in') == 0 && typeof element[name] == 'function')continue;
            if (name.indexOf('out') == 0)continue;

            if (name == 'setup' && typeof element[name] == 'function')continue;
            if (name == 'switchOn' && typeof element[name] == 'function')continue;
            if (name == 'switchOff' && typeof element[name] == 'function')continue;

            error("Свойство элемнта может быть:" +
                "\r\n" + "именем: __name и типом: string" +
                "\r\n" + "именем: __component и типом: string" +
                "\r\n" + "именем: in{Name} и типом: function" +
                "\r\n" + "именем: out{Name} и типом: mixed" +
                "\r\n" + "именем: setup{Name} и типом: function" +
                "\r\n" + "именем: switch{Name} и типом: function" +
                "\r\n" + "именем: switchOff{Name} и типом: function" +
                "\r\n" +
                "\r\n" + "имя свойства: " + name + " тип: " + typeof element[name] +
                "\r\n" + logDescription
            );
        }
    };
    /**
     * проверяем описание элемента в схеме
     * @param description
     */
    var validateElementDescription = function (description) {
        var logDescription = "элемент:" + description.name + "\r\n" +
            "компонент:" + description.component + "\r\n" +
            "файл:" + GLOBAL[description.component].__path;
        if (!description.name) {
            error("Элемент описнаия схемы должен иметь свойство: name.\r\n" + logDescription);

        }
        if (!description.component) {
            error("Элемент описнаия схемы должен иметь свойство: component.\r\n" + logDescription);
        }
        if (!description.setup) {
            error("Элемент описнаия схемы должен иметь свойство: setup.\r\n" + logDescription);
        }
        if (!description.soldering) {
            error("Элемент описнаия схемы должен иметь свойство: soldering.\r\n" + logDescription);
        }
        // проверяем возможность создать элемент.
        if (!GLOBAL[description.component]) {
            error("Нельзя создать элемент. Нет компонента. Компонент:" + description.component);
        }
        if (board.elements[description.name]) {
            error("Нельзя создать элемент. Элемент с таким именем уже существует. Компонент:" + description.component);
        }
    };

    /**
     * Спаиваем элементы согласно схеме.
     */
    var solderElements = function () {
        var outElement, inPin, inElement;
        var inPath, outPath;

        log("Спаиваем элементы.");
        for (var i in BoardScheme) {
            for (var outPin in BoardScheme[i].soldering) {
                outPath = {
                    element: BoardScheme[i].name,
                    pin: outPin
                };
                inPath = parsePinPath(BoardScheme[i].soldering[outPin], "\r\nэлемент: " + BoardScheme[i].name +
                "\r\nпин: " + BoardScheme[i].soldering[outPin]);

                // проверка пин-путей
                validatePinPath(outPath, 'out', "Спайка элемента:" + BoardScheme[i].name);
                validatePinPath(inPath, 'in', "Спайка элемента:" + BoardScheme[i].name);

                // собствено спайка
                board.elements[outPath.element][outPath.pin] = board.elements[inPath.element][inPath.pin];
            }
        }
    };
    /**
     * Настройка элементов.
     */
    var setupElements = function () {
        log("Настройка элементов.");
        // выполняем настройку компонента.
        for (var i in BoardScheme) {
            var name = BoardScheme[i].name;
            if (board.elements[name].setup) {
                board.elements[name].setup(BoardScheme[i].setup);
            }
        }
    };
    /**
     * Включаем питание.
     */
    var switchOnElements = function () {
        log("Включаем элементы.");
        for (var i in board.elements) {
            if (board.elements[i].switchOn) {
                board.elements[i].switchOn();
            }
        }
    };
    /**
     * Парсинг пути к пину.
     * Разбирает путь пина, вида elementName.pinName в массив из двух элементов.
     * @param pinPath путь к пину, вида elementName.pinName
     * @param whereMessage сообщение описывающие, где мы производим парсинг, это нужно для логирования ошибок.
     * @returns Array массив, первое значение - имя элемента, второе значение - имя пина.
     */
    var parsePinPath = function (pinPath, whereMessage) {
        if (typeof pinPath != "string") {
            // имя элемента, пин выход, пин вход.
            error("Пин-путь должен иметь тип string." + whereMessage);
        }
        pinPath = pinPath.split('.');
        if (pinPath.length != 2) {
            error("Пин-путь должен иметь вид:'elementName.pinName." + whereMessage);
        }
        return {
            element: pinPath[0],
            pin: pinPath[1]
        };
    };
    /**
     * Проверка пин-пути.
     */
    var validatePinPath = function (pinPath, direction, whereMessage) {
        if (!board.elements[pinPath.element]) {
            error("Элемент не найден." + pinPath.element + "." + whereMessage);
        }
        if (direction == 'in' && !pinPath.pin.match(/^in.*/)) {
            error("Пин должен начинаться на in:" +
                "\r\nпин: " + pinPath.element + '.' + pinPath.pin +
                "\r\n" + whereMessage
            );
        }
        if (direction == 'out' && !pinPath.pin.match(/^out.*/)) {
            error("Пин должен начинаться на out:" +
                "\r\nпин: " + pinPath.element + '.' + pinPath.pin +
                "\r\n" + whereMessage
            );
        }
        if (board.elements[pinPath.element][pinPath.pin] === undefined) {
            error("Пин не найден." +
                "\r\n" + whereMessage +
                "\r\nпин: " + pinPath.element + '.' + pinPath.pin +
                "\r\nкомпонент:" + board.elements[pinPath.element].__component +
                "\r\nфайл компонента:" + GLOBAL[board.elements[pinPath.element].__component].__path +
                ""
            );
        }
    };
};