document.addEventListener('DOMContentLoaded', function () {
  AnimAtLoad();
  pizzaRavioli.init();
  menuNavigation.init();
});

function AnimAtLoad() {
  // LOAD ANIM
  // hero
  var heroTextWrapper = document.querySelector('.hero');
  if (heroTextWrapper) {
    heroTextWrapper.innerHTML = heroTextWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    anime.timeline({ loop: false })
      .add({
        targets: '.hero .letter',
        translateY: [100, 0],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1500,
        delay: (el, i) => 30 * i
      });
  }
  
  // fade elem
  var fadeAnimEl = document.querySelectorAll('.anim-fade');
  if (fadeAnimEl) {
    anime.timeline({ loop: false })
      .add({
        targets: '.anim-fade',
        opacity: [0, 1],
        easing: "linear",
        duration: 1500,
        delay: 700
      });
  }
}

// pizza loutre
var pizzaRavioli = {
  pass: 'loutre',
  passIndex: 0,
  done: false,
  replaceWith: 'La Loutre Cosmique',
  $hero: null,

  init: function () {
    this.$hero = document.querySelector('.hero');
    document.addEventListener('keydown', (e) => {
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

    anime.timeline({ loop: false })
      .add({
        targets: '.hero .letter',
        translateY: [0, -100],
        opacity: [1, 0],
        easing: "easeInExpo",
        duration: 1000,
        delay: (el, i) => 30 * i,
        complete: function () { 
          self.ravioliAnim();
        }
      });
  },

  ravioliAnim: function () {
    var self = this;

    self.$hero.innerHTML = self.replaceWith;
    self.$hero.innerHTML = self.$hero.textContent.replace(/\S/g, "<span class='letter' style=\"opacity: 0\">$&</span>");

    anime.timeline({ loop: false })
    .add({
      targets: '.hero .letter',
      translateY: [100, 0],
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 1000,
      delay: (el, i) => 30 * i
    });
  }
}


//
// PAGE IDs :
// 0 : home (bigger hero)
// 1 : projects
// 2 : discover me
// 3 : career (jobs & schools)
//
// NAVIGATION :
// Left nav-btn -> current page ID - 1
// Right nav-btn -> current page ID + 1
// Loop (0,1,2,3,0,1,2,3,0,1,2,...)
//

var menuNavigation = {
  navButton: null,
  heroMoves: false,
  $hero: null,
  isMoving: false,
  currentPageID: 0,
  pagesTitle: {
    0: "Accueil",
    1: "Mes projets"
  },

  init: function () {
    var self = this;

    this.$hero = document.querySelector('.hero');
    this.$subHero = document.querySelector('.sub-hero');
    this.$fadeElem = document.querySelectorAll('.anim-fade');

    document.querySelectorAll('.nav-left a').forEach(function (el) {
      el.addEventListener('click', function () {
        self.navLeft();
      })
    })

    document.querySelectorAll('.nav-right a').forEach(function (el) {
      el.addEventListener('click', function () {
        self.navRight();
      })
    })

    document.querySelectorAll('.nav-down a').forEach(function (el) {
      el.addEventListener('click', function () {
        self.navDown();
      })
    })
  },

  navLeft: function () {
    if (this.isMoving === true) return;

    var newPageID = (this.currentPageID - 1) < 0 ? 3 : this.currentPageID - 1;
    this.doAnimations("left", newPageID);
  },

  navRight: function () {
    if (this.isMoving === true) return;

    var newPageID = (this.currentPageID - 1) > 3 ? 0 : this.currentPageID + 1;
    this.doAnimations("right");
  },

  navDown: function () {
    if (this.isMoving === true) return;

    this.doAnimations("down", this.currentPageID);
  },

  doAnimations: function (dir, newPageID) {
    this.isMoving = true;

    this.moveHero();
    this.fadeAnim();
    this.moveSection(dir);
  },

  moveHero: function () {
    if (this.heroMoves === false){
      this.heroMoves = true;
      this.$hero.style.top = '3%';
      this.$hero.style.fontSize = '3rem';

      this.$subHero.style.top = '10%';
    }
  },

  fadeAnim: function () {
    if (this.$fadeElem) {
      anime.timeline({ loop: false })
        .add({
          targets: '.anim-fade',
          opacity: [1, 0],
          easing: "linear",
          duration: 200
        });
    }
  },

  unfadeAnim: function () {
    if (this.$fadeElem) {
      anime.timeline({ loop: false })
        .add({
          targets: '.anim-fade',
          opacity: [0, 1],
          easing: "linear",
          duration: 200
        });
    }
  },

  moveSection: function (dir) {
    var self = this;

    switch (dir) {
      // --- LEFT NAV BUTTON --- //
      case "left":
        anime.timeline({ loop: false })
        .add({
          targets: '.section-container',
          translateX: [0, 100],
          opacity: [1, 0],
          easing: "easeInCubic",
          duration: 700,
          complete: function (anim) { 
            self.setSubHero();
            self.unfadeAnim();
          }
      })
      .add({
        targets: '.section-container',
        translateX: [-100, 0],
        opacity: [0, 1],
        easing: "easeOutQuart",
        duration: 1000,
        delay: 300,
        complete: function (anim) { 
          self.isMoving = false;  
        }
    });
        break;
        
      // --- RIGHT NAV BUTTON --- //
      case "right":
        anime.timeline({ loop: false })
        .add({
          targets: '.section-container',
          translateX: [0, -100],
          opacity: [1, 0],
          easing: "easeInCubic",
          duration: 700,
          complete: function (anim) { 
            self.setSubHero();
            self.unfadeAnim();
          }
      })
      .add({
        targets: '.section-container',
        translateX: [100, 0],
        opacity: [0, 1],
        easing: "easeOutQuart",
        duration: 1000,
        delay: 300,
        complete: function (anim) { 
          self.isMoving = false;   
        }
    });
        break;
    
      // --- DOWN NAV BUTTON --- //
      case "down":
        anime.timeline({ loop: false })
        .add({
          targets: '.section-container',
          translateY: [0, -100],
          opacity: [1, 0],
          easing: "easeInCubic",
          duration: 700,
          complete: function (anim) { 
            self.setSubHero();
            self.unfadeAnim();
          }
      })
      .add({
        targets: '.section-container',
        translateY: [100, 0],
        opacity: [0, 1],
        easing: "easeOutQuart",
        duration: 1000,
        delay: 300,
        complete: function (anim) { 
          self.isMoving = false;
        }
    });
        break;
      
      default:
        console.error('HUH ?? Bad direction bro');
        break;
    }
  },

  setSubHero: function () {
    this.$subHero.innerHTML = this.pagesTitle[0];
  }
}