(function() {
  var formContainerId = "#lp-pom-form-251";
  var buttonId = "#lp-pom-button-252";
  var pacContainer = ".pac-container";
  var overrideClass = "pac-container-override";

  lp.jQuery(document).ready(function($) {
    var $formElement = $(formContainerId);

    var $button = $(buttonId);
    var scrollTopTrigger = $button.offset().top + $button.height();

    var $doc = $(document);

    $doc.scroll(
      throttle(function() {
        if ($doc.scrollTop() > scrollTopTrigger) {
          $formElement.addClass("floating");
          $(pacContainer).addClass(overrideClass)
        } else {
          $formElement.removeClass("floating");
          $(pacContainer).removeClass(overrideClass)
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
