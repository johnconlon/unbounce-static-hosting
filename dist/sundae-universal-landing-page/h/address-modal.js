(function() {
  var pageInputId = "#autocomplete_address";
  var modalId = "#address_modal";
  var modalInputId = "#address_modal_input";

  lp.jQuery(document).ready(function($) {
    // Hack
    var viewportWidth =
      window.innerWidth || document.documentElement.clientWidth;
    if (viewportWidth >= 600) {
      return;
    }

    var autocompleteService = new google.maps.places.AutocompleteService();
    var placesService = new google.maps.places.PlacesService(
      document.getElementById("attribution_container")
    );
    var sessionToken = null; //hack

    // Reference to main page input
    var $pageInput = $(pageInputId);
    var $modal = $(modalId);
    var $modalInput = $(modalInputId);
    var $modalCancel = $modal.find(".AddressModal-cancel");
    var $modalResultsList = $modal.find("ul");
    var $body = $("body");
    var form = $("form")[0];

    // re-parent the address modal
    $body.append($modal);
    addEventListeners();

    // This is wild.
    // We *must* use a jquery object submit (e.g. $form.submit()),
    // not a dom element submit (e.g. form.submit()). Unbounce
    // doesn't appropriately change the post action unless we go
    // through jquery :shrugging-man:/
    //
    // In addition, Unbounce has added custom form validation which
    // *does not work* if you set values programmatically for required
    // fields. In this case, the autocomplete_address field has the required
    // attribute. We set value of that field programatically. This satisfies
    // the browser validation constraints (because the input has a value) but
    // does not pass the custom unbounce validation constrants. Would need to
    // inspect the unbounce source to understand why, but my best guess is that
    // they have some "change" listener which sets a dirty bit.
    function submitForm() {
      // Clear the unbounce custom validation for the autocomplete address input
      window.ub.form.validationRules.autocomplete_address = {};
      $pageInput[0].setCustomValidity("");

      // Submit the form
      $("form").submit();
    }

    function addEventListeners() {
      $pageInput.focus(onFocusPageInput);
      $modalCancel.click(onTapCancel);
    }

    function onFocusPageInput() {
      show();
    }

    function onKeydownModalInput(event) {
      var query = event.target.value;

      // Don't do anything on enter.
      if (event.keyCode === 13) {
        return;
      }

      query ? getResults(query) : clearResults();
    }

    function onTapResult(result) {
      return function(event) {
        getPlaceDetails(result.place_id);
        form.autocomplete_address.value = result.description;
      };
    }

    function getPlaceDetails(placeId) {
      var request = {
        placeId: placeId,
        fields: ["address_components"],
        sessionToken: sessionToken
      };
      placesService.getDetails(request, onPlaceDetails);
    }

    function onPlaceDetails(place, status) {
      sessionToken = null;
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        // TODO: handle error case
        return;
      }

      fillUnbounceForm(place);
      submitForm();
      hide();
    }

    var componentForm = {
      street_number: "short_name",
      route: "long_name",
      locality: "long_name",
      administrative_area_level_1: "long_name",
      country: "long_name",
      postal_code: "short_name"
    };
    function fillUnbounceForm(place) {
      var addressComponents = {};
      place.address_components.forEach(function(component) {
        const type = component.types[0];
        addressComponents[type] = component[componentForm[type]] || "";
      });

      form.address.value =
        (addressComponents.street_number || "") +
        " " +
        (addressComponents.route || "");
      form.city.value = addressComponents.locality || "";
      form.state.value = addressComponents.administrative_area_level_1 || "";
      form.zip_code.value = addressComponents.postal_code || "";
      form.autocomplete_address.value = [
        form.address.value,
        form.city.value,
        form.state.value,
        form.zip_code.value
      ].join(", ");

      // Record whether the zip is in region
      const isInRegion =
        zipsInRegion.indexOf(parseInt(form.zip_code.value)) > -1;
      $("#in_region").val(isInRegion);
    }

    function onTapCancel() {
      // TODO: clear results
      hide();
    }

    function getResults(query) {
      if (!query || !sessionToken) return;
      autocompleteService.getPlacePredictions(
        {
          input: query,
          types: ["geocode"],
          sessionToken: sessionToken
        },
        onResults
      );
    }

    function onResults(results, status) {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        // TODO: handle error case
        return;
      }

      renderResults(results);
    }

    function renderResults(results) {
      var fragment = document.createDocumentFragment();
      results.forEach(function(result) {
        var li = document.createElement("li");
        li.className += "AddressModal-result";
        li.innerHTML = result.description;
        li.addEventListener("click", onTapResult(result));
        fragment.appendChild(li);
      });
      clearResults();
      $modalResultsList.append(fragment);
      $modalResultsList.addClass("AddressModal-attribution");
    }

    function clearResults() {
      $modalResultsList.empty();
      $modalResultsList.removeClass("AddressModal-attribution");
    }

    function show() {
      // refresh token
      sessionToken = new google.maps.places.AutocompleteSessionToken();
      $modalInput.keydown(onKeydownModalInput);
      $modal.hide();
      $modal.removeClass("no-display");
      $modal.fadeIn(200);
      $modalInput.focus();
    }

    function hide() {
      $modalInput.unbind("keydown");
      $modal.fadeOut(function() {
        $modal.addClass("no-display");
      });
    }
  });
})();
