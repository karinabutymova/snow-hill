$(document).ready(function () {

   $(window).on('load', function () {
      let $preloader = $('.preloader');
      $preloader.delay(500).fadeOut(500);
   });

   // Анимация

   let counterNumbers = 0, counterMailing = 0;
   $('.about-numbers div').css('opacity', 0);
   $('.mailing-section').css('opacity', 0);


   $(window).scroll(function () {
      let scroll = $(window).scrollTop() + $(window).height();
      let offsetNumbers = $('.about-numbers').offset().top;

      let offsetMailing = $('.mailing-section').offset().top;


      if (scroll - 300 > offsetNumbers && counterNumbers == 0) {
         $('.about-numbers div').css('opacity', 1);
         TweenMax.staggerFrom(['#number-3', '#number-2', '#number-1',], 1, {
            marginLeft: -1000,
         }, 0.3);
         counterNumbers = 1;
      }

      if (scroll - 300 > offsetMailing && counterMailing == 0) {
         $('.mailing-section').css('opacity', 1);
         gsap.from('.mailing-section', {
            marginTop: 400,
            duration: 1
         });
         counterMailing = 1;
      }
   });



   // Слайдер в секциии "О нас"
   const carouselList = document.querySelector('.carousel__list');
   const carouselItems = document.querySelectorAll('.carousel__item');
   const elems = Array.from(carouselItems);

   if (carouselList) {
      carouselList.addEventListener('click', function (event) {
         // Элемент на котором произошло событие 
         let newActive = event.target;
         // Получаем ближайший к нему
         let isItem = newActive.closest('.carousel__item');

         if (!isItem || newActive.classList.contains('carousel__item_active')) {
            return;
         };

         update(newActive);
      });
   }

   const update = function (newActive) {
      const newActivePos = newActive.dataset.pos;

      const current = elems.find((elem) => elem.dataset.pos == 0);
      const prev = elems.find((elem) => elem.dataset.pos == -1);
      const next = elems.find((elem) => elem.dataset.pos == 1);
      const first = elems.find((elem) => elem.dataset.pos == -2);
      const last = elems.find((elem) => elem.dataset.pos == 2);

      current.classList.remove('carousel__item_active');

      [current, prev, next, first, last].forEach(item => {
         let itemPos = item.dataset.pos;

         item.dataset.pos = getPos(itemPos, newActivePos)
      });
   };

   const getPos = function (current, active) {
      const diff = current - active;

      if (Math.abs(current - active) > 2) {
         return -current
      }

      return diff;
   }

   // Форма подписки на рассылку
   let button = document.querySelector('.submit');
   let input = document.querySelector('input[name=email]');
   let error = document.querySelector('.error');
   button.addEventListener('click', function (e) {
      // Убираем событие отправки формы
      e.preventDefault();
      error.style.opacity = 0;

      if (input.value != '') {

         if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(input.value)) {
            input.value = null;

            let modal = document.getElementById("modal");
            let close = document.getElementsByClassName("close")[0];

            modal.style.display = "block";

            close.onclick = function () {
               modal.style.display = "none";
            }

            window.onclick = function (event) {
               if (event.target == modal) {
                  modal.style.display = "none";
               }
            }

         }
         else {
            error.style.opacity = 1;
            error.textContent = "Неверный формат почты";
         }

      } else {
         error.style.opacity = 1;
         error.textContent = "Поле пустое. Введите email";
      }
   });

});


