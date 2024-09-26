var cursor = {
    delay: 8,
    _x: 0,
    _y: 0,
    endX: (window.innerWidth / 2),
    endY: (window.innerHeight / 2),
    isVisible: true,
    isHovering: false,
    $dot: document.querySelector('#cursor-dot'),
    $outline: document.querySelector('#cursor-light'),

    init: function () {
        // Set up element sizes
        this.dotSize = this.$dot.offsetWidth;
        this.outlineSize = this.$outline.offsetWidth;

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
            //self.isHovering = true;
            //self.toggleHoverAnim();
        });
        document.addEventListener('mouseup', function () {
            //self.isHovering = false;
            //self.toggleHoverAnim();
        });


        document.addEventListener('mousemove', function (e) {
            // Show the cursor
            //self.isVisible = true;
            //self.toggleCursorVisibility();

            // Position the dot
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
            self.$outline.style.opacity = 1;
        });

        document.addEventListener('mouseleave', function (e) {
            self.isVisible = false;
            self.toggleCursorVisibility();
            self.$dot.style.opacity = 0;
            self.$outline.style.opacity = 0;
        });
    },

    animateDotLight: function () {
        var self = this;

        self._x += (self.endX - self._x) / self.delay;
        self._y += (self.endY - self._y) / self.delay;
        self.$outline.style.top = self._y + 'px';
        self.$outline.style.left = self._x + 'px';

        requestAnimationFrame(this.animateDotLight.bind(self));
    },

    toggleHoverAnim: function () {
        var self = this;

        if (self.isHovering) {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(0.7)';
            self.$outline.style.transform = 'translate(-50%, -50%) scale(0)';
        } else {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
            self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    },

    toggleCursorVisibility: function () {
        var self = this;

        if (self.isVisible) {
            self.$dot.style.opacity = 1;
            self.$outline.style.opacity = 1;
        } else {
            self.$dot.style.opacity = 0;
            self.$outline.style.opacity = 0;
        }
    }
}

cursor.init();