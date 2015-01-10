LogicRobot = function () {
    var self = this;

    /**
     * Состояние игр.
     * @type {Array}
     */
    var stateCache = [];

    /**
     * Проинициализируем данные робота для игры.
     * @param game {Object}
     */
    this.initState = function (game) {
        stateCache[game.id] = {};
        stateCache[game.id].lines = [];
        stateCache[game.id].fieldSize = LogicXO.getFieldSize(game.fieldTypeId);
        stateCache[game.id].lineSize = LogicXO.getLineSize(game.fieldTypeId);
    };

    /**
     * Сохранить поледний ход.
     * @param gameId {Number}
     * @param x {Number}
     * @param y {Number}
     */
    this.saveLastMove = function (gameId, x, y) {
        stateCache[gameId].lastMove = {x: x, y: y};
    };

    /**
     * Формирует данные для AI.
     * @param game {Object}
     */
    this.updateGameState = function (game) {
        var newLine, newLines, state, x, y;
        state = stateCache[game.id];
        if (state.lastMove == undefined)return;
        /* берем последний ход и ищем от него линии. */
        newLines = [];
        /**
         * Сканируем сам ход и все стоящие рядом,
         * так мы узнаем, не повлиял ли последний ход
         * на модификацию старых линий:
         *  _____
         * |*|*|*|
         * |*|X|*|
         * |*|*|*|
         * ------
         */
        for (var offsetX = -1; offsetX <= 1; offsetX++) {
            for (var offsetY = -1; offsetY <= 1; offsetY++) {
                x = state.lastMove.x + offsetX;
                y = state.lastMove.y + offsetY;
                /* Не будем выходить за пределы поля. */
                if (LogicXO.notInField(x, y, state.fieldSize)) {
                    continue;
                }
                /* Если ячейка пуста - пропускаем этот вариант. */
                if (game.field[y][x] == LogicXO.SIGN_ID_Empty) {
                    continue;
                }
                /*
                 * Похоже мы нашли не пустую ячейку,
                 * поищем от неё линии.
                 */
                for (var lineId in LogicXO.lineIds) {
                    newLine = findLine(
                        game.field, x, y,
                        LogicXO.lineIds[lineId],
                        state.fieldSize,
                        state.lineSize
                    );
                    /* Добавим в стэк, мы не добавляем линии длиной 1 */
                    if (newLine.points.length > 1) {
                        newLines.push(newLine);
                    }
                }
            }
        }
        /* Добавляем/обновляем линии в state, метод уберёт повторы и пересечния линий. */
        for (var i in newLines) {
            updateLines(game.id, newLines[i]);
        }
    };

    /**
     * Генерирует координаты хода для робота.
     * Выбирает оптимальный ход аналитически.
     * @param game {Object}
     */
    this.generateMovementCoords = function (game) {
        var state, max, target, line;
        state = stateCache[game.id];
        /* 1 - ищем самые длинные линии, свои и противника, не заблокированные с обеих стороны. */
        /* ставим на ту линию, которая длиней. */
        /* поиск самой длиной линии */
        target = null;
        max = 0;
        for (var i in state.lines) {
            line = state.lines[i];
            if (line.pointA.blocked && line.pointB.blocked) {
                continue;
            }
            if (line.points.length > max) {
                max = line.points.length;
                target = line;
            }
        }
        /* Нашли цель */
        if (target) {
            if (!target.pointA.blocked) {
                x = target.pointA.x;
                y = target.pointA.y;
            } else {
                x = target.pointB.x;
                y = target.pointB.y;
            }
        }
        /* Если нет целевой линии */
        var emptyPoints, randomIndex;
        if (!target) {
            emptyPoints = [];
            for (var y = 0; y < state.fieldSize; y++) {
                for (var x = 0; x < state.fieldSize; x++) {
                    if (game.field[y][x] == LogicXO.SIGN_ID_Empty) {
                        emptyPoints.push({x: x, y: y});
                    }
                }
            }
            randomIndex = Math.round(Math.random() * (emptyPoints.length - 1));
            x = emptyPoints[randomIndex].x;
            y = emptyPoints[randomIndex].y;
        }
        return {x: x, y: y};
    };

    /**
     * Ищем из заданных координат линию на поле.
     * Поиск идет в обе стороны.
     * Возвращаем объект описывающий линию.
     * {
     *  lineId: LogicXO.LINE_*
     *  signId: LogicXO.SIGN_ID_*
     *  points: {Array} массив точек {x:n, y:n}
     *  pointA: {x:n, y:n} точка A за пределами линии.
     *  pointB: {x:n, y:n} точка B за пределами линии.
     * @param field {Array} поле, двууровневый массив. [y][x] = LogicXO.SIGN_ID_*
     * @param startX {Number} начальная позиция поиска. координата: x.
     * @param startY {Number} начальная позиция поиска. координата: y.
     * @param lineId {Number} LogicXO.LINE_*
     * @param fieldSize {Number} размер поля.
     * @param lineSize {Number} длина линии победы
     * @returns {Array} структура описана в описании функции.
     */
    var findLine = function (field, startX, startY, lineId, fieldSize, lineSize) {
        var pointA, pointB, vectorA, vectorB, points, signId, blockerSignId;
        points = [];
        pointA = {x: startX, y: startY, blocked: false};
        pointB = {x: startX, y: startY, blocked: false};
        vectorA = LogicXO.getLineVector(lineId, false);
        vectorB = LogicXO.getLineVector(lineId, true);
        signId = field[startY][startX];
        blockerSignId = LogicXO.getOppositeSignId(signId);
        /**
         *  Соберём линию:
         *  - центральную точку;
         *  - далее точку в одном направлении.
         *  - и точки в другом направлении.
         */
        points.push({x: startX, y: startY});
        scanLineOneDirection(pointA, vectorA, field, fieldSize, lineSize, blockerSignId, points);
        scanLineOneDirection(pointB, vectorB, field, fieldSize, lineSize, blockerSignId, points);
        return {
            lineId: lineId,
            signId: signId,
            points: points,
            pointA: pointA,
            pointB: pointB
        };
    };

    /**
     * Сканирует в одном направление, по заданому вектору.
     * начальная точка не будет добавлена.
     * @param p {Object} точка с которой начинается отсчет.
     * @param v {Object} направление линии.
     * @param field {Array} поле на котором сканируем линию.
     * @param lineSize {Number} размер сканируемой линии.
     * @param blockerSignId {Number} знак для блокирующий линию. LogicXO.SIGN_ID_*
     * @param points {Array} массив точек, по ссылке, будут добавляться точки.
     */
    var scanLineOneDirection = function (p, v, field, fieldSize, lineSize, blockerSignId, points) {
        for (var i = 0; i < lineSize; i++) {
            p.x += v.x;
            p.y += v.y;
            /* линия блокируется, если встречается другой знак(в т.ч. пустая ячейка), либо заканчивается поле. */
            if (LogicXO.notInField(p.x, p.y, fieldSize) ||
                field[p.y][p.x] == blockerSignId) {
                p.blocked = true;
                break;
            }
            /* линия заканчивается, если встречается пустая клетка */
            if (field[p.y][p.x] == LogicXO.SIGN_ID_Empty) break;
            points.push({x: p.x, y: p.y});
        }
    };

    /**
     * Обновляем или добавляем линию.
     * Пробегаем по всем линиям знака новой линии,
     * и если есть пересекающиеся то удаляем меньшую.
     * @param gameId {Number} id игры
     * @param newLine {Object} данные о линии.
     */
    var updateLines = function (gameId, newLine) {
        var state, points, pA, pB, lineIdsToDelete, crossed, oldLine;
        state = stateCache[gameId];
        lineIdsToDelete = [];
        for (var lineId in state.lines) {
            oldLine = state.lines[lineId];
            /* это разные линии(lineId), и мы не сможем их слить в одну. */
            if (oldLine.lineId != newLine.lineId) {
                continue;
            }
            /* линии с разными знаками(signId) пересекаться также не могут. */
            if (oldLine.signId != newLine.signId) {
                continue;
            }
            /* Ищём пересечение */
            crossed = false;
            for (var i in oldLine.points) {
                pA = oldLine.points[i];
                for (var j in newLine.points) {
                    pB = newLine.points[j];
                    if (pA.x == pB.x && pA.y == pB.y) {
                        /**
                         * если линии пересекаются
                         * то, новая линия всегда будет длинее,
                         * так что удаляем старую, без сравнения длин.
                         */
                        lineIdsToDelete.push(lineId);
                        crossed = true;
                        break;
                    }
                }
                if (crossed) {
                    break;
                }
            }
        }
        /* Удалим пересекающиеся линии. */
        for (var i in lineIdsToDelete) {
            lineId = lineIdsToDelete[i];
            delete state.lines[lineId];
        }
        /* Добавляем линию. */
        state.lines.push(newLine);
    };

    /**
     * Удалить состояние игры, видимо игра закончена и более не нуждается
     * в дополонительной информации для AI.
     * @param gameId {Number}
     */
    this.removeState = function (gameId) {
        delete stateCache[gameId];
    }
};

/**
 * Статичный класс.
 * @type {LogicRobot}
 */
LogicRobot = new LogicRobot();