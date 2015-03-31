var PNGJSIMAGE = require("pngjs-image");
var FS = require('fs');

LogicImages = function () {

    var srcList = [];

    var images = [];

    this.init = function () {

    };

    this.drawPost = function (game, user1, user2) {
        var image, pngjs, color;
        var images;
        images = [];
        var startTime = mtime();
        var sumTime = 0;
        return;
        for (var i = 0; i < 100; i++) {
            images[i] = PNGJSIMAGE.createImage(1000, 1000);
            drawImage(images[i], '/var/xo/images/fields/3x3Field.png', function (resultImage) {
                resultImage.writeImage('/var/xo/images/' + i + '.png', function () {
                    sumTime += mtime() - startTime;
                    //console.log('o.k. sum time:' + sumTime);
                });
            });
        }
    };

    var drawImage = function (sourceImage, path, callback) {
        var image, width, height, index, color;
        image = PNGJSIMAGE.readImage(path, function () {
            width = image.getWidth();
            height = image.getWidth();
            for (var x = 0; x < width; x++) {
                for (var y = 0; y < height; y++) {
                    index = image.getIndex(x, y);
                    color = {
                        red: image.getRed(index),
                        green: image.getGreen(index),
                        blue: image.getBlue(index),
                        alpha: image.getAlpha(index)
                    };
                    sourceImage.setAt(x, y, color);
                }
            }
            callback(sourceImage);
        });
    };
};

LogicImages = new LogicImages();
LogicImages.init();