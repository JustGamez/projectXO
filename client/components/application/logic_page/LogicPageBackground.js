/**
 * Логика страницы заднего фона.
 * @constructor
 */
LogicPageBackground = function () {
    var self = this;

    this.showInviteDialog = false;

    /**
     * Покажем диалог что на пригласили!
     * - надо учесть, что бы диалоги не накладывались друг на друга. этож бесит! :)
     */
    this.showLetsPlayDialog = function () {
        self.showInviteDialog = true;
        PageController.redraw();
    };

    this.hideInviteDialog = function () {
        self.showInviteDialog = false;
        PageController.redraw();
    };
};

/**
 * Констатный класс.
 * @type {LogicPageBackground}
 */
LogicPageBackground = new LogicPageBackground();