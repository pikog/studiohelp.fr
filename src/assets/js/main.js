$(function() {

  var options = {
    onStart: {
      duration: 250, // Duration of our animation
      render: function ($container) {
        // Add your CSS animation reversing class
        $container.addClass('is-exiting');
      }
    },
    onReady: {
      duration: 0,
      render: function ($container, $newContent) {
        console.log("prout");
        $container.removeClass('is-exiting');

        // Inject the new content
        $container.html($newContent);

      }
    }
  };

  $('#smoothStateContent').smoothState(options);
});
