(function() {
  var formHtmlUrl = "http://localhost:8080/dist/investor-locations/a/form.html";
  var containerId = "#dynamic-root";
  // build a custom form
  lp.jQuery(document).ready(function($) {
    var $container = $(containerId);
    $.get(formHtmlUrl, function(data) {
      $container.html(data);
    });
  });
})();
