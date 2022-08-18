$(document).ready(function () {

   $(window).on('load', function () {
      let $preloader = $('.preloader');
      $preloader.delay(200).fadeOut(200);
   });

   $(".option").first().addClass('active');
   $(".option").click(function () {
      $(".option").removeClass("active");
      $(this).addClass("active");
   });

   // Анимации
   $('#go-to-entertainments').click(function () {
      gsap.to(window, { duration: 1, scrollTo: '.entertainments-section' });
   });
   $('#go-to-worktimes').click(function () {
      gsap.to(window, { duration: 1, scrollTo: '.work-times-title' });
   });
   $('#go-to-scheme').click(function () {
      gsap.to(window, { duration: 1, scrollTo: '.scheme-section' });
   });

   TweenMax.staggerFrom(['#go-to-scheme', '#go-to-worktimes', '#go-to-entertainments',], 0.3, {
      marginLeft: -150,
   }, 0.2);

   let counterAbout = 0, counterentEntainments = 0, counterentTimetable = 0;
   $('.about-section').css('opacity', 0);
   $('.entertainments-section').css('opacity', 0);
   $('.timetable-section').css('opacity', 0);

   $(window).scroll(function () {
      let scroll = $(window).scrollTop() + $(window).height();
      let offsetAbout = $('.about-section').offset().top;

      let offsetEntertainments = $('.entertainments-section').offset().top;

      let offsetTimetable = $('.work-times-title').offset().top;


      if (scroll > offsetAbout && counterAbout == 0) {
         $('.about-section').css('opacity', 1);
         gsap.from('#show-info-1', {
            marginLeft: -500,
            duration: 1
         });
         gsap.from('#show-info-2', {
            marginRight: -600,
            duration: 1
         });
         counterAbout = 1;
      }

      if (scroll - offsetEntertainments / 4 > offsetEntertainments && counterentEntainments == 0) {

         let elemH2 = $('.entertainments-section h2');
         let elemP = $('.entertainments-section p');

         $('.entertainments-section').css('opacity', 1);

         gsap.from([elemH2, elemP], {
            marginTop: 600,
            duration: 1
         });

         gsap.from('.entertainments', {
            marginTop: 600,
            duration: 1,
            delay: 1
         });
         counterentEntainments = 1;
      }

      if (scroll > offsetTimetable && counterentTimetable == 0) {

         $('.timetable-section').css('opacity', 1);

         gsap.from('.work-times-title', 1, { width: "0px", alpha: 0 }, "-=0.2");
         gsap.from(['.hotel-gazebo-times', '.rental-administration-times'], { opacity: 0, duration: 4 });

         counterentTimetable = 1;
      }
   });

});