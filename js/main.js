let menuHamburger = document.querySelector(".header__hamburger");
let bigMenu = document.querySelector('#big__menu');

menuHamburger.addEventListener("click", (e) => {
  e.preventDefault();
  if (menuHamburger.classList.contains("toggle-active")) {
    menuHamburger.classList.remove("toggle-active")
    bigMenu.style.display = 'none';
    pagination.forEach(element => {
      element.style.display = 'block';
    });
    $controls.forEach(element => {
      element.style.zIndex = '101';
    });
    
  } else {
    menuHamburger.classList.add("toggle-active");
    bigMenu.style.display = 'flex';
    pagination.forEach(element => {
      element.style.display = 'none';
    });
    $controls.forEach(element => {
      element.style.zIndex = '99';
    });
  }
});


//slider
let $slides = document.querySelectorAll('.slide');
let $controls = document.querySelectorAll('.slider__control');
let pagination = document.querySelectorAll('.footer__pagination');
let numOfSlides = $slides.length;
let slidingAT = 1300;
let slidingBlocked = false;
  
[].slice.call($slides).forEach(($el, index) => {
  let i = index + 1;
  $el.classList.add('slide-' + i);
  $el.dataset.slide = i;
});
  
[].slice.call($controls).forEach(($el) => {
  $el.addEventListener('click', controlClickHandler);
});

[].slice.call(pagination).forEach(($el) => {
  $el.addEventListener('click', controlClickHandler);
});
  
function controlClickHandler() {
  if (slidingBlocked) return;
  slidingBlocked = true;
  
  let $control = this;
  let isRight = $control.classList.contains('m--right');
  let $curActive = document.querySelector('.slide.s--active');
  let index = +$curActive.dataset.slide;
  (isRight) ? index++ : index--;
  if (index < 1) index = numOfSlides;
  if (index > numOfSlides) index = 1;
  let $newActive = document.querySelector('.slide-' + index);
  
  $control.classList.add('a--rotation');
  $curActive.classList.remove('s--active', 's--active-prev');
  document.querySelector('.slide.s--prev').classList.remove('s--prev');
      
  $newActive.classList.add('s--active');
  if (!isRight) $newActive.classList.add('s--active-prev');
      
  
  let prevIndex = index - 1;
  if (prevIndex < 1) prevIndex = numOfSlides;
  
  document.querySelector('.slide-' + prevIndex).classList.add('s--prev');
  
  setTimeout(() => {
    $control.classList.remove('a--rotation');
    slidingBlocked = false;
  }, slidingAT*0.75);
};