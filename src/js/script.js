import IMask from "imask";
const forms = document.querySelectorAll('.form')
const phoneInputs = document.querySelectorAll('.form__input')
const cardBtn = document.querySelectorAll('.card__btn')
const popup = document.querySelector('.popup')
const $body = document.body;
const btnClosePopup = document.querySelector('.popup__btn-close')
const header = document.querySelector('.header')
const repair = document.querySelector('.repair')
const hero = document.querySelector('.hero')
const aboutBlocks = document.querySelector('.about-blocks')
const popupBtnSubmit = document.querySelector('.popup-btn-submit')
const burger = document.querySelector('.header__burger')
const mobMenuOverlay = document.querySelector('.mob-menu')
const closeBtnMenu = document.querySelector('.mob-menu__close-btn')
const mobMenuListItems = document.querySelectorAll('.mob-menu__nav-list-item')
const hedaerMenuItem = document.querySelectorAll('.header__nav-item-link')
//передаем класс и моодифицируем элементы меню
hedaerMenuItem.forEach(item => {
   item.addEventListener('click', () => {
      hedaerMenuItem.forEach(el => {
         el.classList.remove('header__nav-item-link--active')
      })
      item.classList.add('header__nav-item-link--active')
   })
})

// Открытие и закарытие бургер меню
burger.addEventListener('click', () => {
   mobMenuOverlay.classList.add('mob-menu--open')
   $body.style.overflowY = 'hidden';
})
closeBtnMenu.addEventListener('click', () => {
   mobMenuOverlay.classList.remove('mob-menu--open')
   $body.style.overflowY = 'visible';
})
mobMenuListItems.forEach(el => {
   el.addEventListener('click', () => {
      mobMenuOverlay.classList.remove('mob-menu--open')
      $body.style.overflowY = 'visible';
   })
})
mobMenuOverlay.addEventListener('click', (e) => {
   if (e.target === mobMenuOverlay) {
      mobMenuOverlay.classList.remove('mob-menu--open')
      $body.style.overflowY = 'visible';

   }
})

/// Вставка масок при вводе номера
phoneInputs.forEach(el => {
   const phoneMask = new IMask(el, {
      mask: '+{7} (000) 000-00-00'
   });
})

// Проверка на количества символов в  value 
forms.forEach(form => {
   form.addEventListener('submit', (e) => {
      if (e.target == form) {
         let inputNode = form.querySelector('.form__input')
         if (inputNode.value.length < 18) {
            e.preventDefault()
            let result = 18 - inputNode.value.length
            alert('Не хватает' + ' ' + result + ' ' + 'символов')
         }
      }
   })
})


// Фиксация блока при скроле 
let stickyBlock = $('.repair__desc').offset().top;

$(window).scroll(function () {
   if ($(window).scrollTop() > stickyBlock) {
      $('.repair__desc').addClass('fixed');
   }
   else {
      $('.repair__desc').removeClass('fixed');
   }
});
let paddingOffset = window.innerWidth - $body.offsetWidth + 'px ';
/// открытие и закрытие попапа 

function disabledScroll() {
   $body.style.overflowY = 'hidden';
   header.style.paddingRight = paddingOffset;
   hero.style.paddingRight = paddingOffset;
   aboutBlocks.style.paddingRight = paddingOffset;
   repair.style.paddingRight = paddingOffset;
}

function enabledScroll() {
   popup.classList.remove('popup--open');
   $body.style.overflowY = 'visible';
   header.style.paddingRight = '0px';
   hero.style.paddingRight = '0px';
   aboutBlocks.style.paddingRight = '0px';
   repair.style.paddingRight = '0px';
}
cardBtn.forEach(btn => {
   btn.addEventListener('click', () => {
      popup.classList.add('popup--open')
      disabledScroll()
   })
})

btnClosePopup.addEventListener('click', function () {
   popup.classList.remove('popup--open');
   enabledScroll()
});


popupBtnSubmit.addEventListener('click', () => {
   let parent = popupBtnSubmit.closest('.form')
   let inputNode = parent.querySelector('.form__input')
   if (inputNode.value.length == 18) {
      enabledScroll()
   }


});
popup.addEventListener('click', function (e) {
   if (e.target === popup) {
      enabledScroll()
   }
});
