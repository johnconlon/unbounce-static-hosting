(function() {
  // Load the HTML
  var formHtmlUrl =
    "https://sundaehq.github.io/unbounce-static-hosting/dist/investor-experience/a/form.html";
  var containerId = "#dynamic-root";

  lp.jQuery(document).ready(function($) {
    var $container = $(containerId);
    $.get(formHtmlUrl, function(data) {
      $container.html(data);
      initForm();

      // fix positioning
      $container.parent().css({
        position: "relative",
        overflow: "auto",
        height: "auto"
      });
    });
  });

  // Init the form
  function initForm() {
    var $unbounceForm = $(".lp-pom-form form");
    var $dynamicForm = $("#dynamic-root form");
    var $backButton = $dynamicForm.find(".BackButton");

    $backButton.click(goBack);
    $dynamicForm.submit(onSubmit);

    // Submit the unbounce form instead when the visible form is submitted.
    function onSubmit(event) {
      event.preventDefault();
      syncValues();
      $unbounceForm.submit();
    }

    // Sync values between the visible form and the hidden unbounce form
    // so we can submit the entire unbounce form.
    function syncValues() {
      var $dynamicFields = $dynamicForm.find("input");
      $dynamicFields.each(function(index, input) {
        var $input = $(input);
        var $unbounceInput = $("#unbounce-" + $input.attr("name"));
        $unbounceInput.val($input.val());
      });
    }

    function goBack() {
      window.history.back();
    }
  }
})();
