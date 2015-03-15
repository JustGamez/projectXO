Sounds = function () {
    var self = this;

    this.enabled = true;

    this.on = function () {
        self.enabled = true;
    };

    this.off = function () {
        self.enabled = false;
    };

    this.play = function (path) {
        if (!self.enabled) {
            return;
        }
        var audio = new Audio(path);
        audio.play();
    };
};

Sounds = new Sounds;