$(function () {
  'use strict';
  var options = {
      prefetch: true,
      cacheLength: 2,
      debug: true,
      onStart: {
        duration: 150,
        render: function ($container, animationNameBefore, animationDuration, animationAnchor) {
          $container.addClass('is-exiting');
          smoothState.restartCSSAnimations();
        }
      },
      onReady: {
        duration: 0,
        render: function ($container, $newContent, animationNameAfter) {
          $container.removeClass('is-exiting');
          $container.html($newContent);
        }
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
  }

  function setVideoSize() {
    var video = $('video');
    video.attr('height', $(document).height());
    video.attr('width', $(document).width());
  }
});
