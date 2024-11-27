document.addEventListener("DOMContentLoaded", function () {
  AnimAtLoad();
  pizzaRavioli.init();
  menuNavigation.init();
  cursor.init();
});

function AnimAtLoad() {
  // LOAD ANIM
  // hero
  var heroTextWrapper = document.querySelector(".hero");
  if (heroTextWrapper) {
    heroTextWrapper.innerHTML = heroTextWrapper.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );
    anime.timeline({ loop: false }).add({
      targets: ".hero .letter",
      translateY: [100, 0],
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 1500,
      delay: (el, i) => 30 * i,
    });
  }

  // fade elem
  var fadeAnimEl = document.querySelectorAll(".anim-fade");
  if (fadeAnimEl) {
    anime.timeline({ loop: false }).add({
      targets: ".anim-fade",
      opacity: [0, 1],
      easing: "linear",
      duration: 1500,
      delay: 700,
    });
  }
}

var pizzaRavioli = {
  pass: "loutre",
  passIndex: 0,
  done: false,
  replaceWith: "La Loutre Cosmique",

  init: function () {
    this.$hero = document.querySelector(".hero");
    document.addEventListener("keydown", (e) => {
      if (this.done) return;

      if (e.key === this.pass[this.passIndex]) {
        this.passIndex++;
      } else {
        this.passIndex = 0;
      }

      if (this.passIndex === this.pass.length) this.pizzaToRavioli();
    });
  },

  pizzaToRavioli: function () {
    var self = this;
    this.done = true;

    anime.timeline({ loop: false }).add({
      targets: ".hero .letter",
      translateY: [0, -100],
      opacity: [1, 0],
      easing: "easeInExpo",
      duration: 1000,
      delay: (el, i) => 30 * i,
      complete: function () {
        self.ravioliAnim();
      },
    });
  },

  ravioliAnim: function () {
    var self = this;

    self.$hero.innerHTML = self.replaceWith;
    self.$hero.innerHTML = self.$hero.textContent.replace(
      /\S/g,
      "<span class='letter' style=\"opacity: 0\">$&</span>"
    );

    anime.timeline({ loop: false }).add({
      targets: ".hero .letter",
      translateY: [100, 0],
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 1000,
      delay: (el, i) => 30 * i,
    });
  },
};

//
// PAGE IDs :
// 0 : home (bigger hero)
// 1 : projects
// 2 : career (jobs & schools)
// 3 : discover me
//
// NAVIGATION :
// Left nav-btn -> current page ID - 1
// Right nav-btn -> current page ID + 1
// Loop (0,1,2,3,0,1,2,3,0,1,2,...)
//

var menuNavigation = {
  isMoving: false,
  isContactDisplayed: false,
  currentPageID: 0,
  pagesTitle: [
    "Accueil",
    "Mes projets",
    "Mon parcours",
    "Me découvrir",
    "Me contacter", // keep contact at the end of array
  ],
  pagesSubHero: [
    "Vous ne chercheriez pas un alternant par hasard ?",
    "Jouez à Let Me Cook !",
    "Le début d'une aventure...",
    'On m\'appelle aussi "Loutre"',
    "Je réponds très très vite !", // keep contact at the end of array
  ],

  init: function () {
    var self = this;

    this.$hero = document.querySelector(".hero");
    this.$subHero = document.querySelector(".sub-hero");
    this.$fadeElem = document.querySelectorAll(".anim-fade");
    this.$navLeftTitle = document.querySelector(".nav-left span");
    this.$navRightTitle = document.querySelector(".nav-right span");
    this.$navDownTitle = document.querySelector(".nav-down span");

    this.$pages = [];
    for (let i = 0; i < this.pagesTitle.length - 1; i++) {
      this.$pages[i] = document.querySelector(`#page-id-${i}`);
    }
    this.$contactPage = document.querySelector("#contact-page");

    document.querySelectorAll(".nav-left a").forEach(function (el) {
      el.addEventListener("click", function () {
        self.navLeft();
      });
    });

    document.querySelectorAll(".nav-right a").forEach(function (el) {
      el.addEventListener("click", function () {
        self.navRight();
      });
    });

    document.querySelectorAll(".nav-down a").forEach(function (el) {
      el.addEventListener("click", function () {
        self.navDown();
      });
    });
  },

  navLeft: function () {
    if (this.isMoving === true) return;

    var newPageID =
      this.currentPageID - 1 < 0
        ? this.pagesTitle.length - 2
        : this.currentPageID - 1;
    this.doAnimations("left", newPageID);
  },

  navRight: function () {
    if (this.isMoving === true) return;

    var newPageID =
      this.currentPageID + 1 > this.pagesTitle.length - 2
        ? 0
        : this.currentPageID + 1;
    this.doAnimations("right", newPageID);
  },

  navDown: function () {
    if (this.isMoving === true) return;

    this.doAnimations("down", this.currentPageID);
  },

  doAnimations: function (dir, newPageID) {
    this.isMoving = true;

    this.moveHero(newPageID);
    this.fadeAnim();
    this.moveSection(dir, newPageID);
  },

  moveHero: function (newPageID) {
    // Exiting main page
    if (this.currentPageID === 0 && this.isContactDisplayed === false) {
      this.$hero.style.top = "3%";
      this.$hero.style.fontSize = "3rem";

      this.$subHero.style.top = "10%";
    }

    // Entering main page
    else if (newPageID === 0) {
      this.$hero.style.top = "revert-layer";
      this.$hero.style.fontSize = "revert-layer";

      this.$subHero.style.top = "revert-layer";
    }
  },

  fadeAnim: function () {
    if (this.$fadeElem) {
      anime.timeline({ loop: false }).add({
        targets: ".anim-fade",
        opacity: [1, 0],
        easing: "linear",
        duration: 200,
      });
    }
  },

  unfadeAnim: function () {
    if (this.$fadeElem) {
      anime.timeline({ loop: false }).add({
        targets: ".anim-fade",
        opacity: [0, 1],
        easing: "linear",
        duration: 1000,
        delay: 500,
      });
    }
  },

  moveSection: function (dir, newPageID) {
    var self = this;

    switch (dir) {
      // --- LEFT NAV BUTTON --- //
      case "left":
        anime
          .timeline({ loop: false })
          .add({
            targets: ".section-container",
            translateX: [0, 100],
            opacity: [1, 0],
            easing: "easeInCubic",
            duration: 500,
            complete: function (anim) {
              self.changeTexts(newPageID);
              self.unfadeAnim();
            },
          })
          .add({
            targets: ".section-container",
            translateX: [-100, 0],
            opacity: [0, 1],
            easing: "easeOutQuart",
            duration: 1000,
            delay: 300,
            complete: function (anim) {
              self.isMoving = false;
            },
          });
        break;

      // --- RIGHT NAV BUTTON --- //
      case "right":
        anime
          .timeline({ loop: false })
          .add({
            targets: ".section-container",
            translateX: [0, -100],
            opacity: [1, 0],
            easing: "easeInCubic",
            duration: 500,
            complete: function (anim) {
              self.changeTexts(newPageID);
              self.unfadeAnim();
            },
          })
          .add({
            targets: ".section-container",
            translateX: [100, 0],
            opacity: [0, 1],
            easing: "easeOutQuart",
            duration: 1000,
            delay: 300,
            complete: function (anim) {
              self.isMoving = false;
            },
          });
        break;

      // --- DOWN NAV BUTTON --- //
      case "down":
        if (this.isContactDisplayed === true) {
          anime
            .timeline({ loop: false })
            .add({
              targets: ".section-container",
              translateY: [0, 100],
              opacity: [1, 0],
              easing: "easeInCubic",
              duration: 500,
              complete: function (anim) {
                self.changeTexts(newPageID);
                self.unfadeAnim();
              },
            })
            .add({
              targets: ".section-container",
              translateY: [-100, 0],
              opacity: [0, 1],
              easing: "easeOutQuart",
              duration: 1000,
              delay: 300,
              complete: function (anim) {
                self.isMoving = false;
              },
            });
        } else {
          anime
            .timeline({ loop: false })
            .add({
              targets: ".section-container",
              translateY: [0, -100],
              opacity: [1, 0],
              easing: "easeInCubic",
              duration: 500,
              complete: function (anim) {
                self.changeTexts(newPageID);
                self.unfadeAnim();
              },
            })
            .add({
              targets: ".section-container",
              translateY: [100, 0],
              opacity: [0, 1],
              easing: "easeOutQuart",
              duration: 1000,
              delay: 300,
              complete: function (anim) {
                self.isMoving = false;
              },
            });
        }

        break;

      default:
        console.error("HUH ?? Bad direction bro");
        break;
    }
  },

  changeTexts: function (newPageID) {
    // Contact page opened
    if (newPageID === this.currentPageID && !this.isContactDisplayed) {
      this.isContactDisplayed = true;

      this.$subHero.innerHTML = this.pagesSubHero[this.pagesSubHero.length - 1];
      this.$navDownTitle.innerHTML = this.pagesTitle[newPageID];

      this.displayPage(this.$pages[this.currentPageID], this.$contactPage);

      this.rotateDownBtn();
    }

    // Contact page closed
    else if (this.isContactDisplayed === true) {
      this.isContactDisplayed = false;

      this.$subHero.innerHTML = this.pagesSubHero[newPageID];
      this.$navDownTitle.innerHTML =
        this.pagesTitle[this.pagesTitle.length - 1];

      this.displayPage(this.$contactPage, this.$pages[newPageID]);

      this.rotateDownBtn();
    }

    // Normal situation
    else {
      this.$subHero.innerHTML = this.pagesSubHero[newPageID];

      this.displayPage(this.$pages[this.currentPageID], this.$pages[newPageID]);
    }

    // Switch selected nav-dots
    $(`#dot-id-${this.currentPageID}`).removeClass("selected");
    $(`#dot-id-${newPageID}`).addClass("selected");

    this.$navLeftTitle.innerHTML =
      this.pagesTitle[
        newPageID - 1 < 0 ? this.pagesTitle.length - 2 : newPageID - 1
      ];

    this.$navRightTitle.innerHTML =
      this.pagesTitle[
        newPageID + 1 > this.pagesTitle.length - 2 ? 0 : newPageID + 1
      ];

    this.currentPageID = newPageID;
  },

  displayPage: function ($pageToHide, $pageToShow) {
    $pageToHide.style.display = "none";
    $pageToShow.style.display = "flex";
  },

  rotateDownBtn: function () {
    if (this.isContactDisplayed === true) {
      anime.timeline({ loop: false }).add({
        targets: ".nav-down a",
        rotate: [0, 180],
        easing: "easeOutQuart",
        duration: 1000,
        delay: 500,
      });
    } else {
      anime.timeline({ loop: false }).add({
        targets: ".nav-down a",
        rotate: [180, 0],
        easing: "easeOutQuart",
        duration: 1000,
        delay: 500,
      });
    }
  },
};
