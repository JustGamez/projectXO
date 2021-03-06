SAPIRating = function () {

    /**
     * Запросить рейтинговые позиции для указанных позиций.
     */
    this.sendMeRatingForPositions = function (cntx, positions) {
        var positionList, position;
        if (!cntx.isAuthorized) {
            Logs.log("SAPIRating.sendMeRatingForPositions: must be authorized.", Logs.LEVEL_WARNING);
            return;
        }
        if (!positions || typeof positions != 'object') {
            Logs.log("SAPIRating.sendMeRatingForPositions: must have positions with type of object(means array).", Logs.LEVEL_WARNING, positions);
            return;
        }
        positionList = [];
        for (var i in positions) {
            position = parseInt(positions[i]);
            if (isNaN(position) == false && position > 0) {
                positionList.push(position);
            }
        }
        if (positionList.length == 0) {
            Logs.log("SAPIRating.sendMeRatingForPositions: no positions given", Logs.LEVEL_WARNING, positions);
            return;
        }
        DataRating.getListByPositions(positionList, function (rows) {
            CAPIRating.updateRatingData(cntx.userId, rows);
        });
    };

    this.sendMeLastPosition = function (cntx) {
        if (!cntx.isAuthorized) {
            Logs.log("SAPIRating.sendMeLastPosition: must be authorized.", Logs.LEVEL_WARNING);
            return;
        }
        DataRating.getLastPosition(function (lastPosition) {
            CAPIRating.updateLastPosition(cntx.userId, lastPosition);
        });
    };
};
/**
 * Статичный класс.
 * @type {SAPIRating}
 */
SAPIRating = new SAPIRating();
