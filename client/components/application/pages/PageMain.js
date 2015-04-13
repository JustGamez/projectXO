PageMain = function () {
    var self = this;
    this.blocks = [];

    this.init = function () {
        self.blocks.push(PageBlockBackground);
        self.blocks.push(PageBlockChat);
        self.blocks.push(PageBlockOnlineAndRating);
        self.blocks.push(PageBlockMain);
    };
};

PageMain = new PageMain;