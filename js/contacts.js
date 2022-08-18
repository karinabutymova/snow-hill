$(document).ready(function () {

   // Анимация
   gsap.from('#pagename', 1, { width: "0px", ease: Back.easeOut });

   gsap.from('.contacts-section', {
      marginTop: 600,
      duration: 1.2,
      delay: 0.3
   });

   let counter = 0;
   $('.mailing-section').css('opacity', 0);

   $(window).scroll(function () {
      let scroll = $(window).scrollTop() + $(window).height();
      let offset = $('.mailing-section').offset().top;

      if (scroll - 150 > offset && counter == 0) {
         $('.mailing-section').css('opacity', 1);
         gsap.from('.mailing-section', {
            marginLeft: -500,
            duration: 1
         });
         counter = 1;
      }
   });

});