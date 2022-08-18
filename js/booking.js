$(document).ready(function () {

   // Анимация
   gsap.from('#pagename', {
      marginLeft: -1000,
      duration: 1,
      ease: Back.easeOut
   });

   gsap.from('.form-section', {
      opacity: 0,
      duration: 1.5,
      delay: 0.8,
   });


   // Установка ограничения на дату
   let inputsDate = document.querySelectorAll('input[type=date]');

   let now = new Date();

   function formatDate(dd, mm, yy) {
      let month = mm + 1;

      if (month < 10)
         month = '0' + month.toString();
      if (dd < 10)
         dd = '0' + dd.toString();

      date = yy + '-' + month + '-' + dd;
      return date;
   }

   inputsDate.forEach(el => {
      el.setAttribute('min', formatDate(now.getDate(), now.getMonth(), now.getFullYear()));
      el.setAttribute('max', formatDate(now.getDate(), now.getMonth() + 2, now.getFullYear()));
   });

   // Форма бронирования
   let button = document.querySelector('.submit');
   let input = document.querySelectorAll('input');
   let error = document.querySelectorAll('.error');

   button.addEventListener('click', function (e) {
      // Убираем событие отправки формы
      e.preventDefault();
      error.forEach(el => el.style.opacity = 0);

      let flag;
      input.forEach(elem => {
         flag = true;
         if (elem.value != '') {
            let type = elem.name;
            switch (type) {
               case 'name':
                  if (!/^[а-яА-ЯёЁa-zA-Z ]{2,}$/.test(elem.value)) {
                     showErrorMessage(elem, 'Только лаитиница и/или кириллица');
                     flag = false;
                  } break;
               case 'number':
                  if (!/^((\+7|7|8)+([0-9]){10})$/.test(elem.value)) {
                     showErrorMessage(elem, 'Неверный формат номера');
                     flag = false;
                  } break;
               case 'email':
                  if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(elem.value)) {
                     showErrorMessage(elem, 'Неверный формат почты');
                     flag = false;
                  } break;
               case 'count':
                  if (elem.value > 100) {
                     showErrorMessage(elem, 'Кол-во не более 100');
                     flag = false;
                  } break;
               default: break;
            }

         } else {
            showErrorMessage(elem, 'Заполните поле');
            flag = false;
         }

      });

      if (flag) {
         showModalBox();
         input.forEach(elem => elem.value = null);
      }

   });

   function showErrorMessage(elem, mesText) {
      let message = elem.nextSibling.nextSibling;
      message.style.opacity = 1;
      message.textContent = mesText;

   }

   function showModalBox() {
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

});