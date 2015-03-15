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
            LogicUser.getUserById(list[i].userId);
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
