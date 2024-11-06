var cursor = {
    delay: 8,
    _x: 0,
    _y: 0,
    endX: (window.innerWidth / 2),
    endY: (window.innerHeight / 2),
    isVisible: true,
    isHovering: false,
    isActive: false,
    $dot: document.querySelector('#cursor-dot'),
    $light: document.querySelector('#cursor-light'),

    init: function () {
        this.$dot = document.querySelector('#cursor-dot'),
        this.$light = document.querySelector('#cursor-light'),

        // Set up element sizes
        this.dotSize = this.$dot.offsetWidth;
        this.lightSize = this.$light.offsetWidth;

        this.setupEventListeners();
        this.animateDotLight();
    },

    setupEventListeners: function () {
        var self = this;

        // Anchors hovering
        document.querySelectorAll('a').forEach(function (el) {
            el.addEventListener('mouseover', function () {
                self.isHovering = true;
                self.toggleHoverAnim();
            });
            el.addEventListener('mouseout', function () {
                self.isHovering = false;
                self.toggleHoverAnim();
            });
        });

        // Click events
        document.addEventListener('mousedown', function () {
            self.isActive = true;
            self.toggleActiveAnim();
        });
        document.addEventListener('mouseup', function () {
            self.isActive = false;
            self.toggleActiveAnim();
        });

        document.addEventListener('mousemove', function (e) {
            self.endX = e.pageX;
            self.endY = e.pageY;
            self.$dot.style.top = self.endY + 'px';
            self.$dot.style.left = self.endX + 'px';
        });

        // Hide/show cursor
        document.addEventListener('mouseenter', function (e) {
            self.isVisible = true;
            self.toggleCursorVisibility();
            self.$dot.style.opacity = 1;
            self.$light.style.opacity = 1;
        });

        document.addEventListener('mouseleave', function (e) {
            self.isVisible = false;
            self.toggleCursorVisibility();
            self.$dot.style.opacity = 0;
            self.$light.style.opacity = 0;
        });
    },

    animateDotLight: function () {
        var self = this;

        self._x += (self.endX - self._x) / self.delay;
        self._y += (self.endY - self._y) / self.delay;
        self.$light.style.top = self._y + 'px';
        self.$light.style.left = self._x + 'px';

        requestAnimationFrame(this.animateDotLight.bind(self));
    },

    toggleHoverAnim: function () {
        var self = this;

        if (self.isActive) return;

        if (self.isHovering) {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(4)';
            self.$light.style.transform = 'translate(-50%, -50%) scale(0)';
        } else {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
            self.$light.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    },

    toggleActiveAnim: function () {
        var self = this;

        if (self.isActive) {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(0.7)';
        } else {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    },

    toggleCursorVisibility: function () {
        var self = this;

        if (self.isVisible) {
            self.$dot.style.opacity = 1;
            self.$light.style.opacity = 1;
        } else {
            self.$dot.style.opacity = 0;
            self.$light.style.opacity = 0;
        }
    }
}