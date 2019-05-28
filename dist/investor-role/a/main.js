(function() {
  // Load the HTML
  var formHtmlUrl =
    "https://sundaehq.github.io/unbounce-static-hosting/dist/investor-role/a/form.html";
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
    var $radioGroup = $dynamicForm.find("input[type=radio][name=role]");
    var $otherNotes = $("#other_notes");

    $backButton.click(goBack);
    $dynamicForm.submit(onSubmit);
    $radioGroup.change(toggleOtherNotes);

    // Add a location field group when "Add location" is clicked.
    function toggleOtherNotes() {
      if ($(this).val() == "Other") {
        $otherNotes.parent().removeClass("hide");
        $otherNotes.attr("required", true);
      } else {
        $otherNotes.parent().addClass("hide");
        $otherNotes.val("");
        $otherNotes.attr("required", false);
      }
    }

    // Submit the unbounce form instead when the visible form is submitted.
    function onSubmit(event) {
      event.preventDefault();
      syncValues();
      $unbounceForm.submit();
    }

    // Sync values between the visible form and the hidden unbounce form
    // so we can submit the entire unbounce form.
    function syncValues() {
      // Must fetch this again, the $radioGroup value will be stale.
      radioGroupValue = $dynamicForm.find("input[type=radio][name=role]").val();
      var $unbounceRadio = $unbounceForm.find("input[type=radio]");
      $unbounceRadio.val(radioGroupValue);

      var $unbounceOtherNotes = $unbounceForm.find("input[type=text]");
      $unbounceOtherNotes.val($otherNotes.val());
    }

    function goBack() {
      window.history.back();
    }
  }
})();
