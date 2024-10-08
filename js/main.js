document.addEventListener('DOMContentLoaded', function () {
  AnimAtLoad();
  pizzaRavioli.init();
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