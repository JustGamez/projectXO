Sounds = function () {
    var self = this;

    var cache = {};

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
        if (!cache[path]) {
            cache[path] = new Audio(path + "?t=" + time());
        }
        cache[path].play();
    };
};

Sounds = new Sounds;