PageXOGame = function () {
    var self = this;
    this.blocks = [];

    this.init = function () {
        self.blocks.push(PageBlockBackground);
        self.blocks.push(PageBlockChat);
        self.blocks.push(PageBlockOnlineAndRating);
        self.blocks.push(PageBlockXOGame);
    };
};

PageXOGame = new PageXOGame;