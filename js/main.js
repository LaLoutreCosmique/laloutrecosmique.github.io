document.addEventListener('DOMContentLoaded', function () {
  // LOAD ANIM
  // hero
  var heroTextWrapper = document.querySelector('.hero');
  if (heroTextWrapper) {
    heroTextWrapper.innerHTML = heroTextWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    anime.timeline({ loop: false })
      .add({
        targets: '.hero .letter',
        translateY: [100, 0],
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
});