$(function () {
  'use strict';
  var options = {
      prefetch: true,
      cacheLength: 2,
      debug: true,
      onStart: {
        duration: 150,
        render: onStartAnimation
      },
      onReady: {
        duration: 0,
        render: onReadyAnimation
      },
      onAfter: function ($container, $newContent) {
        init();
      },
    },
    smoothState = $('#smoothStateContent').smoothState(options).data('smoothState');

  $(document).ready(function () {
    init();
  });

  function init() {
    $(window).on('resize', function () {
      setVideoSize();
      if ($(window).width() >= 850) {
        $('button.hamburger').removeClass('is-active');
        $('nav.menu').css('display', 'flex');
      }
      else if (!$('button.hamburger').hasClass('is-active')) {
        $('nav.menu').css('display', 'none');
      }

      $('.instruments .instru').css('height', $('.instruments .instru').first().css('width'));
    });

    $('button.hamburger').on('click', function () {
      if ($(this).hasClass('is-active')) {
        $(this).removeClass('is-active');
        $('nav.menu').css('display', 'none');
      }
      else {
        $(this).addClass('is-active');
        $('nav.menu').css('display', 'flex');
      }
    });
    $('video').on('loadeddata', function () {
      $('video').show();
    });

    setVideoSize();

    $('.itemWork:nth-of-type(1) a').hover(
      function () {
        $('.works h2').css('opacity', 0);
        console
      },
      function () {
        $('.works h2').css('opacity', 1);
      }
    );
    $('audio').audioPlayer();
  }

  function setVideoSize() {
    var video = $('video');
    video.attr('height', $(document).height());
    video.attr('width', $(document).width());
  }

  function onStartAnimation($container, animationNameBefore, animationNameAfter, animationDuration, animationAnchor) {
    $container.attr('class', 'content');
    $container.addClass('exiting-' + animationNameBefore);
    smoothState.restartCSSAnimations();
  }

  function onReadyAnimation($container, $newContent, animationNameBefore, animationNameAfter, animationDuration, animationAnchor) {
    $container.removeClass('exiting-' + animationNameBefore);
    $container.html($newContent);
    $container.addClass('enter-' + animationNameAfter);
  }
});
