(function() {
  // Load the HTML
  var formHtmlUrl = "http://localhost:8080/dist/investor-locations/a/form.html";
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
    var $unbounceForm = $("lp-pom-form form");
    var $dynamicForm = $("#dynamic-root form");
    var $addLocation = $dynamicForm.find(".AddLocation-button");
    var $backButton = $dynamicForm.find(".BackButton");
    var $hiddenFieldGroups = $dynamicForm.find(".Form-fieldGroup.hidden");

    connectFields();
    $addLocation.click(addLocation);
    $backButton.click(goBack);
    $dynamicForm.submit(onSubmit);

    // Add a location field group when "Add location" is clicked.
    function addLocation() {
      var $fieldGroup = $hiddenFieldGroups.first();
      $fieldGroup.find("input").attr("required", true);
      $fieldGroup.find("select").attr("required", true);
      $fieldGroup.removeClass("hidden");

      // If we've added all hidden fields, remove the add location button.
      $hiddenFieldGroups = $dynamicForm.find(".Form-fieldGroup.hidden");
      if ($hiddenFieldGroups.length == 0) {
        $addLocation.hide();
      }
    }

    // Connect the visible form fields with the hidden unbounce form fields
    // so we can submit the entire unbounce form.
    function connectFields() {
      $dynamicInputs = $dynamicForm.find("input");
      $dynamicInputs.each(function(index, input) {
        var $input = $(input);
        var $unbounceInput = $("#" + $input.attr("name"));
        if (!$unbounceInput) {
          console.log("missing an unbounce field");
        } else {
          $input.change(function() {
            $unbounceInput.val($input.val());
          });
        }
      });

      $dynamicSelects = $dynamicForm.find("select");
      $dynamicSelects.each(function(index, select) {
        var $select = $(select);
        var $unbounceSelect = $("#" + $select.attr("name"));
        $select.change(function() {
          $unbounceSelect.val($select.val());
        });
      });
    }

    // Submit the unbounce form instead when the visible form is submitted.
    function onSubmit(event) {
      event.preventDefault();
      $unbounceForm.submit();
    }

    function goBack() {
      window.history.back();
    }
  }
})();
