(function() {
  var formContainerId = "#lp-pom-form-251";
  var buttonId = "#lp-pom-button-252";

  lp.jQuery(document).ready(function($) {
    var $formElement = $(formContainerId);
    var $button = $(buttonId);
    var scrollTopTrigger = $button.offset().top + $button.height();

    var $doc = $(document);

    $doc.scroll(
      throttle(function() {
        if ($doc.scrollTop() > scrollTopTrigger) {
          $formElement.addClass("floating");
        } else {
          $formElement.removeClass("floating");
        }
      }, 50)
    );
  });

  function throttle(fn, wait) {
    var previous = 0;
    return function() {
      var now = +new Date();
      if (now - wait > previous) {
        previous = now;
        fn();
      }
    };
  }
})();
